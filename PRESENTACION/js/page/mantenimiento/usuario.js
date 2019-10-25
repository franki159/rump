var foto_dsc;
var id_usuario;
/*Inicializar Script*/
$(function () {
    $(document).unbind("keydown");

    $('.dtOp').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        orientation: "top left"
    });

    $("#pnl_usuario").modal({show: false, backdrop: 'static' });
    
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
                html += '<tr><td style="display:none">' + data.d.Resultado[i].ID + '</td>';
                html += '<td>' + htmlBotones + '</td>';
                html += '<td style="text-align:center">' +
                            '<div>' +
                                '<img class="img-row-usuario" src="img/usuario/' + data.d.Resultado[i].FOTO + '" onerror="this.src=\'img/noAvatar.png\';">' +
                            '</div>'+
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
                        ID: id_usuario
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
                            $("#txt_clave").val(data.d.Resultado.PASSWORD);
                            $("#txt_clave_rep").val(data.d.Resultado.PASSWORD);

                            foto_dsc = data.d.Resultado.FOTO;
                            $("#img_Foto").attr("src", "img/mascota/" + data.d.Resultado.FOTO);
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
                ID : id_usuario
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
function guardarImagen(evt, nameId) {
    if ($("#imgUsuario")[0].files[0] !== undefined) {
        var dataImagen = new FormData();
        dataImagen.append('file', $("#imgUsuario")[0].files[0]);
        dataImagen.append('name', nameId);
    }

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/hh_imagenUsuario.ashx",
        data: dataImagen,
        contentType: false,
        processData: false,
        success: function (result) {
            msg_OpenDay("c", "Usuario guardado correctamente");
        },
        error: function (err) {
            msg_OpenDay("e", "Error al guardar imagen");
        }
    });

    evt.preventDefault();
}
function limpiarUsuario() {
    $("#errorDiv").html('');
    $("#errorUsuario").html('');

    id_usuario = 0;
    foto_dsc = "";
    $("#pnl_usuario").css("pointer-events", "visible");
    $("#pnl_usuario select").val('0');
    $("#pnl_usuario input").val('');
    $("#pnl_usuario textarea").val('');
    $("#pnl_usuario select").attr("disabled", false);
    $("#pnl_usuario input").attr("disabled", false);
    
    $('#sel_perfil').val(null).change();
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
    if (id_usuario === 0) {//Nuevo
        if (validIdInput($("#txt_nombre").val()) || validIdInput($("#txt_apellido").val())) {
            $("#errorUsuario").html(GenerarAlertaWarning("Nombre: Debe ingresar el nombre y el apellido"));
            $("#btn_guardar").button('reset');
            activaTab('dato');
            $("#txt_nombre").focus();
            return;
        } else if (validIdInput($("#txt_fecha_nac").val())) {
            $("#errorUsuario").html(GenerarAlertaWarning("Fecha Nacimiento: ingresar una fecha de nacimiento válida"));
            $("#btn_guardar").button('reset');
            activaTab('dato');
            $("#txt_fecha_nac").focus();
            return;
        } else if (validIdInput($("#sel_sexo").val())) {
            $("#errorUsuario").html(GenerarAlertaWarning("Sexo: ingresar el sexo"));
            $("#btn_guardar").button('reset');
            activaTab('dato');
            $("#txt_fecha_nac").focus();
            return;
        } else if ($('#imgUsuario').get(0).files.length === 0) {
            $("#errorUsuario").html(GenerarAlertaWarning("Imagen: seleccione una foto de perfil"));
            $("#btn_guardar").button('reset');
            activaTab('foto');
            return;
        }

        foto_dsc = $("#imgUsuario")[0].files[0].name;
        foto_dsc = getExtension(foto_dsc);
    }
    
    if (validIdInput($("#sel_perfil").val())) {
        $("#errorUsuario").html(GenerarAlertaWarning("Perfil: seleccione un perfil"));
        $("#btn_guardar").button('reset');
        activaTab('dato');
        $("#sel_perfil").focus();
        return;
    }

    var eUsuario = {
        ID: id_usuario,

        EMAIL: $("#txt_email").val(),
        PASSWORD: $("#txt_clave").val(),

        NOMBRE: $("#txt_nombre").val(),
        APELLIDO: $("#txt_apellido").val(),
        SEXO: $("#sel_sexo").val(),
        FECHA_NAC: getDateFromFormat($("#txt_fecha_nac").val(), 'dd/MM/yyyy'),
        TELEFONO: $("#txt_telefono").val(),
        CELULAR: $("#txt_celular").val()
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
                $("#btn_guardar").button('reset');
                return;
            }

            if (id_usuario === 0) {//Solo para nuevos
                guardarImagen(evt, data.d.Resultado);
            }

            $("#pnl_usuario").modal('hide');
            $("#btn_guardar").button('reset');
            
            fc_listar_usuario();
        },
        error: function (data) {
            $("#errorUsuario").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#pnl_usuario").css("pointer-events", "visible");
            $("#btn_guardar").button('reset');
        }
    });
    event.preventDefault();
    //Subir Foto MODIFICAR 
    if (id_usuario !== 0) {//Modificar
        if ($('#imgUsuario').get(0).files.length !== 0) {//Si cambio la imagen
            foto_dsc = $("#imgUsuario")[0].files[0].name;
            foto_dsc = getExtension(foto_dsc);
            eUsuario = {
                ID: id_usuario,
                FOTO: foto_dsc
            };

            $.ajax({
                type: "POST",
                url: "page/mantenimiento/usuario.aspx/ActualizarFotoUsuarioWM",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({ objE: eUsuario }),
                async: true,
                success: function (data) {
                    if (!data.d.Activo) {
                        $("#errorUsuario").html(GenerarAlertaError(data.d.Mensaje));
                        $("#btn_guardar").button('reset');
                        return;
                    }

                    guardarImagen(evt, id_usuario);
                },
                error: function (data) {
                    $("#errorUsuario").html(GenerarAlertaError("Inconveniente en la operación"));
                    $("#btn_guardar").button('reset');
                }
            });
            event.preventDefault();
        } else {
            msg_OpenDay("c", "Usuario modificada correctamente");
        }
    }
});
