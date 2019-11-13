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
    
    $("#txt_bus_email").focus();
});

/*Funciones*/
function fc_listar_solicitud() {
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

function limpiarSolicitud() {
    $("#errorDiv").html('');
    id_usuario = "";
    $("#pnl_busqueda").css("pointer-events", "visible");
    $("#pnl_busqueda select").val('0');
    $("#pnl_busqueda input").val('');
    $("#pnl_busqueda textarea").val('');
    $("#pnl_busqueda select").attr("disabled", false);
    $("#pnl_busqueda input").attr("disabled", false);
 
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
    fc_listar_solicitud();
});