var raza_id, prov_id, dis_id, foto_dsc;
var id_mascota, foto_id;
/*Inicializar Script*/
$(function () {
    $(document).unbind("keydown");

    $('.dtOp').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        orientation: "top left"
    });

    $("#pnl_mascota").modal({show: false, backdrop: 'static' });

    $(document).keyup(function (e) {
        if (e.keyCode === 13) {
            if ($(this).attr("id") === "pnl_busqueda") $("#btn_buscar").click();
            else $("#pnl_busqueda").focus();
        }
    });

    $('.continue').click(function () {
        $('.nav-tabs > .active').next('li').find('a').trigger('click');
    });
    $('.back').click(function () {
        $('.nav-tabs > .active').prev('li').find('a').trigger('click');
    });

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        async: true,
        beforeSend: function () {
            $("#pleaseWaitDialog").modal();
        },
        success: function (data) {
            window.parent.InfoSesion();
            fc_listar_inicio();
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#pleaseWaitDialog").modal('hide');
        }
    });

    $("#txt_bus_dni").focus();
});
function activaTab(tab) {
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
}
function fc_listar_inicio() {
    /************************ Listado de Tipo ****************************/
    if (sessionStorage.getItem('PERFIL_ID') === "4") {
        $("#divBusqueda").remove();
        fc_listar_mascota();
    } else {
        $("#divBusqueda").show();
    }
  
    var objE = {
        CODIGO: "TIPO"
    };

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/mascota.aspx/listarParametro",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE}),
        async: true,
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                $("#pleaseWaitDialog").modal('hide');
                return;
            }

            $('#sel_tipo').append("<option></option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_tipo').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#pleaseWaitDialog").modal('hide');
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
        async: true,
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                $("#pleaseWaitDialog").modal('hide');
                return;
            }

            $('#sel_departamento').append("<option></option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_departamento').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }

            $("#pleaseWaitDialog").modal('hide');
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#pleaseWaitDialog").modal('hide');
        }
    });
}
/*Funciones*/
function fc_listar_mascota() {
    $("#pleaseWaitDialog").modal();

    var eMascota = {
        DNI: $("#txt_bus_dni").val(),
        USUARIO_ID: 0
    };

    if (sessionStorage.getItem('PERFIL_ID') === "4") {
        eMascota = {
            DNI: "",
            USUARIO_ID: sessionStorage.getItem('ID')
        };
    }

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/mascota.aspx/ListaMascotaWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            objE: eMascota
        }),
        async: true,
        beforeSend: function () {
            $("#btn_buscar").attr("disabled", true);
            $('#tbl_mascota tbody').empty();
        },
        success: function (data) {
            $("#btn_buscar").removeAttr("disabled");

            if (!data.d.Activo) {
                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                $("#pleaseWaitDialog").modal('hide');
                return;
            }
            
            var htmlBotones = '<button name="editar" class="btn btn-primary btn-xs"><i class="icon-pencil"></i></button> ' +
                '<button name="anular" class="btn btn-danger btn-xs"><i class="icon-trash "></i></button> ';

            var html = '';
            for (var i = 0; i < data.d.Resultado.length; i++) {
                html += '<tr><td style="display:none">' + data.d.Resultado[i].ID + '</td>';
                html += '<td>' + htmlBotones + '</td>';
                html += '<td>' +
                            '<div>' +
                                '<a href="#" name="detalles" id="' + data.d.Resultado[i].ID + '" data-toggle="modal" data-target="#modalVerMascota">' +
                    '<img class="img-row-mascota" src="img/mascota/' + data.d.Resultado[i].FOTO + '" onerror="this.src=\'img/noPets.png\';">' +
                                '</a>' +
                            '</div>'+
                        '</td>';
                html += '<td>' + data.d.Resultado[i].NOMBRE + '</td>';
                html += '<td>' + data.d.Resultado[i].SEXO + '</td>';
                html += '<td>' + data.d.Resultado[i].TAMANO + '</td>';
                html += '<td>' + data.d.Resultado[i].COLOR + '</td>';
                html += '<td>' + data.d.Resultado[i].TIPO_DSC + '</td>';
                html += '<td>' + data.d.Resultado[i].RAZA_DSC + '</td></tr>';
            }

            $("#tbl_mascota tbody").append(html);
            $("#lblTotalReg").html("Total Registros: " + data.d.Resultado.length);

            $("#tbl_mascota button").click(function () {
                limpiarMascota();
                id_mascota = $(this).parent().parent().find("td").eq(0).html();

                if ($(this).attr("name") === "editar") {
                    $('#pnl_mascota .modal-title').html('Editar Mascota');
                    var objE = {
                        ID: id_mascota
                    };
                    
                    $.ajax({
                        type: "POST",
                        url: "page/mantenimiento/mascota.aspx/ObtenerMascotaWM",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify({ objE: objE }),
                        async: true,
                        beforeSend: function () {
                            $("#tbl_mascota button").attr("disabled", true);
                        },
                        success: function (data) {
                            $("#tbl_mascota button").removeAttr("disabled");

                            if (data.d.error) {
                                $("#errorDiv").html(GenerarAlertaError(data.d.error));
                                return;
                            }

                            $("#txt_nombre").attr("disabled", true);
                            $("#txt_apellido").attr("disabled", true);
                            $("#sel_sexo").attr("disabled", true);
                            $("#txt_fecha_nac").attr("disabled", true);
                            $("#txt_nombre").val(data.d.Resultado.NOMBRE);
                            $("#txt_apellido").val(data.d.Resultado.APELLIDO);
                            $("#sel_sexo").val(data.d.Resultado.SEXO).change();
                            $("#sel_tamano").val(data.d.Resultado.TAMANO).change();
                            $("#sel_tipo").val(data.d.Resultado.MASCOTA_TIPO_ID).change();
                            raza_id = data.d.Resultado.MASCOTA_RAZA_ID;//$("#sel_raza").val(data.d.Resultado.MASCOTA_RAZA_ID).change();
                            $("#sel_calificacion").val(data.d.Resultado.CALIFICACION).change();
                            $("#txt_color").val(data.d.Resultado.COLOR);
                            if (data.d.Resultado.FEC_NAC !== null) {
                                $("#txt_fecha_nac").val(formatDate(parseDateServer(data.d.Resultado.FEC_NAC), "dd/MM/yyyy")).change();
                                $("#txt_fecha_nac").parent().datepicker("update", $("#txt_fecha_nac").val());
                            }
                            //Familia
                            $("#txt_nom_padre").val(data.d.Resultado.FAMILIARP);
                            $("#txt_dni_padre").val(data.d.Resultado.DNIP);
                            $("#txt_tel_padre").val(data.d.Resultado.TELEFONOP);
                            $("#txt_nom_madre").val(data.d.Resultado.FAMILIARM);
                            $("#txt_dni_madre").val(data.d.Resultado.DNIM);
                            $("#txt_tel_madre").val(data.d.Resultado.TELEFONOM);
                            $("#txt_biografia").val(data.d.Resultado.BIOGRAFIA);
                            //Domicilio
                            $("#sel_departamento").val(data.d.Resultado.DEPARTAMENTO).change();
                            prov_id = data.d.Resultado.PROVINCIA;//$("#sel_provincia").val(data.d.Resultado.PROVINCIA).change();
                            dis_id = data.d.Resultado.DISTRITO;//$("#sel_distrito").val(data.d.Resultado.DISTRITO).change();
                            $("#txt_direccion").val(data.d.Resultado.DIRECCION);
                            $("#txt_piso").val(data.d.Resultado.PISO);
                            $("#txt_referencia").val(data.d.Resultado.REFERENCIA);
                            //Salud
                            $("#sel_castrada").val(data.d.Resultado.CASTRADO).change();
                            $("#sel_visita").val(data.d.Resultado.VISITA).change();
                            $("#sel_alergia_med").val(data.d.Resultado.ALERGIA_MEDICAMENTO).change();
                            $("#sel_calendario").val(data.d.Resultado.VACUNACION).change();
                            $("#sel_vac_sextuple").val(data.d.Resultado.SEXTUPLE).change();
                            if (data.d.Resultado.FEC_SEXTUPLE !== null) {
                                $("#txt_fec_vac_sext").val(formatDate(parseDateServer(data.d.Resultado.FEC_SEXTUPLE), "dd/MM/yyyy")).change();
                                $("#txt_fec_vac_sext").parent().datepicker("update", $("#txt_fec_vac_sext").val());
                            }                            
                            $("#sel_vac_triple").val(data.d.Resultado.TRIPLEFEL).change();
                            if (data.d.Resultado.FEC_TRIPLEFEL !== null) {
                                $("#txt_fec_vac_triple").val(formatDate(parseDateServer(data.d.Resultado.FEC_TRIPLEFEL), "dd/MM/yyyy")).change();
                                $("#txt_fec_vac_triple").parent().datepicker("update", $("#txt_fec_vac_triple").val());
                            }
                            $("#sel_vac_leucemia").val(data.d.Resultado.LEUCEMIA).change();
                            if (data.d.Resultado.FEC_LEUCEMIA !== null) {
                                $("#txt_fec_vac_leucemia").val(formatDate(parseDateServer(data.d.Resultado.FEC_LEUCEMIA), "dd/MM/yyyy")).change();
                                $("#txt_fec_vac_leucemia").parent().datepicker("update", $("#txt_fec_vac_leucemia").val());
                            }                            
                            $("#sel_vac_antirrabica").val(data.d.Resultado.ANTIRRABICA).change();
                            if (data.d.Resultado.FEC_ANTIRRABICA !== null) {
                                $("#txt_fec_vac_antirrabica").val(formatDate(parseDateServer(data.d.Resultado.FEC_ANTIRRABICA), "dd/MM/yyyy")).change();
                                $("#txt_fec_vac_antirrabica").parent().datepicker("update", $("#txt_fec_vac_antirrabica").val());
                            }                            
                            $("#sel_dental").val(data.d.Resultado.LIMP_DENTAL).change();
                            if (data.d.Resultado.FEC_DESPARACITACION !== null) {
                                $("#txt_fec_desparacitacion").val(formatDate(parseDateServer(data.d.Resultado.FEC_DESPARACITACION), "dd/MM/yyyy")).change();
                                $("#txt_fec_desparacitacion").parent().datepicker("update", $("#txt_fec_desparacitacion").val());
                            }                            
                            $("#sel_alergia").val(data.d.Resultado.ALERGIA).change();
                            $("#txt_alergia").val(data.d.Resultado.ALERGIA_DSC);
                            $("#sel_enfermedad").val(data.d.Resultado.ENFERMEDAD).change();
                            $("#txt_enfermedad").val(data.d.Resultado.ENFERMEDAD_DSC);
                            foto_id = data.d.Resultado.GALERIA_ID;
                            foto_dsc = data.d.Resultado.FOTO;
                            $("#img_Foto").attr("src", "img/mascota/" + data.d.Resultado.FOTO);
                            activaTab('dato');
                            $("#pnl_mascota").modal('show');
                        },
                        error: function (data) {
                            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                            $("#tbl_mascota button").removeAttr("disabled");
                        }
                    });
                    event.preventDefault();
                } else if ($(this).attr("name") === "anular") {
                    $("#txh_idConfirm").val('ANULAR');
                    window.parent.fc_mostrar_confirmacion("¿Esta seguro de <strong>Eliminar</strong> la mascota?");
                }
            });

            $("#tbl_mascota a").click(function () {
                if ($(this).attr("name") === "detalles") {
                    var objE = {
                        ID: $(this).attr("id")
                    };

                    $.ajax({
                        type: "POST",
                        url: "page/mantenimiento/mascota.aspx/ObtenerMascotaWM",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify({ objE: objE }),
                        async: true,
                        beforeSend: function () {
                            $("#errorMascota_v").html('');
                            $("#tbl_mascota button").attr("disabled", true);
                        },
                        success: function (data) {
                            $("#tbl_mascota button").removeAttr("disabled");

                            if (data.d.error) {
                                $("#errorDiv").html(GenerarAlertaError(data.d.error));
                                return;
                            }

                            $("#img_Foto_v").attr("src", "img/mascota/" + data.d.Resultado.FOTO);
                            $("#txt_nombre_v").val(data.d.Resultado.NOMBRE + ' ' + data.d.Resultado.APELLIDO);
                            $("#txt_dni_v").val(data.d.Resultado.DNI);
                            $("#txt_tel_v").val(data.d.Resultado.TELEFONOP);
                            $("#txt_dir_v").val(data.d.Resultado.DIRECCION);
                            $("#sel_calificacion_v").val(data.d.Resultado.CALIFICACION);
                          
                            $("#pnl_mascota_v").modal('show');
                        },
                        error: function (data) {
                            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                            $("#tbl_mascota button").removeAttr("disabled");
                        }
                    });
                    event.preventDefault();
                }
            });

            $("#pleaseWaitDialog").modal('hide');
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#btn_buscar").removeAttr("disabled");
            $("#pleaseWaitDialog").modal('hide');
        }
    });
}
function aceptarConfirm() {
    switch ($("#txh_idConfirm").val()) {
        case "ANULAR":
            $("#pleaseWaitDialog").modal();

            var objE = {
                ID : id_mascota
            };

            $.ajax({
                type: "POST",
                url: "page/mantenimiento/mascota.aspx/AnularMascotaWM",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({ objE: objE }),
                async: true,
                beforeSend: function () {
                    $("#errorDiv").html('');
                    $("#tbl_mascota button").attr("disabled", true);
                },
                success: function (data) {
                    $("#tbl_mascota button").removeAttr("disabled");

                    if (data.d.error) {
                        $("#errorDiv").html(GenerarAlertaError(data.d.error));
                        $("#pleaseWaitDialog").modal('hide');
                        return;
                    }

                    $("#errorDiv").html(GenerarAlertaSuccess(data.d.Mensaje));
                    fc_listar_mascota();
                },
                error: function (data) {
                    $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                    $("#tbl_mascota button").removeAttr("disabled");
                    $("#pleaseWaitDialog").modal('hide');
                }
            });
            event.preventDefault();
            break;
        default:
            break;
    }
}
function guardarImagen(evt, nameId) {
    if ($("#imgMascota")[0].files[0] !== undefined) {
        var dataImagen = new FormData();
        dataImagen.append('file', $("#imgMascota")[0].files[0]);
        dataImagen.append('name', nameId);
    }

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/hh_imagenMascota.ashx",
        data: dataImagen,
        contentType: false,
        processData: false,
        success: function (result) {
            //alert(result);
            msg_OpenDay("Registro de mascota","Mascota registrada correctamente");
        },
        error: function (err) {
            alert_OpenDay("Registro de mascota", "Error al guardar imagen");
        }
    });

    evt.preventDefault();
}
function limpiarMascota() {
    $("#errorDiv").html('');
    $("#errorMascota").html('');

    $("#divSextuple").hide();
    $("#divTriple").hide();
    $("#divLeucemia").hide();
    $("#divAntirrabica").hide();
    $("#divAlergia").hide();
    $("#divEnfermedad").hide();

    id_mascota = 0;
    foto_id = 0;
    foto_dsc = "";
    raza_id = 0;
    prov_id = 0;
    dis_id = 0;
    $("#pnl_mascota").css("pointer-events", "visible");
    $("#pnl_mascota select").val('0');
    $("#pnl_mascota input").val('');
    $("#pnl_mascota textarea").val('');
    $("#pnl_mascota input").attr("disabled", false);
    
    //$('#sel_tipo').val(null).trigger('change');
    $('#sel_tipo').val(null).change();
    $("#sel_raza").empty();
    $('#sel_departamento').val(null).change();
    $("#sel_provincia").empty();
    $("#sel_distrito").empty();
    $("#img_Foto").attr("src", "");
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
                if ($("#pnl_mascota").css('display') === 'block') {
                    $("#btn_guardar").click();
                }
            }
            break;
    }
});
$("#sel_tipo").on('change', function () {
    /************************ Listado de Raza ****************************/
    var objE = {
        CODIGO: "RAZA",
        vPARAM1: $("#sel_tipo").val()
    };

    if ($("#sel_tipo").val() === '') {
        return false;
    }

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/mascota.aspx/listarParametro",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE}),
        async: true,
        beforeSend: function () {
            $('#sel_raza').empty();
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorMascota").html(GenerarAlertaError(data.d.Mensaje));
                $("#pleaseWaitDialog").modal('hide');
                return;
            }

            $('#sel_raza').append("<option></option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_raza').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }

            if (raza_id !== 0) {
                $("#sel_raza").val(raza_id);
            }
        },
        error: function (data) {
            $("#errorMascota").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#pleaseWaitDialog").modal('hide');
        }
    });
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
        beforeSend: function (){
            $('#sel_provincia').empty();
            $("#sel_distrito").empty();
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorMascota").html(GenerarAlertaError(data.d.Mensaje));
                $("#pleaseWaitDialog").modal('hide');
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
        },
        error: function (data) {
            $("#errorMascota").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#pleaseWaitDialog").modal('hide');
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
            $('#sel_distrito').empty();
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorMascota").html(GenerarAlertaError(data.d.Mensaje));
                $("#pleaseWaitDialog").modal('hide');
                return;
            }

            $('#sel_distrito').append("<option></option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_distrito').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }

            if (dis_id !== 0) {
                $("#sel_distrito").val(dis_id).change();
            }
        },
        error: function (data) {
            $("#errorMascota").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#pleaseWaitDialog").modal('hide');
        }
    });
});
$("#sel_vac_sextuple").on('change', function () {
    if ($(this).val() === "0") {
        //$("#txt_fec_vac_sext").val('');
        $("#divSextuple").hide();
    } else if ($(this).val() === "1") {
        $("#divSextuple").show();
    }
});
$("#sel_vac_triple").on('change', function () {
    if ($(this).val() === "0") {
        //$("#txt_fec_vac_triple").val('');
        $("#divTriple").hide();
    } else if ($(this).val() === "1") {
        $("#divTriple").show();
    }
});
$("#sel_vac_leucemia").on('change', function () {
    if ($(this).val() === "0") {
        //$("#txt_fec_vac_leucemia").val('');
        $("#divLeucemia").hide();
    } else if ($(this).val() === "1") {
        $("#divLeucemia").show();
    }
});
$("#sel_vac_antirrabica").on('change', function () {
    if ($(this).val() === "0") {
        //$("#txt_fec_vac_antirrabica").val('');
        $("#divAntirrabica").hide();
    } else if ($(this).val() === "1") {
        $("#divAntirrabica").show();
    }
});
$("#sel_alergia").on('change', function () {
    if ($(this).val() === "0") {
        //$("#txt_alergia").val('');
        $("#divAlergia").hide();
    } else if ($(this).val() === "1") {
        $("#divAlergia").show();
    }
});
$("#sel_enfermedad").on('change', function () {
    if ($(this).val() === "0") {
        //$("#txt_enfermedad").val('');
        $("#divEnfermedad").hide();
    } else if ($(this).val() === "1") {
        $("#divEnfermedad").show();
    }
});

$("#btn_buscar").click(function () {
    $("#btn_buscar").button('loading');
    $("#errorDiv").html('');
    if (validIdInput($("#txt_bus_dni").val())) {
        $("#errorDiv").html(GenerarAlertaWarning("DNI: ingrese un dni válido"));
        $("#btn_buscar").button('reset');
        $("#txt_bus_dni").focus();
        return;
    }
    fc_listar_mascota();
});
$("#btn_nuevo").click(function () {
    //Si es un asesor o un administrador
    if (sessionStorage.getItem('PERFIL_ID') === "1" || sessionStorage.getItem('PERFIL_ID') === "3") {
        $("#errorPropietario").html('');
        $("#txt_correo").val('');
        $("#pnl_mascota_prop").modal('show');
    } else if (sessionStorage.getItem('PERFIL_ID') === "4") {//Propietario
        limpiarMascota();
        activaTab('dato');
        $('#pnl_mascota .modal-title').html('Registrar Mascota');
        $("#pnl_mascota").modal('show');

        if (sessionStorage.getItem('SEXO') === "Masculino") {
            $("#txt_nom_padre").val(sessionStorage.getItem('NOMBRE') + " " + sessionStorage.getItem('APELLIDO'));
        } else if (sessionStorage.getItem('SEXO') === "Femenino") {
            $("#txt_nom_madre").val(sessionStorage.getItem('NOMBRE') + " " + sessionStorage.getItem('APELLIDO'));
        }
        $("#txt_apellido").val(sessionStorage.getItem('APELLIDO'));
        $("#txt_nombre").focus();
    }
});

function miFuncion() {
    // Aquí va tu código
}
$("#btn_guardar").click(function (evt) {
    $("#btn_guardar").button('loading');

    $("#errorMascota").html('');
    if (id_mascota === 0) {//Nuevo
        if (validIdInput($("#txt_nombre").val()) || validIdInput($("#txt_apellido").val())) {
            $("#errorMascota").html(GenerarAlertaWarning("Nombre: Debe ingresar el nombre y el apellido"));
            $("#btn_guardar").button('reset');
            activaTab('dato');
            $("#txt_nombre").focus();
            return;
        } else if (validIdInput($("#txt_fecha_nac").val())) {
            $("#errorMascota").html(GenerarAlertaWarning("Fecha Nacimiento: ingresar una fecha de nacimiento válida"));
            $("#btn_guardar").button('reset');
            activaTab('dato');
            $("#txt_fecha_nac").focus();
            return;
        } else if ($('#imgMascota').get(0).files.length === 0) {
            $("#errorMascota").html(GenerarAlertaWarning("Imagen: seleccione una foto de su mascota"));
            $("#btn_guardar").button('reset');
            activaTab('foto');
            return;
        }

        foto_dsc = $("#imgMascota")[0].files[0].name;
        foto_dsc = getExtension(foto_dsc);
    }
    
    if (validIdInput($("#sel_tipo").val())) {
        $("#errorMascota").html(GenerarAlertaWarning("Tipo: seleccione un Tipo de mascota"));
        $("#btn_guardar").button('reset');
        activaTab('dato');
        $("#sel_tipo").focus();
        return;
    } else if (validIdInput($("#sel_raza").val())) {
        $("#errorMascota").html(GenerarAlertaWarning("Raza: seleccione una Raza"));
        $("#btn_guardar").button('reset');
        activaTab('dato');
        $("#sel_raza").focus();
        return;
    } else if (validIdInput($("#sel_calificacion").val())) {
        $("#errorMascota").html(GenerarAlertaWarning("Calificación: seleccione una Calificación"));
        $("#btn_guardar").button('reset');
        activaTab('dato');
        $("#sel_calificacion").focus();
        return;
    } else if (validIdInput($("#sel_departamento").val())) {
        $("#errorMascota").html(GenerarAlertaWarning("Departamento: seleccione un Departamento"));
        $("#btn_guardar").button('reset');
        activaTab('domicilio');
        $("#sel_departamento").focus();
        return;
    } else if (validIdInput($("#sel_provincia").val())) {
        $("#errorMascota").html(GenerarAlertaWarning("Provincia: seleccione una Provincia"));
        $("#btn_guardar").button('reset');
        activaTab('domicilio');
        $("#sel_provincia").focus();
        return;
    } else if (validIdInput($("#sel_distrito").val())) {
        $("#errorMascota").html(GenerarAlertaWarning("Distrito: seleccione un Distrito"));
        $("#btn_guardar").button('reset');
        activaTab('domicilio');
        $("#sel_distrito").focus();
        return;
    } else if (validIdInput($("#txt_direccion").val())) {
        $("#errorMascota").html(GenerarAlertaWarning("Dirección: seleccione una Dirección"));
        $("#btn_guardar").button('reset');
        activaTab('domicilio');
        $("#txt_direccion").focus();
        return;
    }

    var eMascota = {
        ID: id_mascota,
        //Nuevo*******
        USUARIO_ID: sessionStorage.getItem('ID'),
        NOMBRE: $("#txt_nombre").val(),
        APELLIDO: $("#txt_apellido").val(),
        SEXO: $("#sel_sexo").val(),
        FEC_NAC: getDateFromFormat($("#txt_fecha_nac").val(), 'dd/MM/yyyy'),
        //************
        TAMANO: $("#sel_tamano").val(),
        MASCOTA_RAZA_ID: $("#sel_raza").val(),
        CALIFICACION: $("#sel_calificacion").val(),
        COLOR: $("#txt_color").val(),
        BIOGRAFIA: $("#txt_biografia").val(),
        EXTENSION: foto_dsc,
        GALERIA_ID: foto_id,
        //Familia
        FAMILIARP: $("#txt_nom_padre").val(),
        DNIP: $("#txt_dni_padre").val(),
        TELEFONOP: $("#txt_tel_padre").val(),
        FAMILIARM: $("#txt_nom_madre").val(),
        DNIM: $("#txt_dni_madre").val(),
        TELEFONOM: $("#txt_tel_madre").val(),
        //Domicilio
        DISTRITO: $("#sel_distrito").val(),
        DIRECCION: $("#txt_direccion").val(),
        PISO: $("#txt_piso").val(),
        REFERENCIA: $("#txt_referencia").val(),
        //Salud
        CASTRADO: $("#sel_castrada").val(),
        VISITA: $("#sel_visita").val(),
        ALERGIA_MEDICAMENTO: $("#sel_alergia_med").val(),
        VACUNACION: $("#sel_calendario").val(),
        SEXTUPLE: $("#sel_vac_sextuple").val(),
        FEC_SEXTUPLE: $("#txt_fec_vac_sext").val() === "" ? null : getDateFromFormat($("#txt_fec_vac_sext").val(), 'dd/MM/yyyy'),
        TRIPLEFEL: $("#sel_vac_triple").val(),
        FEC_TRIPLEFEL: $("#txt_fec_vac_triple").val() === "" ? null : getDateFromFormat($("#txt_fec_vac_triple").val(), 'dd/MM/yyyy'),
        LEUCEMIA: $("#sel_vac_leucemia").val(),
        FEC_LEUCEMIA: $("#txt_fec_vac_leucemia").val() === "" ? null : getDateFromFormat($("#txt_fec_vac_leucemia").val(), 'dd/MM/yyyy'),
        ANTIRRABICA: $("#sel_vac_antirrabica").val(),
        FEC_ANTIRRABICA: $("#txt_fec_vac_antirrabica").val() === "" ? null : getDateFromFormat($("#txt_fec_vac_antirrabica").val(), 'dd/MM/yyyy'),
        LIMP_DENTAL: $("#sel_dental").val(),
        FEC_DESPARACITACION: $("#txt_fec_desparacitacion").val() === "" ? null : getDateFromFormat($("#txt_fec_desparacitacion").val(), 'dd/MM/yyyy'),
        ALERGIA: $("#sel_alergia").val(),
        ALERGIA_DSC: $("#txt_alergia").val(),
        ENFERMEDAD: $("#sel_enfermedad").val(),
        ENFERMEDAD_DSC: $("#txt_enfermedad").val()
    };
    
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/mascota.aspx/ActualizarMascotaWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: eMascota }),
        async: true,
        beforeSend: function () {
            $("#pnl_mascota").css("pointer-events", "none");
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorMascota").html(GenerarAlertaError(data.d.Mensaje));
                $("#pnl_mascota").css("pointer-events", "visible");
                $("#btn_guardar").button('reset');
                return;
            }

            if (id_mascota === 0) {//Solo para nuevos
                guardarImagen(evt, data.d.Resultado);
            }

            $("#pnl_mascota").modal('hide');
            $("#btn_guardar").button('reset');
            
            fc_listar_mascota();
        },
        error: function (data) {
            $("#errorMascota").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#pnl_mascota").css("pointer-events", "visible");
            $("#btn_guardar").button('reset');
        }
    });
    event.preventDefault();
    //Subir Foto MODIFICAR 
    if (id_mascota !== 0) {//Modificar
        if ($('#imgMascota').get(0).files.length !== 0) {//Si cambio la imagen
            foto_dsc = $("#imgMascota")[0].files[0].name;
            foto_dsc = getExtension(foto_dsc);
            eMascota = {
                ID: id_mascota,
                EXTENSION: foto_dsc,
                GALERIA_ID: foto_id
            };

            $.ajax({
                type: "POST",
                url: "page/mantenimiento/mascota.aspx/ActualizarFotoMascotaWM",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({ objE: eMascota }),
                async: true,
                success: function (data) {
                    if (!data.d.Activo) {
                        $("#errorMascota").html(GenerarAlertaError(data.d.Mensaje));
                        $("#btn_guardar").button('reset');
                        return;
                    }

                    guardarImagen(evt, id_mascota);
                },
                error: function (data) {
                    $("#errorMascota").html(GenerarAlertaError("Inconveniente en la operación"));
                    $("#btn_guardar").button('reset');
                }
            });
            event.preventDefault();
        }
    }
});
$("#btn_select_prop").click(function (evt) {
    $("#btn_select_prop").button('loading');
    $("#errorPropietario").html('');
    
    if (validIdInput($("#txt_correo").val())) {
        $("#errorPropietario").html(GenerarAlertaWarning("Correo: Ingrese un correo válido"));
        $("#btn_select_prop").button('reset');
        $("#txt_correo").focus();
        return;
    }

    var eUsuario = {
        EMAIL: $("#txt_correo").val()
    };

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/mascota.aspx/ObtenerPropitarioMascotaWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: eUsuario }),
        async: true,
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorPropietario").html(GenerarAlertaError(data.d.Mensaje));
                $("#btn_select_prop").button('reset');
                return;
            }

            $("#pnl_mascota_prop").modal('hide');
            $("#btn_select_prop").button('reset');
            sessionStorage.setItem("ID", data.d.Resultado.ID);
            limpiarMascota();
            activaTab('dato');
            $('#pnl_mascota .modal-title').html('Registrar Mascota');
        },
        error: function (data) {
            $("#errorPropietario").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#btn_select_prop").button('reset');
        }
    });
    event.preventDefault();
});
