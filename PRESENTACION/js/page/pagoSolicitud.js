var valRND = Math.floor(Math.random() * 100);
var g_id_mascota = 0;
var g_id_sol = 0;
/*Inicializar Script*/
//Variacion de la zona horaria
$(document).ready(function () {
    fc_listar_inicio();
    closeLoading();
    $(document).prop("title", "::Pago");
    $(document).unbind("keydown"); 
});

function fc_listar_inicio() {
    //get session solicitud
   $.ajax({
        type: "POST",
        url: "page/mantenimiento/solicitud.aspx/getCarritoItemWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        beforeSend: function () {
            openLoading();
        },
        success: function (data) {
            if (!data.d.Activo) {
                if (data.d.Mensaje === "SR") {
                    alert("No selecciono ninguna solicitud");
                    window.location = "Sistema";
                    return;
                } else {
                    closeLoading();
                    return;
                }
            }
            
            $(".dsc-prod-pag").html("Solicitud de " + data.d.Resultado[0].DESCRIPCION);
            $(".dsc-pre-pag").html("S/. " + data.d.Resultado[0].PRECIO);
            $(".dsc-tot-pag").html("S/. " + data.d.Resultado[0].PRECIO);
            
            g_id_mascota = data.d.Resultado[0].ID_MSC_ENCRIP;
            g_id_sol = data.d.Resultado[0].ID;

            closeLoading();
        },
        error: function (data) {
            closeLoading();
        }
    });   

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
                closeLoading();
                return;
            }

            $('#sel_departamento').append("<option></option>");
            $('#sel_departamento_cita').append("<option></option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_departamento').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
                $('#sel_departamento_cita').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            closeLoading();
        }
    });
}

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
                closeLoading();
                return;
            }

            $('#sel_provincia').append("<option></option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_provincia').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }

            $(".dsc-env-pag").html("S/. -");
            $(".dsc-tot-pag").html($(".dsc-pre-pag").html());

            closeLoading();
        },
        error: function (data) {
            $("#errorClinica").html(GenerarAlertaError("Inconveniente en la operación"));
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
            $('#sel_distrito').empty();
            openLoading();
        },
        success: function (data) {
            if (!data.d.Activo) {
                closeLoading();
                return;
            }

            $('#sel_distrito').append("<option></option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_distrito').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }

            $(".dsc-env-pag").html("S/. -");
            $(".dsc-tot-pag").html($(".dsc-pre-pag").html());

            closeLoading();
        },
        error: function (data) {
            $("#errorClinica").html(GenerarAlertaError("Inconveniente en la operación"));
            closeLoading();
        }
    });
});
$("#sel_distrito").on('change', function () {
    for (var i = 1; i < 7; i++) {
        $(".btn-lim-" + i).hide();
        $(".btn-lprov-" + i).hide();
        $(".btn-prov-" + i).hide();
    }
    //get session solicitud
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/solicitud.aspx/getCarritoItemWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        beforeSend: function () {
            openLoading();
        },
        success: function (data) {
            if (!data.d.Activo) {
                closeLoading();
                return;
            }

            var stg_opcionSol = data.d.Resultado[0].ID;
            for (var i = 1; i < 7; i++) {
                $(".btn-lim-" + i).hide();
                $(".btn-lprov-" + i).hide();
                $(".btn-prov-" + i).hide();
            }

            if ($("#sel_departamento").val() === "Lima" || $("#sel_departamento").val() === "Callao" || $("#sel_departamento").val() === "Ica") {
                //Lima
                if (($("#sel_departamento").val() === "Lima" && $("#sel_provincia").val() === "Lima") || $("#sel_departamento").val() === "Callao") {
                    $(".btn-lim-" + stg_opcionSol).show();
                    $(".dsc-pre-pag").html("S/. " + data.d.Resultado[0].PRECIO);
                    $(".dsc-env-pag").html("S/. 5.5");
                    $(".dsc-tot-pag").html("S/. " + (parseFloat(data.d.Resultado[0].PRECIO) + 5.50));
                } else {
                    //Lima Provincias
                    $(".btn-lprov-" + stg_opcionSol).show();
                    $(".dsc-pre-pag").html("S/. " + data.d.Resultado[0].PRECIO);
                    $(".dsc-env-pag").html("S/. 10");
                    $(".dsc-tot-pag").html("S/. " + (parseFloat(data.d.Resultado[0].PRECIO) + 10.00));
                }
            } else {
                //Provincias
                $(".btn-prov-" + stg_opcionSol).show();
                $(".dsc-pre-pag").html("S/. " + data.d.Resultado[0].PRECIO);
                $(".dsc-env-pag").html("S/. 12");
                $(".dsc-tot-pag").html("S/. " + (parseFloat(data.d.Resultado[0].PRECIO) + 12.00));
            }

            closeLoading();
        },
        error: function (data) {
            closeLoading();
        }
    });    
});

$("#btn-recibe").click(function () {
    //Validar Recibe
    $("#errorDiv").html("");
    if (validIdInput($("#txt-nom").val())) {
        $("#errorDiv").html(GenerarAlertaWarning("Nombre: Ingrese nombre"));
        $("#txt-nom").focus();
        return false;
    } else if (validIdInput($("#txt-ape").val())) {
        $("#errorDiv").html(GenerarAlertaWarning("Apellido: Ingrese apellido"));
        $("#txt-ape").focus();
        return false;
    } else if (validIdInput($("#txt-tel").val())) {
        $("#errorDiv").html(GenerarAlertaWarning("Telefono: Ingrese telefono"));
        $("#txt-tel").focus();
        return false;
    }
});
$("#btn-domicilio").click(function () {
    //Validar Recibe
    $("#errorDiv").html("");
    if (validIdInput($("#sel_departamento").val())) {
        $("#errorDiv").html(GenerarAlertaWarning("Departamento: seleccione un Departamento"));
        $("#sel_departamento").focus();
        return false;
    } else if (validIdInput($("#sel_provincia").val())) {
        $("#errorDiv").html(GenerarAlertaWarning("Provincia: seleccione una Provincia"));
        $("#sel_provincia").focus();
        return false;
    } else if (validIdInput($("#sel_distrito").val())) {
        $("#errorDiv").html(GenerarAlertaWarning("Distrito: seleccione un Distrito"));
        $("#sel_distrito").focus();
        return false;
    } else if (validIdInput($("#txt_direccion").val())) {
        $("#errorDiv").html(GenerarAlertaWarning("Dirección: ingrese una Dirección"));
        $("#txt_direccion").focus();
        return false;
    } else if (validIdInput($("#txt_referencia").val())) {
        $("#errorDiv").html(GenerarAlertaWarning("Referencia: ingrese una referencia"));
        $("#txt_referencia").focus();
        return false;
    }

    var objE = {
        ID_ENCRIP: g_id_mascota,
        OPCION: g_id_sol,
        NOM_REP: $("#txt-nom").val(),
        APE_REP: $("#txt-ape").val(),
        TEL_REP: $("#txt-tel").val(),
        DNI_REP: $("#txt-dni").val(),
        DIRECCION: $("#txt_direccion").val(),
        REFERENCIA: $("#txt_referencia").val(),
        GEOGRAFIA_ID: $("#sel_distrito").val()
    };
    
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/mascota.aspx/SolicitarServicioWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE }),
        async: true,
        beforeSend: function () {
            openLoading();
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorDiv").html(GenerarAlertaWarning(data.d.Mensaje));
                closeLoading();
                return false;
            }
            
            closeLoading();
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaWarning(data.d.Mensaje));
            closeLoading();
            return false;
        }
    });
});

function openLoading() {
    $("#page-loader").show();
}

function closeLoading() {
    $("#page-loader").hide();
}
