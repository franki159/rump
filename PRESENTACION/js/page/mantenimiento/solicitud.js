var txh_idConfirm;
var id_solicitud;
var rov_id, dis_id;
var valRND = Math.floor(Math.random() * 100);
/*Inicializar Script*/
$(function () {
    $(document).unbind("keydown");

    $('.dtOp').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        orientation: "top left"
    });
    $('.continue').click(function () {
        $('.nav-tabs .active').parent().next('li').find('a').trigger('click');
    });
    $('.back').click(function () {
        $('.nav-tabs .active').parent().prev('li').find('a').trigger('click');
    });
    $("#sel_estado").val(1);
    $("#pnl_editar").modal({ show: false, backdrop: 'static' });
    fc_listar_inicio();
    closeLoading();

    ////Fecha actual
    var fullDate = new Date();
    var primerDia = new Date(fullDate.getFullYear(), fullDate.getMonth(), 1);
    var ultimoDia = new Date(fullDate.getFullYear(), fullDate.getMonth() + 1, 0);
    
    $("#txt_ini").val(formatDate(primerDia, "yyyy-MM-dd"));
    $("#txt_fin").val(formatDate(fullDate, "yyyy-MM-dd"));

    $("#txt_bus_email").focus();
});

/*Funciones*/
function activaTab(tab) {
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
}
function fc_listar_inicio() {
    openLoading();
    /************************ Departamento ****************************/
    var objE = {
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

            $('#sel_departamento').append("<option></option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_departamento').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            closeLoading();
        }
    });
    //Listar servicio
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/solicitud.aspx/ListaServicioWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () {            
            $('#tbl_solicitud tbody').empty();
            openLoading();
        },
        success: function (data) {
            $("#btn_buscar").removeAttr("disabled");

            if (!data.d.Activo) {
                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                closeLoading();
                return;
            }

            $('#sel_tipo').append("<option value='0'>TODOS</option");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_tipo').append("<option value='" + data.d.Resultado[i].ID + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }

            closeLoading();
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#btn_buscar").removeAttr("disabled");
            closeLoading();
        }
    });
}
function fc_listar_solicitud(p_sinc) {
    openLoading();

    var eSolicitud = {
        DNI: $("#txt_bus_dni").val(),
        EMAIL: $("#txt_bus_email").val(),
        ID: $("#sel_tipo").val(),
        ESTADO: $("#sel_estado").val(),
        FEC_INI: $("#txt_ini").val() === "" ? null : getDateFromFormat($("#txt_ini").val(), 'yyyy-MM-dd'),
        FEC_FIN: $("#txt_fin").val() === "" ? null : getDateFromFormat($("#txt_fin").val(), 'yyyy-MM-dd')
    };
    
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/solicitud.aspx/ListaSolicitudWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            objE: eSolicitud
        }),
        async: p_sinc,
        beforeSend: function () {
            $('#errorDiv').empty();
            $('#tbl_solicitud tbody').empty();
            openLoading();
        },
        success: function (data) {
            $("#btn_buscar").removeAttr("disabled");

            if (!data.d.Activo) {
                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                closeLoading();
                return;
            }

            var htmlBotones = '' +/*'<button name="atender" title="Atender solicitud" class="btn btn-success btn-sm"><i class="far fa-thumbs-up"></i></button> ' +*/
                '<button name="editar" title="Editar solicitud"  class="btn btn-primary btn-sm"><i class="fas fa-pen"></i></button> '; 
                /*'<button name="anular" title="Anular solicitud"  class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>';*/

            var html = '';
            for (var i = 0; i < data.d.Resultado.length; i++) {
                html += '<tr><td style="display:none">' + data.d.Resultado[i].ID_ENCRIP + '</td>';
                if (data.d.Resultado[i].ESTADO === 1) {
                    html += '<td><button name="editar" title="Editar solicitud" class="btn btn-primary btn-sm"><i class="fas fa-pen"></i></button></td>';
                } else if (data.d.Resultado[i].ESTADO === 3) {
                    if (data.d.Resultado[i].SOL_TOMADA === 1) {
                        html += '<td><button name="editar" title="Editar solicitud" class="btn btn-warning btn-sm"><i class="fas fa-pen"></i></button></td>';
                    } else {
                        html += '<td>' + data.d.Resultado[i].vPARAM2 + '</td>';
                    }                    
                } else {
                    html += '<td>' + data.d.Resultado[i].vPARAM2 + '</td>';
                }
                html += '<td>Solicitud ' + data.d.Resultado[i].TIPO + '</td>';
                html += '<td class="text-center">' + data.d.Resultado[i].vPARAM1 + '</td>';
                html += '<td class="text-center">' + data.d.Resultado[i].DNI + '</td>';
                html += '<td>' + data.d.Resultado[i].MASCOTA + '</td>';
                html += '<td>' + data.d.Resultado[i].PROPIETARIO + '</td>';
                html += '<td class="text-center">' + data.d.Resultado[i].EMAIL + '</td>';
                html += '<td class="text-center">' + data.d.Resultado[i].TELEFONO + '</td>';
                html += '<td class="text-center">' + (data.d.Resultado[i].NOM_REP === "" ? "No" : "Si") + '</td>';
                html += '<td class="text-center">' + (data.d.Resultado[i].DIRECCION === "" ? "No" : "Si") + '</td></tr>';

                //html += '<td>' + data.d.Resultado[i].NOM_REP + ' ' + data.d.Resultado[i].APE_REP + '</td>';
                //html += '<td>' + data.d.Resultado[i].DNI_REP + '</td>';
                //html += '<td>' + data.d.Resultado[i].TEL_REP + '</td>';
                //html += '<td>' + data.d.Resultado[i].DEPARTAMENTO + '|' + data.d.Resultado[i].PROVINCIA + '|' + data.d.Resultado[i].DISTRITO + '</td>';
                //html += '<td>' + data.d.Resultado[i].DIRECCION + '</td>';
                //html += '<td>' + data.d.Resultado[i].REFERENCIA + '</td></tr>';
            }

            $("#tbl_solicitud tbody").append(html);
            $("#lblTotalReg").html("Total Registros: " + data.d.Resultado.length);

            $("#tbl_solicitud button").click(function () {
                if ($(this).attr("name") === "editar") {
                    limpiarEdicion();
                    id_solicitud = $(this).parent().parent().find("td").eq(0).html();
                    id_solicitud = validaTableMobile(id_solicitud);

                    var eSolicitud = {
                        SOLICITUD_ID_ENCRIP: id_solicitud
                    };
                    
                    $.ajax({
                        type: "POST",
                        url: "page/mantenimiento/solicitud.aspx/ListaSolicitudxIdWM",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify({
                            objE: eSolicitud
                        }),
                        async: true,
                        beforeSend: function () {
                            openLoading();
                        },
                        success: function (data) {
                            $("#btn_buscar").removeAttr("disabled");
                            
                            if (!data.d.Activo) {
                                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                                closeLoading();
                                return;
                            }
                            //solicitud
                            $("#pnl_editar .modal-title").html(data.d.Resultado.TIPO);
                            //$("#srv-tip").html(data.d.Resultado[0].TIPO);
                            $("#srv-pre").html(data.d.Resultado.TOTAL);
                            $("#srv-fec").html(data.d.Resultado.vPARAM1);
                            switch (data.d.Resultado.ESTADO) {
                                case 0: $("#srv-est").css("border-color", "#e74a3b"); $("#srv-est").css("color", "#e74a3b!important"); break;
                                case 1: $("#srv-est").css("border-color", "#858796"); $("#srv-est").css("color", "#858796!important"); break;
                                case 2: $("#srv-est").css("border-color", "#1cc88a"); $("#srv-est").css("color", "#1cc88a!important"); break;
                                case 3: $("#srv-est").css("border-color", "#f6c23e"); $("#srv-est").css("color", "#f6c23e!important"); break;
                                default:
                            }
                            $("#srv-est").html(data.d.Resultado.EST_DSC);
                            //mascota
                            $("#imgMascotaCita").attr("src", "img/mascota/" + data.d.Resultado.FOTO + '?v=' + valRND);
                            $("#dni-dni-msc").html(data.d.Resultado.DNI);
                            $("#dni-nom-msc").html(data.d.Resultado.MASCOTA);
                            $("#dni-prop-msc").html(data.d.Resultado.PROPIETARIO);
                            $("#dni-email-msc").html(data.d.Resultado.EMAIL);
                            $("#dni-tel-msc").html(data.d.Resultado.TELEFONO);  
                            if (data.d.Resultado.COMENTARIO === "") {
                                $("#lbl-com-sol").hide();
                            } else {
                                $("#lbl-com-sol").show();
                                $("#lbl-com-sol").html(data.d.Resultado.COMENTARIO);
                            }
                            
                            $("#txt_comentario").val('');
                            
                            $("#txt-nom").val(data.d.Resultado.NOM_REP);
                            $("#txt-ape").val(data.d.Resultado.APE_REP);
                            $("#txt-tel").val(data.d.Resultado.TEL_REP);
                            $("#txt-dni").val(data.d.Resultado.DNI_REP);

                            $("#sel_departamento").val(data.d.Resultado.DEPARTAMENTO).change();
                            prov_id = data.d.Resultado.PROVINCIA;
                            dis_id = data.d.Resultado.GEOGRAFIA_ID;
                            $("#txt_direccion").val(data.d.Resultado.DIRECCION);
                            $("#txt_referencia").val(data.d.Resultado.REFERENCIA);

                            activaTab('dato');
                            closeLoading();
                            $("#pnl_editar").modal('show');
                        },
                        error: function (data) {
                            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                            $("#btn_buscar").removeAttr("disabled");
                            closeLoading();
                        }
                    });
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
function aceptarConfirm() {
    switch (txh_idConfirm) {
        case "ATENDER":
            var objE = {
                ID_ENCRIP: id_solicitud,
                COMENTARIO: $("#txt_comentario").val()
            };

            $.ajax({
                type: "POST",
                url: "page/mantenimiento/solicitud.aspx/AtenderSolicitudWM",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({ objE: objE }),
                async: true,
                beforeSend: function () {
                    $("#errorDiv").html('');
                    $("#tbl_solicitud button").attr("disabled", true);
                    openLoading();
                },
                success: function (data) {
                    $("#tbl_solicitud button").removeAttr("disabled");
                    if (!data.d.Activo) {
                        $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                        closeLoading();
                        return;
                    }

                    $("#errorDiv").html(GenerarAlertaSuccess(data.d.Mensaje));
                    fc_listar_solicitud(false);
                    $("#pnl_editar").modal('hide');
                    closeLoading();
                },
                error: function (data) {
                    $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                    $("#tbl_solicitud button").removeAttr("disabled");
                    closeLoading();
                }
            });
            event.preventDefault();
            break;
        case "ANULAR":
            objE = {
                ID_ENCRIP: id_solicitud,
                COMENTARIO: $("#txt_comentario").val()
            };

            $.ajax({
                type: "POST",
                url: "page/mantenimiento/solicitud.aspx/AnularSolicitudWM",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({ objE: objE }),
                async: true,
                beforeSend: function () {
                    $("#errorDiv").html('');
                    $("#tbl_solicitud button").attr("disabled", true);
                    openLoading();
                },
                success: function (data) {
                    $("#tbl_solicitud button").removeAttr("disabled");
                    if (!data.d.Activo) {
                        $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                        closeLoading();
                        return;
                    }

                    $("#errorDiv").html(GenerarAlertaSuccess(data.d.Mensaje));
                    fc_listar_solicitud(false);
                    $("#pnl_editar").modal('hide');
                    closeLoading();
                },
                error: function (data) {
                    $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                    $("#tbl_solicitud button").removeAttr("disabled");
                    closeLoading();
                }
            });
            event.preventDefault();
            break;
        case "LIBERAR":
            objE = {
                ID_ENCRIP: id_solicitud
            };

            $.ajax({
                type: "POST",
                url: "page/mantenimiento/solicitud.aspx/LiberarSolicitud",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({ objE: objE }),
                async: true,
                beforeSend: function () {
                    $("#errorDiv").html('');
                    $("#tbl_solicitud button").attr("disabled", true);
                    openLoading();
                },
                success: function (data) {
                    $("#tbl_solicitud button").removeAttr("disabled");
                    if (!data.d.Activo) {
                        $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                        closeLoading();
                        return;
                    }

                    $("#errorDiv").html(GenerarAlertaSuccess(data.d.Mensaje));
                    fc_listar_solicitud(false);
                    $("#pnl_editar").modal('hide');
                    closeLoading();
                },
                error: function (data) {
                    $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                    $("#tbl_solicitud button").removeAttr("disabled");
                    closeLoading();
                }
            });
            event.preventDefault();
            break;
        case "GUARDAR":
            objE = {
                ID_ENCRIP: id_solicitud,
                NOM_REP: $("#txt-nom").val(),
                APE_REP: $("#txt-ape").val(),
                TEL_REP: $("#txt-tel").val(),
                DNI_REP: $("#txt-dni").val(),
                DIRECCION: $("#txt_direccion").val(),
                REFERENCIA: $("#txt_referencia").val(),
                GEOGRAFIA_ID: $("#sel_distrito").val(),
                COMENTARIO: $("#txt_comentario").val()
            };

            $.ajax({
                type: "POST",
                url: "page/mantenimiento/solicitud.aspx/ActualizarSolicitudWM",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({ objE: objE }),
                async: true,
                beforeSend: function () {
                    openLoading();
                },
                success: function (data) {
                    if (!data.d.Activo) {
                        $("#errorSolicitud").html(GenerarAlertaWarning(data.d.Mensaje));
                        closeLoading();
                        return false;
                    }

                    fc_listar_solicitud(false);
                    $("#pnl_editar").modal('hide');
                    closeLoading();
                },
                error: function (data) {
                    $("#errorSolicitud").html(GenerarAlertaError("Inconveniente en la operación"));
                    closeLoading();
                    return false;
                }
            });
            event.preventDefault();
            break;
        default:
            break;
    }
}

function limpiarEdicion() {
    $("#errorSolicitud").html('');
    prov_id = 0;
    dis_id = 0;
    id_solicitud = 0;
    $('#sel_departamento').val(null).change();
    $("#sel_provincia").empty();
    $("#sel_distrito").empty();
}
function limpiarSolicitud() {
    $("#errorDiv").html('');
    txh_idConfirm = "";
    $("#pnl_busqueda").css("pointer-events", "visible");
    //$("#pnl_busqueda select").val('0');
    //$("#pnl_busqueda input").val('');
    //$("#pnl_busqueda textarea").val('');
    //$("#pnl_busqueda select").attr("disabled", false);
    //$("#pnl_busqueda input").attr("disabled", false);
 
}
/*Eventos por Control*/
$(document).keydown(function (evt) {
    switch (evt ? evt.which : event.keyCode) {
        case 8: //BLOQUEA RETROCESO DE PAGINA
            var valor = document.activeElement.value;
            if (valor === undefined) { return false; } break;
        case 13: //BLOQUEA ENTER
            return false;
        case 66: //BUSCAR
            if (evt ? evt.altKey : event.altKey) $("#btn_buscar").click();
            break;
        case 78: //NUEVO
            if (evt ? evt.altKey : event.altKey) $("#btn_nuevo").click();
            break;
        case 71: //GUARDAR
            if (evt ? evt.altKey : event.altKey) {
                if ($("#pnl_usuario").css('display') === 'block') {
                    $("#btn_guardar").click();
                }
            }
            break;
    }
});

$("#btn_buscar").click(function () {
    $("#btn_buscar").attr("disabled", true);
    fc_listar_solicitud(true);
});
$("#btn_exportar").click(function () {
    $("#btn_exportar").attr("disabled", true);
    var total_reg = $('#tbl_solicitud tr').length;

    if (total_reg < 2) {
        $("#errorDiv").html(GenerarAlertaWarning("Cantidad de Registros: No hay registros para exportar"));
        $("#btn_exportar").attr("disabled", false);
        return;
    }
    exportGridToExcel("tbl_solicitud", "solicitudes_rump");
    $("#btn_exportar").attr("disabled", false);
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
$("#btn_guardar").click(function () {
    if (validIdInput($("#txt_comentario").val())) {
        $("#errorSolicitud").html(GenerarAlertaWarning("Comentario: Ingrese un comentario"));
        $("#txt_comentario").focus();
        return;
    }

    limpiarSolicitud();
    txh_idConfirm = 'GUARDAR';
    window.parent.fc_mostrar_confirmacion("¿Esta seguro de <strong>Guardar</strong> la solicitud?");    
});
$("#btn_atender").click(function () {
    if (validIdInput($("#txt_comentario").val())) {
        $("#errorSolicitud").html(GenerarAlertaWarning("Comentario: Ingrese un comentario"));
        $("#txt_comentario").focus();
        return;
    }
    limpiarSolicitud();
    txh_idConfirm = 'ATENDER';
    window.parent.fc_mostrar_confirmacion("¿Esta seguro de <strong>Atender</strong> la solicitud?");
});
$("#btn_liberar").click(function () {
    limpiarSolicitud();
    txh_idConfirm = 'LIBERAR';
    window.parent.fc_mostrar_confirmacion("¿Esta seguro de <strong>LIBERAR</strong> la solicitud?");
});
$("#btn_anular").click(function () {
    if (validIdInput($("#txt_comentario").val())) {
        $("#errorSolicitud").html(GenerarAlertaWarning("Comentario: Ingrese un comentario"));
        $("#txt_comentario").focus();
        return;
    }
    limpiarSolicitud();
    txh_idConfirm = 'ANULAR';
    window.parent.fc_mostrar_confirmacion("¿Esta seguro de <strong>Anular</strong> la solicitud?");
});
