var raza_id, prov_id, dis_id, foto_dsc;
var id_mascota, foto_id;
var _user_email;
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

    fc_listar_inicio();
    
    $("#txt_dni_msc").focus();
});
function fc_listar_inicio() {
    /************************ Listado de Especie ****************************/  
    var objE = {
        CODIGO: "TIPO"
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
            $('#sel_tipo').append("<option value='0'>TODOS</option");
            for (var i = 0; i < data.d.Resultado.length; i++) {
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

            $('#sel_departamento').append("<option value='0'>TODOS</option");
            for (var i = 0; i < data.d.Resultado.length; i++) {
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
function fc_listar_mascota() {    
    openLoading();

    var eMascota = {
        DNI: $("#txt_dni_msc").val(),
        NOMBRE: $("#txt_nom_msc").val(),
        MASCOTA_TIPO_ID: $("#sel_tipo").val() === null || $("#sel_tipo").val() === "" ? 0 : $("#sel_tipo").val(),
        SEXO: $("#sel_sexo").val(),
        MASCOTA_RAZA_ID: $("#sel_raza").val() === null || $("#sel_raza").val() === "" ? 0 : $("#sel_raza").val(),
        DEPARTAMENTO: $("#sel_departamento").val(),
        PROVINCIA: $("#sel_provincia").val() === null ? "" : $("#sel_provincia").val(),
        GEOGRAFIA_ID: $("#sel_distrito").val() === null || $("#sel_distrito").val() === "" ? 0 : $("#sel_distrito").val(),
        MES: $("#sel_mes").val(),
        FEC_INI: $("#txt_ini_reg").val() === "" ? null : getDateFromFormat($("#txt_ini_reg").val(), 'yyyy-MM-dd'),
        FEC_FIN: $("#txt_fin_reg").val() === "" ? null : getDateFromFormat($("#txt_fin_reg").val(), 'yyyy-MM-dd')
    };
    
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/mascota.aspx/filtroMascotaWM",
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
                $("#lblTotalReg").html("Total Registros: 0");
                closeLoading();
                return;
            }
            
            var html = '';
            
            for (var i = 0; i < data.d.Resultado.length; i++) {
                html += '<tr><td>' + data.d.Resultado[i].DNI + '</td>';
                html += '<td>' + data.d.Resultado[i].NOMBRE + '</td>';
                html += '<td>' + data.d.Resultado[i].NOMBRE_PRE + '</td>';
                html += '<td>' + data.d.Resultado[i].TELEFONO + '</td>';
                if (data.d.Resultado[i].FEC_NAC !== null)
                    html += '<td>' + formatDate(parseDateServer(data.d.Resultado[i].FEC_NAC), "dd-MM-yyyy") + '</td>';
                else
                    html += '<td></td>';
                if (data.d.Resultado[i].FEC_INI !== null) 
                    html += '<td>' + formatDate(parseDateServer(data.d.Resultado[i].FEC_INI), "dd-MM-yyyy") + '</td></tr>';
                else
                    html += '<td></td></tr>';
            }

            $("#tbl_mascota tbody").append(html);
            $("#lblTotalReg").html("Total Registros: " + data.d.Resultado.length);
            
            closeLoading();
        },
        error: function (data) {
            $("#lblTotalReg").html("Total Registros: 0");
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#btn_buscar").removeAttr("disabled");
            closeLoading();
        }
    });
}
function limpiarMascota() {
    $("#errorDiv").html('');
    $("#errorMascota").html('');

    $("#divQuintuple").hide();
    $("#divSextuple").hide();
    $("#divTriple").hide();
    $("#divLeucemia").hide();
    $("#divAntirrabica").hide();
    $("#divAlergia").hide();
    $("#divEnfermedad").hide();

    _user_email = 0;
    id_mascota = "";
    foto_id = 0;
    foto_dsc = "";
    raza_id = 0;
    prov_id = 0;
    dis_id = 0;
    txh_idConfirm = '';
    $("#pnl_mascota").css("pointer-events", "visible");
    $("#pnl_mascota select").val('0');
    $("#pnl_mascota input").val('');
    $("#pnl_mascota textarea").val('');
    $("#pnl_mascota select").attr("disabled", false);
    $("#pnl_mascota input").attr("disabled", false);
    
    //$('#sel_tipo').val(null).trigger('change');
    $('#sel_tipo').val(null).change();
    $("#sel_raza").empty();
    $('#sel_departamento').val(null).change();
    $("#sel_provincia").empty();
    $("#sel_distrito").empty();
    $("#chkMicrochip").prop('checked', false);
    $("#txt_cod_microchip").css('display', 'none');

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
        data: JSON.stringify({ objE: objE }),
        async: true,
        beforeSend: function () {
            openLoading();
            $('#errorMascota').html("");
            $('#sel_raza').empty();
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorMascota").html(GenerarAlertaError(data.d.Mensaje));
                closeLoading();
                return;
            }

            $('#sel_raza').append("<option></option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_raza').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }

            if (raza_id !== 0) {
                $("#sel_raza").val(raza_id);
            }
            closeLoading();
        },
        error: function (data) {
            $("#errorMascota").html(GenerarAlertaError("Inconveniente en la operación"));
            closeLoading();
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
    $("#errorDiv").html('');
    fc_listar_mascota();
});