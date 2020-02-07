var prov_id, dis_id;
var txh_clinica;
var txh_idConfirm = "";
var valRND = Math.floor(Math.random() * 100);
/*Inicializar Script*/
$(function () {
    $(document).unbind("keydown");
    openLoading();
    $('.dtOp').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        orientation: "top left"
    });

    $("#pnl_mascota").modal({show: false, backdrop: 'static' });
    
    $('.continue').click(function () {
        $('.nav-tabs .active').parent().next('li').find('a').trigger('click');
    });
    $('.back').click(function () {
        $('.nav-tabs .active').parent().prev('li').find('a').trigger('click');
    });

    fc_listar_inicio();

    $("#bus_txt_nombre").focus();
});
function activaTab(tab) {
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
}
function aceptarConfirm() {
    switch (txh_idConfirm) {
        case "ANULAR":
            openLoading();
            $("#errorDiv").html('');

            var objE = {
                ID_ENCRIP: txh_clinica
            };

            $.ajax({
                type: "POST",
                url: "page/mantenimiento/clinica.aspx/AnularClinicaWM",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({ objE: objE }),
                async: true,
                beforeSend: function () {
                    $("#tbl_clinica button").attr("disabled", true);
                },
                success: function (data) {
                    $("#tbl_clinica button").removeAttr("disabled");

                    if (!data.d.Activo) {
                        $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                        closeLoading();
                        return;
                    }

                    $("#errorDiv").html(GenerarAlertaSuccess(data.d.Mensaje));
                    fc_listar_clinica();
                },
                error: function (data) {
                    $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                    $("#tbl_clinica button").removeAttr("disabled");
                    $("#pleaseWaitDialog").modal('hide');
                }
            });
            event.preventDefault();
            break;
        default:
            break;
    }
}
function fc_listar_inicio() {
    var objE = {
        CODIGO: "CONVENIOTIPO"
    };
    
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/mascota.aspx/listarParametro",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE}),
        async: false,
        beforeSend: function () {
            openLoading();
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                closeLoading();
                return;
            }
            ;
            $('#bus_sel_tipo').append("<option value='0'>TODOS</option>");
            $('#sel_canal').append("<option></option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#bus_sel_tipo').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
                $('#sel_tipo').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            closeLoading();
        }
    });

    /************************ Departamento ****************************/
    objE = {
        CODIGO: "DEPARTAMENTO"
    };
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/mascota.aspx/listarParametro",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE }),
        async: false,
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                closeLoading();
                return;
            }

            //$('#bus_sel_departamento').append("<option value='0'>TODOS</option>");
            $('#sel_departamento').append("<option></option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
               // $('#bus_sel_departamento').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
                $('#sel_departamento').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }            
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            closeLoading();
        }
    });

    closeLoading();
}
function fc_listar_clinica() {
    openLoading();

    var eClinica = {
        CONVENIO_TIPO_ID: $("#bus_sel_tipo").val(),
        NOMBRE: $("#bus_txt_nombre").val()
    };

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/clinica.aspx/ListaClinicaWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            objE: eClinica
        }),
        async: true,
        beforeSend: function () {
            $("#btn_buscar").attr("disabled", true);
            $('#tbl_clinica tbody').empty();
        },
        success: function (data) {
            $("#btn_buscar").removeAttr("disabled");

            if (!data.d.Activo) {
                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                closeLoading();
                return;
            }

            var htmlBotones = '<button name="editar" class="btn btn-primary btn-sm"><i class="fas fa-pencil-alt"></i></button> ' +
                '<button name="anular" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button> ';

            var html = '';
            for (var i = 0; i < data.d.Resultado.length; i++) {
                html += '<tr><td>' + htmlBotones + '</td>';
                html += '<td style="display:none">' + data.d.Resultado[i].ID_ENCRIP + '</td>';
                html += '<td>' + (data.d.Resultado[i].PUNTO_AUTORIZADO === 0 ? 'No': 'Si') + '</td>';
                html += '<td>' + data.d.Resultado[i].NOMBRE + '</td>';
                html += '<td>' + data.d.Resultado[i].TELEFONO + '</td>';
                html += '<td>' + data.d.Resultado[i].BENEFICIO + '</td>';
                html += '<td>' + data.d.Resultado[i].DIRECCION + '</td></tr>';
            }

            $("#tbl_clinica tbody").append(html);
            $("#lblTotalReg").html("Total registros: " + data.d.Resultado.length);

            $("#tbl_clinica button").click(function () {
                if ($(this).attr("name") === "editar") {
                    $('#pnl_clinica .modal-title').html('Editar Convenio');

                    txh_clinica = $(this).parent().parent().find("td").eq(1).html();
                    txh_clinica = validaTableMobile(txh_clinica);

                    objE = {
                        ID_ENCRIP: txh_clinica
                    };

                    $.ajax({
                        type: "POST",
                        url: "page/mantenimiento/clinica.aspx/ObtenerClinicaWM",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify({ objE: objE }),
                        async: true,
                        beforeSend: function () {
                            $("#errorClinica").html('');
                            $("#tbl_clinica button").attr("disabled", true);
                        },
                        success: function (data) {
                            $("#tbl_clinica button").removeAttr("disabled");

                            if (data.d.error) {
                                $("#errorDiv").html(GenerarAlertaError(data.d.error));
                                return;
                            }

                            $("#sel_tipo").val(data.d.Resultado.CONVENIO_TIPO_ID).change();
                            $("#txt_nombre").val(data.d.Resultado.NOMBRE);
                            $("#txt_telefono").val(data.d.Resultado.TELEFONO);
                            $("#chk_pto_autorizado").val(data.d.Resultado.PUNTO_AUTORIZADO);
                            $("#txt_beneficio").val(data.d.Resultado.BENEFICIO);
                            //Domicilio
                            $("#sel_departamento").val(data.d.Resultado.DEPARTAMENTO).change();
                            prov_id = data.d.Resultado.PROVINCIA;
                            dis_id = data.d.Resultado.GEOGRAFIA_ID;
                            $("#txt_direccion").val(data.d.Resultado.DIRECCION);
                            $("#txt_latitud").val(data.d.Resultado.LATITUD);
                            $("#txt_longitud").val(data.d.Resultado.LONGITUD);

                            activaTab('dato');
                            $("#pnl_clinica").modal('show');
                        },
                        error: function (data) {
                            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                            $("#tbl_clinica button").removeAttr("disabled");
                        }
                    });
                    event.preventDefault();
                } else if ($(this).attr("name") === "anular") {
                    txh_idConfirm = 'ANULAR';
                    txh_clinica = $(this).parent().parent().find("td").eq(1).html();
                    txh_clinica = validaTableMobile(txh_clinica);
                    window.parent.fc_mostrar_confirmacion("¿Esta seguro de <strong>ELIMINAR</strong> el Convenio?");
                }
            });

            closeLoading();
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#btn_buscar").removeAttr("disabled");
            closeLoading();
        }
    });
}
function limpiarClinica() {
    $("#errorDiv").html('');
    $("#errorClinica").html('');

    $("#pnl_clinica input").val('');
    $("#pnl_clinica textarea").val('');
    $("#chk_pto_autorizado").prop('checked', false);
    $('#sel_tipo').val(null).change();
    $('#sel_departamento').val(null).change();
    $("#sel_provincia").empty();
    $("#sel_distrito").empty();

    prov_id = 0;
    dis_id = 0;
    txh_clinica = "";
}
/*Eventos por Control*/
$(document).on('keypress', function (evt) {
    switch (evt ? evt.which : event.keyCode) {
        case 8: //BLOQUEA RETROCESO DE PAGINA
            var valor = document.activeElement.value;
            if (valor === undefined) { return false; } break;
        case 13: //BLOQUEA ENTER
            $("#btn_buscar").click();
            break;
    }
});
$("#sel_departamento").on('change', function () {
    /************************ Listado de Provincia ****************************/
    var objE = {
        CODIGO: "PROVINCIA",
        vPARAM1: $("#sel_departamento").val()
    };

    if ($("#sel_departamento").val() === '') {
        return false;
    }

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/mascota.aspx/listarParametro",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE }),
        async: true,
        beforeSend: function () {
            openLoading();
            $('#sel_provincia').empty();
            $("#sel_distrito").empty();
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorMascota").html(GenerarAlertaError(data.d.Mensaje));
                closeLoading();
                return;
            }

            $('#sel_provincia').append("<option></option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_provincia').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }

            if (prov_id !== 0) {
                $("#sel_provincia").val(prov_id).change();
                prov_id = 0;
            }
            closeLoading();
        },
        error: function (data) {
            $("#errorMascota").html(GenerarAlertaError("Inconveniente en la operación"));
            closeLoading();
        }
    });
});
$("#sel_provincia").on('change', function () {
    /************************ Listado de Distrito ****************************/
    var objE = {
        CODIGO: "DISTRITO",
        vPARAM1: $("#sel_departamento").val(),
        vPARAM2: $("#sel_provincia").val()
    };

    if ($("#sel_provincia").val() === '') {
        return false;
    }

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/mascota.aspx/listarParametro",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE }),
        async: true,
        beforeSend: function () {
            openLoading();
            $('#sel_distrito').empty();
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorMascota").html(GenerarAlertaError(data.d.Mensaje));
                closeLoading();
                return;
            }

            $('#sel_distrito').append("<option></option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_distrito').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }

            if (dis_id !== 0) {
                $("#sel_distrito").val(dis_id).change();
            }

            closeLoading();
        },
        error: function (data) {
            $("#errorMascota").html(GenerarAlertaError("Inconveniente en la operación"));
            closeLoading();
        }
    });
});
$("#btn_buscar").click(function () {
    fc_listar_clinica();
});
$("#btn_nuevo").click(function () {
    limpiarClinica();
    $('#pnl_clinica .modal-title').html('Registrar Convenio');
    $("#pnl_clinica").modal('show');

    $("#sel_tipo").focus();
});
$("#btn_guardar").click(function (evt) {
    $("#errorClinica").html('');
    if (validIdInput($("#sel_tipo").val())) {
        $("#errorClinica").html(GenerarAlertaWarning("Tipo: seleccione un tipo"));
        activaTab('dato');
        $("#sel_tipo").focus();
        return;
    } else if (validIdInput($("#txt_nombre").val())) {
        $("#errorClinica").html(GenerarAlertaWarning("Nombre: Ingrese un nombre"));
        activaTab('dato');
        $("#txt_nombre").focus();
        return;
    } else if (validIdInput($("#txt_telefono").val())) {
        $("#errorClinica").html(GenerarAlertaWarning("Telefono: Ingrese un telefono"));
        activaTab('dato');
        $("#txt_telefono").focus();
        return;
    } else if (validIdInput($("#txt_beneficio").val())) {
        $("#errorClinica").html(GenerarAlertaWarning("Beneficio: Ingrese el beneficio del convenio"));
        activaTab('dato');
        $("#txt_beneficio").focus();
        return;
    } else if (validIdInput($("#sel_departamento").val())) {
        $("#errorClinica").html(GenerarAlertaWarning("Departamento: seleccione un Departamento"));
        activaTab('domicilio');
        $("#sel_departamento").focus();
        return;
    } else if (validIdInput($("#sel_provincia").val())) {
        $("#errorClinica").html(GenerarAlertaWarning("Provincia: seleccione una Provincia"));
        activaTab('domicilio');
        $("#sel_provincia").focus();
        return;
    } else if (validIdInput($("#sel_distrito").val())) {
        $("#errorClinica").html(GenerarAlertaWarning("Distrito: seleccione un Distrito"));
        activaTab('domicilio');
        $("#sel_distrito").focus();
        return;
    } else if (validIdInput($("#txt_direccion").val())) {
        $("#errorClinica").html(GenerarAlertaWarning("Dirección: seleccione una Dirección"));
        activaTab('domicilio');
        $("#txt_direccion").focus();
        return;
    } else if (validIdInput($("#txt_latitud").val())) {
        $("#errorClinica").html(GenerarAlertaWarning("Latitud: ingrese la latitud"));
        activaTab('domicilio');
        $("#txt_latitud").focus();
        return;
    } else if (validIdInput($("#txt_longitud").val())) {
        $("#errorClinica").html(GenerarAlertaWarning("Longitud: ingrese la longitud"));
        activaTab('domicilio');
        $("#txt_longitud").focus();
        return;
    }

    openLoading();
    
    var objE = {
        ID_ENCRIP: txh_clinica,
        NOMBRE: $("#txt_nombre").val(),
        TELEFONO: $("#txt_telefono").val(),
        BENEFICIO: $("#txt_beneficio").val(),
        PUNTO_AUTORIZADO: $("#chk_pto_autorizado").attr("checked") ? 1 : 0,
        CONVENIO_TIPO_ID: $("#sel_tipo").val(),
        DIRECCION: $("#txt_direccion").val(),
        LATITUD: $("#txt_latitud").val(),
        LONGITUD: $("#txt_longitud").val(),
        GEOGRAFIA_ID: $("#sel_distrito").val()
    };

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/clinica.aspx/ActualizarClinicaWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE }),
        async: true,
        beforeSend: function () {
            $("#btn_guardar").attr("disabled", true);
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorClinica").html(GenerarAlertaError(data.d.Mensaje));
                $("#btn_guardar").attr("disabled", false);
                closeLoading();
                return;
            }

            $("#errorDiv").html(GenerarAlertaSuccess(data.d.Mensaje));
            $("#pnl_clinica").modal('hide');
            $("#btn_guardar").attr("disabled", false);
            fc_listar_clinica();
        },
        error: function (data) {
            $("#errorClinica").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#btn_guardar").attr("disabled", false);
            closeLoading();
        }
    });
});