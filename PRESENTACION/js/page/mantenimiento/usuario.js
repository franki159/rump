var foto_dsc;
var id_usuario;
var valRND = Math.floor(Math.random() * 100);
/*Inicializar Script*/
$(function () {
    $(document).unbind("keydown");

    $('.dtOp').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        orientation: "top left"
    });

    $("#pnl_usuario").modal({ show: false, backdrop: 'static' });

    $('.continue').click(function () {
        $('.nav-tabs .active').parent().next('li').find('a').trigger('click');
    });
    $('.back').click(function () {
        $('.nav-tabs .active').parent().prev('li').find('a').trigger('click');
    });

    fc_listar_inicio();

    $("#txt_bus_email").focus();
});
function activaTab(tab) {
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
}
function fc_listar_inicio() {
    /************************ Listado de Tipo ****************************/
    var objE = {
        CODIGO: "PERFIL"
    };

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/usuario.aspx/listarParametro",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE }),
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
            $('#sel_perfil').append("<option></option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_perfil').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }

            closeLoading();
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            closeLoading();
        }
    });
}
/*Funciones*/
function fc_listar_usuario() {
    openLoading();

    var eUsuario = {
        EMAIL: $("#txt_bus_email").val()
    };

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/usuario.aspx/ListaUsuarioWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            objE: eUsuario
        }),
        async: false,
        beforeSend: function () {
            $("#btn_buscar").attr("disabled", true);
            $('#tbl_usuario tbody').empty();
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
                html += '<tr><td style="display:none">' + data.d.Resultado[i].ID_ENCRIP + '</td>';
                html += '<td>' + htmlBotones + '</td>';
                html += '<td style="text-align:center">' +
                    '<div>' +
                    '<img class="img-row-usuario" src="img/usuario/' + encodeURIComponent(data.d.Resultado[i].FOTO) + '?v=' + valRND + '" onerror="this.src=\'img/noAvatar.png\';">' +
                    '</div>' +
                    '</td>';
                html += '<td style="text-align:center">' +
                    '<div>' +
                    '<img class="img-row-usuario" src="img/checkbox/' + (data.d.Resultado[i].ACTIVO == 1 ? 'check-on' : 'check-off') + '.png">' +
                    '</div>' +
                    '</td>';
                html += '<td>' + data.d.Resultado[i].USUARIO_PERFIL.PERFIL + '</td>';
                html += '<td>' + data.d.Resultado[i].EMAIL + '</td>';
                html += '<td>' + data.d.Resultado[i].NOMBRE + '</td>';
                html += '<td>' + data.d.Resultado[i].APELLIDO + '</td></tr>';
            }

            $("#tbl_usuario tbody").append(html);
            $("#lblTotalReg").html("Total Registros: " + data.d.Resultado.length);

            $("#tbl_usuario button").click(function () {
                limpiarUsuario();
                id_usuario = $(this).parent().parent().find("td").eq(0).html();

                if ($(this).attr("name") === "editar") {
                    $('#pnl_usuario .modal-title').html('Editar Usuario');
                    var objE = {
                        ID_ENCRIP: id_usuario
                    };

                    $.ajax({
                        type: "POST",
                        url: "page/mantenimiento/usuario.aspx/ObtenerUsuarioWM",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify({ objE: objE }),
                        async: true,
                        beforeSend: function () {
                            $("#tbl_usuario button").attr("disabled", true);
                        },
                        success: function (data) {
                            $("#tbl_usuario button").removeAttr("disabled");

                            if (!data.d.Activo) {
                                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                                return;
                            }

                            $("#txt_nombre").val(data.d.Resultado.NOMBRE);
                            $("#txt_apellido").val(data.d.Resultado.APELLIDO);
                            $("#sel_sexo").val(data.d.Resultado.SEXO).change();
                            $("#txt_telefono").val(data.d.Resultado.TELEFONO);
                            $("#txt_celular").val(data.d.Resultado.CELULAR);

                            if (data.d.Resultado.FECHA_NAC !== null) {
                                $("#txt_fecha_nac").val(formatDate(parseDateServer(data.d.Resultado.FECHA_NAC), "dd/MM/yyyy")).change();
                                $("#txt_fecha_nac").parent().datepicker("update", $("#txt_fecha_nac").val());
                            }

                            $("#sel_perfil").val(data.d.Resultado.PERFIL_ID).change();
                            $("#txt_email").val(data.d.Resultado.EMAIL);
                            //$("#txt_clave").val(data.d.Resultado.PASSWORD);
                            //$("#txt_clave_rep").val(data.d.Resultado.PASSWORD);

                            if (data.d.Resultado.FOTO != '' && data.d.Resultado.FOTO != null) {
                                $('.imagePreview').css("background-image", "url(../../img/usuario/" + data.d.Resultado.FOTO + "?v=" + valRND + ")");
                            }

                            activaTab('dato');
                            $("#pnl_usuario").modal('show');
                        },
                        error: function (data) {
                            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                            $("#tbl_usuario button").removeAttr("disabled");
                        }
                    });
                    event.preventDefault();
                } else if ($(this).attr("name") === "anular") {
                    $("#txh_idConfirm").val('ANULAR');
                    window.parent.fc_mostrar_confirmacion("¿Esta seguro de <strong>Eliminar</strong> el usuario?");
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
    switch ($("#txh_idConfirm").val()) {
        case "ANULAR":
            var objE = {
                ID_ENCRIP: id_usuario
            };

            $.ajax({
                type: "POST",
                url: "page/mantenimiento/usuario.aspx/AnularUsuarioWM",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({ objE: objE }),
                async: true,
                beforeSend: function () {
                    $("#errorDiv").html('');
                    $("#tbl_usuario button").attr("disabled", true);
                    openLoading();
                },
                success: function (data) {
                    $("#tbl_usuario button").removeAttr("disabled");
                    if (!data.d.Activo) {
                        $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                        closeLoading();
                        return;
                    }

                    $("#errorDiv").html(GenerarAlertaSuccess(data.d.Mensaje));
                    closeLoading();
                    fc_listar_usuario();
                },
                error: function (data) {
                    $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                    $("#tbl_usuario button").removeAttr("disabled");
                    closeLoading();
                }
            });
            event.preventDefault();
            break;
        default:
            break;
    }
}
function guardarImagen(evt, nameId, file) {
    var objResp = 0;
    var dataImagen = new FormData();
    dataImagen.append('file', file);
    dataImagen.append('name', nameId);

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/hh_imagenUsuario.ashx",
        data: dataImagen,
        async: false,
        contentType: false,
        processData: false,
        success: function (result) {
            //msg_OpenDay("c", "Mascota guardada correctamente");
            objResp = 0;
        },
        error: function (err) {
            //msg_OpenDay("e", "Error al guardar imagen");
            objResp = 1;
        }
    });

    return objResp;
}
function limpiarUsuario() {
    $("#errorDiv").html('');
    $("#errorUsuario").html('');

    id_usuario = "";
    foto_dsc = "";
    $("#pnl_usuario").css("pointer-events", "visible");
    $("#pnl_usuario select").val('0');
    $("#pnl_usuario input").val('');
    $("#pnl_usuario textarea").val('');
    $("#pnl_usuario select").attr("disabled", false);
    $("#pnl_usuario input").attr("disabled", false);

    $('#sel_perfil').val(null).change();

    $(".container-file").find($(".imgSecond")).each(function () {
        $(this).remove();
    });

    $(".container-file").find($(".imagePreview")).css("background-image", "url(../../img/noPets.png)");
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
    $("#btn_buscar").button('loading');
    $("#errorDiv").html('');
    if (validIdInput($("#txt_bus_email").val())) {
        $("#errorDiv").html(GenerarAlertaWarning("E-mail: ingrese una cuenta válida"));
        $("#btn_buscar").button('reset');
        $("#txt_bus_email").focus();
        return;
    }
    fc_listar_usuario();
});
$("#btn_nuevo").click(function () {
    limpiarUsuario();
    activaTab('dato');
    $('#pnl_usuario .modal-title').html('Registrar Usuario');
    $("#pnl_usuario").modal('show');

    $("#txt_nombre").focus();
});
$("#btn_guardar").click(function (evt) {
    $("#btn_guardar").button('loading');

    $("#errorUsuario").html('');

    if (validIdInput($("#txt_nombre").val()) || validIdInput($("#txt_apellido").val())) {
        $("#errorUsuario").html(GenerarAlertaWarning("Nombre: Debe ingresar el nombre y el apellido"));
        closeLoading();
        activaTab('dato');
        $("#txt_nombre").focus();
        return;
    } else if (validIdInput($("#sel_sexo").val())) {
        $("#errorUsuario").html(GenerarAlertaWarning("Sexo: ingresar el sexo"));
        closeLoading();
        activaTab('dato');
        $("#txt_fecha_nac").focus();
        return;
    } else if (validIdInput($("#txt_fecha_nac").val())) {
        $("#errorUsuario").html(GenerarAlertaWarning("Fecha Nacimiento: ingresar una fecha de nacimiento válida"));
        closeLoading();
        activaTab('dato');
        $("#txt_fecha_nac").focus();
        return;
    } else if (validIdInput($("#sel_perfil").val())) {
        $("#errorUsuario").html(GenerarAlertaWarning("Perfil: seleccione un perfil"));
        closeLoading();
        activaTab('dato');
        $("#sel_perfil").focus();
        return;
    } else if (validIdInput($("#txt_email").val())) {
        $("#errorUsuario").html(GenerarAlertaWarning("E-mail: ingrese correo valido"));
        closeLoading();
        activaTab('dato');
        $("#txt_email").focus();
        return;
    }

    if (id_usuario != '' && $("#txt_clave").val() == '' && $("#txt_clave_rep").val() == '') {
    } else {
        if (validIdInput($("#txt_clave").val()) || validPasswordInput($("#txt_clave").val())) {
            $("#errorUsuario").html(GenerarAlertaWarning("Contraseña: ingrese contraseña valida"));
            closeLoading();
            activaTab('dato');
            $("#txt_clave").focus();
            return;
        } else if (validIdInput($("#txt_clave_rep").val()) || validPasswordInput($("#txt_clave_rep").val())) {
            $("#errorUsuario").html(GenerarAlertaWarning("Confirmar Contraseña: ingrese contraseña valida"));
            closeLoading();
            activaTab('dato');
            $("#txt_clave_rep").focus();
            return;
        } else if ($("#txt_clave").val() != $("#txt_clave_rep").val()) {
            $("#errorUsuario").html(GenerarAlertaWarning("Contraseña: ambas constraseñas no son iguales"));
            closeLoading();
            activaTab('dato');
            $("#txt_clave_rep").focus();
            return;
        }
    }

    var eUsuario = {
        ID_ENCRIP: id_usuario,

        EMAIL: $("#txt_email").val(),
        PASSWORD: $("#txt_clave").val(),
        NOMBRE: $("#txt_nombre").val(),
        APELLIDO: $("#txt_apellido").val(),
        FECHA_NAC: getDateFromFormat($("#txt_fecha_nac").val(), 'dd/MM/yyyy'),
        TELEFONO: $("#txt_telefono").val(),
        CELULAR: $("#txt_celular").val(),
        SEXO: $("#sel_sexo").val(),
        PERFIL_ID: $("#sel_perfil").val()
    };

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/usuario.aspx/ActualizarUsuarioWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: eUsuario }),
        async: true,
        beforeSend: function () {
            $("#pnl_usuario").css("pointer-events", "none");
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorUsuario").html(GenerarAlertaError(data.d.Mensaje));
                $("#pnl_usuario").css("pointer-events", "visible");
                closeLoading();
                return;
            }

            valRND = Math.floor(Math.random() * 1000);

            $(".container-file").find($("input")).each(function () {
                if ($(this).get(0).files.length !== 0) {
                    var imgTemp = $(this)[0].files[0];

                    eUsuario = {
                        ID_ENCRIP: data.d.Resultado,
                        EXTENSION: getExtension(imgTemp.name)
                    };

                    $.ajax({
                        type: "POST",
                        url: "page/mantenimiento/usuario.aspx/InsertarFotoUsuarioWM",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify({ objE: eUsuario }),
                        async: false,
                        success: function (dataImg) {
                            if (!dataImg.d.Activo) {
                                $("#errorUsuario").html(GenerarAlertaError(dataImg.d.Mensaje));
                                closeLoading();
                                return;
                            }

                            guardarImagen(evt, dataImg.d.Resultado, imgTemp);
                        },
                        error: function (data) {
                            $("#errorUsuario").html(GenerarAlertaError("Inconveniente en la operación"));
                            closeLoading();
                        }
                    });

                    event.preventDefault();
                }
            });

            $("#txt_bus_email").val($("#txt_email").val());
            fc_listar_usuario();
            $("#pnl_usuario").modal('hide');
            closeLoading();
        },
        error: function (data) {
            $("#errorUsuario").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#pnl_usuario").css("pointer-events", "visible");
            $("#btn_guardar").button('reset');
        }
    });
    event.preventDefault();
});
