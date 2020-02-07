var txh_idConfirm;
var id_solicitud;
var valRND = Math.floor(Math.random() * 100);
/*Inicializar Script*/
$(function () {
    $(document).unbind("keydown");

    $('.dtOp').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        orientation: "top left"
    });

    $("#sel_estado").val(0);
    closeLoading();
    $("#txt_bus_email").focus();
});

/*Funciones*/
function fc_listar_solicitud() {
    openLoading();

    var eSolicitud = {
        DNI: $("#txt_bus_dni").val(),
        EMAIL: $("#txt_bus_email").val(),
        ESTADO: $("#sel_estado").val()
    };

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/solicitud.aspx/ListaSolicitudWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            objE: eSolicitud
        }),
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

            var htmlBotones = '<button name="atender" title="Atender solicitud" class="btn btn-primary btn-sm"><i class="far fa-thumbs-up"></i></button> ' +
                '<button name="anular" title="Anular solicitud"  class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button> ';

            var html = '';
            for (var i = 0; i < data.d.Resultado.length; i++) {
                html += '<tr><td style="display:none">' + data.d.Resultado[i].ID_ENCRIP + '</td>';
                if (data.d.Resultado[i].ESTADO === 1) {
                    html += '<td>' + htmlBotones + '</td>';
                } else {
                    html += '<td>' + data.d.Resultado[i].vPARAM2+'</td>';
                }
                html += '<td>Solicitud ' + data.d.Resultado[i].TIPO + '</td>';
                html += '<td>' + data.d.Resultado[i].vPARAM1 + '</td>';
                html += '<td>' + data.d.Resultado[i].DNI + '</td>';
                html += '<td>' + data.d.Resultado[i].MASCOTA + '</td>';
                html += '<td>' + data.d.Resultado[i].PROPIETARIO + '</td>';
                html += '<td>' + data.d.Resultado[i].EMAIL + '</td>';
                html += '<td>' + data.d.Resultado[i].TELEFONO + '</td></tr>';
            }

            $("#tbl_solicitud tbody").append(html);
            $("#lblTotalReg").html("Total Registros: " + data.d.Resultado.length);

            $("#tbl_solicitud button").click(function () {
                if ($(this).attr("name") === "atender") {
                    limpiarSolicitud();
                    id_solicitud = $(this).parent().parent().find("td").eq(0).html();
                    id_solicitud = validaTableMobile(id_solicitud);
                    txh_idConfirm = 'ATENDER';
                    window.parent.fc_mostrar_confirmacion("¿Esta seguro de <strong>Atender</strong> la solicitud?");
                } else if ($(this).attr("name") === "anular") {
                    limpiarSolicitud();
                    id_solicitud = $(this).parent().parent().find("td").eq(0).html();
                    id_solicitud = validaTableMobile(id_solicitud);
                    txh_idConfirm = 'ANULAR';
                    window.parent.fc_mostrar_confirmacion("¿Esta seguro de <strong>Eliminar</strong> la solicitud?");
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
                ID_ENCRIP: id_solicitud
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
                    fc_listar_solicitud();
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
                ID_ENCRIP: id_solicitud
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
                    fc_listar_solicitud();
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
        default:
            break;
    }
}

function limpiarSolicitud() {
    $("#errorDiv").html('');
    txh_idConfirm = "";
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
    $("#btn_buscar").attr("disabled", true);
    fc_listar_solicitud();
});