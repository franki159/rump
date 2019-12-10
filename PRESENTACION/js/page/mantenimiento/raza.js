var valRND = Math.floor(Math.random() * 100);
var txh_idRaza = "";
var txh_idConfirm = "";
/*Inicializar Script*/
$(function () {
    $(document).unbind("keydown");
    openLoading();    

    fc_listar_inicio();

    $("#txt_bus_raza").focus();
});
function aceptarConfirm() {
    switch (txh_idConfirm) {
        case "ANULAR":
            openLoading();
            $("#errorDiv").html('');

            var objE = {
                ID_ENCRIP: txh_idRaza
            };

            $.ajax({
                type: "POST",
                url: "page/mantenimiento/raza.aspx/AnularRazaWM",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({ objE: objE }),
                async: true,
                beforeSend: function () {
                    $("#tbl_raza button").attr("disabled", true);
                },
                success: function (data) {
                    $("#tbl_raza button").removeAttr("disabled");

                    if (!data.d.Activo) {
                        $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                        closeLoading();
                        return;
                    }

                    $("#errorDiv").html(GenerarAlertaSuccess(data.d.Mensaje));
                    fc_listar_raza();
                },
                error: function (data) {
                    $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                    $("#tbl_raza button").removeAttr("disabled");
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
    /************************ Listado de Tipo ****************************/
    var objE = {
        CODIGO: "TIPO"
    };
    /************************ Especie ****************************/
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
            $('#bus_sel_especie').append("<option value='0'>TODOS</option>");
            $('#sel_especie').append("<option></option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#bus_sel_especie').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
                $('#sel_especie').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }            

            closeLoading();
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            closeLoading();
        }
    });
}
function fc_listar_raza() {
    $("#errorDiv").html('');
    openLoading();

    var objE = {
        MASCOTA_TIPO_ID: $("#bus_sel_especie").val(),
        TIPO: $("#bus_txt_raza").val()
    };
        
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/raza.aspx/ListaRazaWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            objE: objE
        }),
        async: true,
        beforeSend: function () {
            $("#btn_buscar").attr("disabled", true);
            $('#tbl_raza tbody').empty();
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
                html += '<td>' + data.d.Resultado[i].ESPECIE + '</td>';
                html += '<td>' + data.d.Resultado[i].DESCRIPCION + '</td></tr>';
            }

            $("#tbl_raza tbody").append(html);
            $("#lblTotalReg").html("Total registros: " + data.d.Resultado.length);

            $("#tbl_raza button").click(function () {
                if ($(this).attr("name") === "editar") {
                    $('#pnl_raza .modal-title').html('Editar Raza');

                    txh_idRaza = $(this).parent().parent().find("td").eq(1).html();

                    objE = {
                        ID_ENCRIP: txh_idRaza
                    };

                    $.ajax({
                        type: "POST",
                        url: "page/mantenimiento/raza.aspx/ObtenerRazaWM",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify({ objE: objE }),
                        async: true,
                        beforeSend: function () {
                            $("#errorRaza").html('');
                            $("#tbl_raza button").attr("disabled", true);
                        },
                        success: function (data) {
                            $("#tbl_raza button").removeAttr("disabled");

                            if (data.d.error) {
                                $("#errorDiv").html(GenerarAlertaError(data.d.error));
                                return;
                            }

                            $("#sel_especie").val(data.d.Resultado[0].MASCOTA_TIPO_ID).change();
                            $("#txt_raza").val(data.d.Resultado[0].DESCRIPCION);

                            $("#pnl_raza").modal('show');
                        },
                        error: function (data) {
                            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                            $("#tbl_raza button").removeAttr("disabled");
                        }
                    });
                    event.preventDefault();
                } else if ($(this).attr("name") === "anular") {
                    txh_idConfirm = 'ANULAR';
                    txh_idRaza = $(this).parent().parent().find("td").eq(1).html();
                    window.parent.fc_mostrar_confirmacion("¿Esta seguro de <strong>ELIMINAR</strong> la Raza?");
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
function limpiarRaza() {
    $("#errorDiv").html('');
    $("#errorMascota").html('');

    txh_idRaza = "";
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
$("#btn_buscar").click(function () {
    fc_listar_raza();
});
$("#btn_nuevo").click(function () {
    limpiarRaza();
    $('#pnl_raza .modal-title').html('Registrar Raza');
    $("#pnl_raza").modal('show');

    $("#txt_raza").focus();
});
$("#btn_guardar").click(function (evt) {
    $("#errorRaza").html('');
    if (validIdInput($("#sel_especie").val())) {
        $("#errorRaza").html(GenerarAlertaWarning("Especie: seleccione una especie"));
        $("#sel_especie").focus();
        return;
    } else if (validIdInput($("#txt_raza").val())) {
        $("#errorRaza").html(GenerarAlertaWarning("Raza: Ingrese una Raza"));
        $("#txt_raza").focus();
        return;
    }

    openLoading();

    var eRaza = {
        ID_ENCRIP: txh_idRaza,
        MASCOTA_TIPO_ID: $("#sel_especie").val(),
        DESCRIPCION: $("#txt_raza").val()
    };

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/raza.aspx/ActualizarRazaWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: eRaza }),
        async: true,
        beforeSend: function () {
            $("#btn_guardar").attr("disabled", true);
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorRaza").html(GenerarAlertaError(data.d.Mensaje));
                $("#btn_guardar").attr("disabled", false);
                closeLoading();
                return;
            }

            $("#errorDiv").html(GenerarAlertaSuccess(data.d.Mensaje));
            $("#pnl_raza").modal('hide');
            $("#btn_guardar").attr("disabled", false);
            fc_listar_raza();
        },
        error: function (data) {
            $("#errorRaza").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#btn_guardar").attr("disabled", false);
            closeLoading();
        }
    });
    event.preventDefault();
});