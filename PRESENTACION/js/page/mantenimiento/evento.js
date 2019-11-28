var id_evento;
/*Inicializar Script*/
$(function () {
    $(document).unbind("keydown");

    $('.dtOp').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        orientation: "top left"
    });

    $("#pnl_evento").modal({ show: false, backdrop: 'static' });

    fc_listar_tipo();
});
function fc_listar_tipo() {
    /************************ Listado de Tipo Evento ****************************/
    var objE = {
        CODIGO: "EVENTOTIPO"
    };

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/evento.aspx/listarParametro",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE }),
        async: false,
        beforeSend: function () {
            $('#sel_bus_tipo').empty();
            $('#sel_tipo').empty();
            openLoading();
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                closeLoading();
                return;
            }
            
            $('#sel_bus_tipo').append("<option value='0'>TODOS</option>");
            $('#sel_tipo').append("<option value='0'>SELECCIONE</option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_bus_tipo').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
                $('#sel_tipo').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }

            closeLoading();
            fc_listar_periodo();
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            closeLoading();
        }
    });
}
function fc_listar_periodo() {
    /************************ Listado de Tipo Evento ****************************/
    var objE = {
        CODIGO: "EVENTOPERIODO"
    };

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/evento.aspx/listarParametro",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE }),
        async: false,
        beforeSend: function () {
            $('#sel_periodo').empty();
            openLoading();
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                closeLoading();
                return;
            }
            
            $('#sel_periodo').append("<option value='0'>SELECCIONE</option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_periodo').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }

            closeLoading();
            fc_listar_mascota();
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            closeLoading();
        }
    });
}
function fc_listar_mascota() {
    /************************ Listado de Mascotas ****************************/
    var objE = {
        DNI: "",
        USUARIO_ID: sessionStorage.getItem('ID')
    };

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/evento.aspx/listarMascota",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE }),
        async: false,
        beforeSend: function () {
            $('#sel_bus_mascota').empty();
            $('#sel_mascota').empty();
            openLoading();
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                closeLoading();
                return;
            }
            ;
            $('#sel_bus_mascota').append("<option value='0'>TODOS</option>");
            $('#sel_mascota').append("<option value='0'>SELECCIONE</option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_bus_mascota').append("<option value='" + data.d.Resultado[i].ID_ENCRIP + "'>" + data.d.Resultado[i].NOMBRE + "</option>");
                $('#sel_mascota').append("<option value='" + data.d.Resultado[i].ID_ENCRIP + "'>" + data.d.Resultado[i].NOMBRE + "</option>");
            }

            closeLoading();
            fc_listar_evento();
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            closeLoading();
        }
    });
}
/*Funciones*/
function fc_listar_evento() {
    openLoading();

    var EEvento = {
        EVENTO_TIPO_ID: $("#sel_bus_tipo").val(),
        MASCOTA_ID_ENCRIP: ($("#sel_bus_mascota").val() == "0" ? "" : $("#sel_bus_mascota").val()),
        USUARIO_ID: sessionStorage.getItem('ID')
    };

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/evento.aspx/ListaEventoWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            objE: EEvento
        }),
        async: false,
        beforeSend: function () {
            $("#btn_buscar").attr("disabled", true);
            $('#calendar').empty();
        },
        success: function (data) {
            $("#btn_buscar").removeAttr("disabled");

            if (!data.d.Activo) {
                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                closeLoading();
                return;
            }

            var eventoList = [];
            for (var i = 0; i < data.d.Resultado.length; i++) {
                eventoList.push({
                    title: '[' + data.d.Resultado[i].MASCOTA + '] ' + data.d.Resultado[i].TITULO,
                    start: parseDateServer(data.d.Resultado[i].FECHA_INICIO),
                    end: parseDateServer(data.d.Resultado[i].FECHA_FIN),
                    textColor: '#fff',
                    extendedProps: { cod: data.d.Resultado[i].ID_ENCRIP }
                });
            }

            var calendarEl = document.getElementById('calendar');

            var calendar = new FullCalendar.Calendar(calendarEl, {
                plugins: ['interaction', 'dayGrid', 'timeGrid', 'list'],
                locale: 'es',
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
                },
                defaultDate: '2019-08-12',
                navLinks: true, // can click day/week names to navigate views
                businessHours: true, // display business hours
                defaultDate: new Date(),
                editable: false,
                events: eventoList,
                eventClick: function (info) {
                    limpiarEvento();
                    id_evento = info.event.extendedProps.cod;
                    fc_mostrar_evento();
                }
            });

            calendar.render();

            /*
            var htmlBotones = '<button name="editar" class="btn btn-primary btn-sm"><i class="fas fa-pencil-alt"></i></button> ' +
                '<button name="anular" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button> ';

            var html = '';
            for (var i = 0; i < data.d.Resultado.length; i++) {
                html += '<tr><td style="display:none">' + data.d.Resultado[i].ID_ENCRIP + '</td>';
                html += '<td>' + htmlBotones + '</td>';
                html += '<td>' + data.d.Resultado[i].TIPO + '</td>';
                html += '<td>' + data.d.Resultado[i].MASCOTA + '</td>';
                html += '<td>' + data.d.Resultado[i].TITULO + '</td>';
                html += '<td>' + formatDate(parseDateServer(data.d.Resultado[i].FECHA_INICIO), "dd/MM/yyyy HH:mm") + '</td>';
                html += '<td>' + formatDate(parseDateServer(data.d.Resultado[i].FECHA_FIN), "dd/MM/yyyy HH:mm") + '</td></tr>';
            }

            $("#tbl_evento tbody").append(html);
            $("#lblTotalReg").html("Total Registros: " + data.d.Resultado.length);

            $("#tbl_evento button").click(function () {
                limpiarEvento();
                id_evento = $(this).parent().parent().find("td").eq(0).html();

                if ($(this).attr("name") === "editar") {
                    $('#pnl_evento .modal-title').html('Editar Evento');
                    var objE = {
                        ID_ENCRIP: id_evento
                    };

                    $.ajax({
                        type: "POST",
                        url: "page/mantenimiento/evento.aspx/ObtenerEventoWM",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify({ objE: objE }),
                        async: true,
                        beforeSend: function () {
                            $("#tbl_evento button").attr("disabled", true);
                        },
                        success: function (data) {
                            $("#tbl_evento button").removeAttr("disabled");

                            if (!data.d.Activo) {
                                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                                return;
                            }

                            $("#sel_tipo").val(data.d.Resultado.EVENTO_TIPO_ID);
                            $("#sel_mascota").val(data.d.Resultado.MASCOTA_ID_ENCRIP);
                            $("#txt_titulo").val(data.d.Resultado.TITULO);
                            $("#txt_detalle").val(data.d.Resultado.DETALLE);

                            if (data.d.Resultado.FECHA_INICIO !== null) {
                                $("#txt_fecha_inicio").val(formatDate(parseDateServer(data.d.Resultado.FECHA_INICIO), "dd/MM/yyyy")).change();
                                $("#txt_hora_inicio").val(formatDate(parseDateServer(data.d.Resultado.FECHA_INICIO), "HH:mm"));
                                $("#txt_fecha_inicio").datepicker("update", $("#txt_fecha_inicio").val());
                            }

                            if (data.d.Resultado.FECHA_FIN !== null) {
                                $("#txt_fecha_fin").val(formatDate(parseDateServer(data.d.Resultado.FECHA_FIN), "dd/MM/yyyy")).change();
                                $("#txt_hora_fin").val(formatDate(parseDateServer(data.d.Resultado.FECHA_FIN), "HH:mm"));
                                $("#txt_fecha_fin").datepicker("update", $("#txt_fecha_fin").val());
                            }
                            
                            $("#pnl_evento").modal('show');
                        },
                        error: function (data) {
                            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                            $("#tbl_evento button").removeAttr("disabled");
                        }
                    });
                    event.preventDefault();
                } else if ($(this).attr("name") === "anular") {
                    $("#txh_idConfirm").val('ANULAR');
                    window.parent.fc_mostrar_confirmacion("¿Esta seguro de <strong>Eliminar</strong> el evento?");
                }
            });
            */
            closeLoading();
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#btn_buscar").removeAttr("disabled");
            closeLoading();
        }
    });
}
function fc_mostrar_evento() {
    $('#pnl_evento .modal-title').html('Editar Evento');
    var objE = {
        ID_ENCRIP: id_evento
    };

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/evento.aspx/ObtenerEventoWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE }),
        async: true,
        beforeSend: function () {
            openLoading();
            //$("#tbl_evento button").attr("disabled", true);
        },
        success: function (data) {
            closeLoading();
            //$("#tbl_evento button").removeAttr("disabled");

            if (!data.d.Activo) {
                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                return;
            }

            $("#sel_tipo").val(data.d.Resultado.EVENTO_TIPO_ID);
            $("#sel_mascota").val(data.d.Resultado.MASCOTA_ID_ENCRIP);
            $("#sel_periodo").val(data.d.Resultado.EVENTO_PERIODO_ID);
            $("#txt_titulo").val(data.d.Resultado.TITULO);
            $("#txt_detalle").val(data.d.Resultado.DETALLE);

            if (data.d.Resultado.FECHA_INICIO !== null) {
                $("#txt_fecha_inicio").val(formatDate(parseDateServer(data.d.Resultado.FECHA_INICIO), "dd/MM/yyyy")).change();
                $("#txt_hora_inicio").val(formatDate(parseDateServer(data.d.Resultado.FECHA_INICIO), "HH:mm"));
                $("#txt_fecha_inicio").datepicker("update", $("#txt_fecha_inicio").val());
            }

            if (data.d.Resultado.FECHA_FIN !== null) {
                $("#txt_fecha_fin").val(formatDate(parseDateServer(data.d.Resultado.FECHA_FIN), "dd/MM/yyyy")).change();
                $("#txt_hora_fin").val(formatDate(parseDateServer(data.d.Resultado.FECHA_FIN), "HH:mm"));
                $("#txt_fecha_fin").datepicker("update", $("#txt_fecha_fin").val());
            }

            $("#btn_anular").show();
            $("#pnl_evento").modal('show');
        },
        error: function (data) {
            closeLoading();
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            //$("#tbl_evento button").removeAttr("disabled");
        }
    });
}
function aceptarConfirm() {
    switch ($("#txh_idConfirm").val()) {
        case "ANULAR":
            var objE = {
                ID_ENCRIP: id_evento
            };

            $.ajax({
                type: "POST",
                url: "page/mantenimiento/evento.aspx/AnularEventoWM",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({ objE: objE }),
                async: true,
                beforeSend: function () {
                    $("#pnl_evento").css("pointer-events", "none");
                },
                success: function (data) {
                    //$("#tbl_evento button").removeAttr("disabled");
                    if (!data.d.Activo) {
                        $("#errorEvento").html(GenerarAlertaError(data.d.Mensaje));
                        return;
                    }

                    $("#errorDiv").html(GenerarAlertaSuccess(data.d.Mensaje));
                    $("#pnl_evento").modal('hide');
                    fc_listar_evento();
                },
                error: function (data) {
                    $("#errorEvento").html(GenerarAlertaError("Inconveniente en la operación"));
                    //$("#tbl_evento button").removeAttr("disabled");
                    $("#pnl_evento").css("pointer-events", "visible");
                    $("#btn_anular").button('reset');
                }
            });
            event.preventDefault();
            break;
        default:
            break;
    }
}
function limpiarEvento() {
    $("#errorDiv").html('');
    $("#errorEvento").html('');

    id_evento = "";
    $("#pnl_evento").css("pointer-events", "visible");
    $("#pnl_evento select").val('0');
    $("#pnl_evento input").val('');
    $("#pnl_evento textarea").val('');
    $("#pnl_evento select").attr("disabled", false);
    $("#pnl_evento input").attr("disabled", false);
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
                if ($("#pnl_evento").css('display') === 'block') {
                    $("#btn_guardar").click();
                }
            }
            break;
    }
});

$("#sel_bus_tipo").change(function () {
    $("#btn_buscar").button('loading');
    $("#errorDiv").html('');

    fc_listar_evento();
});
$("#sel_bus_mascota").change(function () {
    $("#btn_buscar").button('loading');
    $("#errorDiv").html('');

    fc_listar_evento();
});
$("#btn_buscar").click(function () {
    $("#btn_buscar").button('loading');
    $("#errorDiv").html('');

    fc_listar_evento();
});
$("#btn_nuevo").click(function () {
    limpiarEvento();
    $('#pnl_evento .modal-title').html('Registrar Evento');
    $("#pnl_evento").modal('show');

    $("#btn_anular").hide();
    $("#sel_tipo").focus();
});
$("#btn_guardar").click(function (evt) {
    $("#btn_guardar").button('loading');

    $("#errorEvento").html('');

    if (validIdInput($("#sel_tipo").val())) {
        $("#errorEvento").html(GenerarAlertaWarning("Tipo: seleccionar el tipo de evento"));
        closeLoading();
        $("#sel_tipo").focus();
        return;
    } else if (validIdInput($("#sel_mascota").val())) {
        $("#errorEvento").html(GenerarAlertaWarning("Mascota: seleccionar una mascota"));
        closeLoading();
        $("#sel_mascota").focus();
        return;
    } else if (validIdInput($("#txt_titulo").val())) {
        $("#errorEvento").html(GenerarAlertaWarning("Titulo: Debe ingresar el titulo"));
        closeLoading();
        $("#txt_titulo").focus();
        return;
    } else if (!isDate($("#txt_fecha_inicio").val() + ' ' + $("#txt_hora_inicio").val(), 'dd/MM/yyyy HH:mm')) {
        $("#errorEvento").html(GenerarAlertaWarning("Fecha Inicio: ingresar una fecha de inicio válida"));
        closeLoading();
        $("#txt_fecha_inicio").focus();
        return;
    } else if (!isDate($("#txt_fecha_fin").val() + ' ' + $("#txt_hora_fin").val(), 'dd/MM/yyyy HH:mm')) {
        $("#errorEvento").html(GenerarAlertaWarning("Fecha Inicio: ingresar una fecha fin válida"));
        closeLoading();
        $("#txt_fecha_fin").focus();
        return;
    } else if (validIdInput($("#sel_periodo").val())) {
        $("#errorEvento").html(GenerarAlertaWarning("Periodo: seleccionar un periodo"));
        closeLoading();
        $("#sel_periodo").focus();
        return;
    } 

    var EEvento = {
        ID_ENCRIP: id_evento,

        EVENTO_TIPO_ID: $("#sel_tipo").val(),
        MASCOTA_ID_ENCRIP: $("#sel_mascota").val(),
        EVENTO_PERIODO_ID: $("#sel_periodo").val(),
        TITULO: $("#txt_titulo").val(),
        DETALLE: $("#txt_detalle").val(),
        FECHA_INICIO: getDateFromFormat($("#txt_fecha_inicio").val() + ' ' + $("#txt_hora_inicio").val(), 'dd/MM/yyyy HH:mm'),
        FECHA_FIN: getDateFromFormat($("#txt_fecha_fin").val() + ' ' + $("#txt_hora_fin").val(), 'dd/MM/yyyy HH:mm')
    };

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/evento.aspx/ActualizarEventoWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: EEvento }),
        async: true,
        beforeSend: function () {
            $("#pnl_evento").css("pointer-events", "none");
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorEvento").html(GenerarAlertaError(data.d.Mensaje));
                $("#pnl_evento").css("pointer-events", "visible");
                closeLoading();
                return;
            }

            $("#errorDiv").html(GenerarAlertaSuccess(data.d.Mensaje));
            $("#pnl_evento").modal('hide');
            fc_listar_evento();
        },
        error: function (data) {
            $("#errorEvento").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#pnl_evento").css("pointer-events", "visible");
            $("#btn_guardar").button('reset');
        }
    });
    event.preventDefault();
});
$("#btn_anular").click(function (evt) {
    $("#btn_anular").button('loading');

    $("#txh_idConfirm").val('ANULAR');
    window.parent.fc_mostrar_confirmacion("¿Esta seguro de <strong>Eliminar</strong> el evento?");
});
