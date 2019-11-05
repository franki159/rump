$(document).ready(function () {
    InfoSesion();    
});

function InfoSesion() {
    $.ajax({
        type: "POST",
        url: "index.aspx/InfoSesionWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data, status) {
            if (!data.d.Activo) {
                $("#divLoginUser").html('<a href="login.aspx">Iniciar Sesión <i class="fa fa-user-circle-o" aria-hidden="true"></i></a>');
            } else {
                $("#divLoginUser").html('<a style="background-color: #000000;" href="default.aspx">' + data.d.Resultado.NOMBRE.split(" ")[0] + " " + data.d.Resultado.APELLIDO.split(" ")[0] +' <i class="fa fa-user-circle-o" aria-hidden="true"></i></a>');
            }
        },
        error: function (data) {
            closeLoading();
        }
    });
}

$("#logoutModal").click(function () {
    $.ajax({
        type: "POST",
        url: "default.aspx/CerrarSesionWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (data, status) {
            window.location = data.d.Resultado;
        },
        error: function (data) { }
    });
});

$(".reportar-msct-etv").click(function () {
    $("#pnl_report_mascota").modal();
});

$("#btn_reportar_mascota").click(function () {
    if ($("#txt_dni_mascota").val().trim() === "") {
        $("#errorReporte").html(GenerarAlertaWarning("Codigo: Ingrese el codigo de la chapita"));
        $("#txt_dni_mascota").focus();
        return;
    } else if (isEmail($("#txt_correo").val().trim()) === false) {
        $("#errorReporte").html(GenerarAlertaWarning("Correo: Ingrese un correo válido"));
        $("#txt_correo").focus();
        return;
    } else if ($("#txt_telefono").val().trim() === "" || $("#txt_telefono").val().length < 7) {
        $("#errorReporte").html(GenerarAlertaWarning("Telefono: Ingrese un teléfono válido"));
        $("#txt_telefono").focus();
        return;
    }

    var objE = {
        DNI: $("#txt_dni_mascota").val(),
        FEC_CREA: $("#txt_fecha").val() === "" ? null : getDateFromFormat($("#txt_fecha").val(), 'yyyy-MM-dd'),
        NOMBRE: $("#txt_nombre").val(),
        CORREO: $("#txt_correo").val(),
        TELEFONO: $("#txt_telefono").val(),
        OBSERVACION: $("#txt_observacion").val()
    };
   
    $.ajax({
        type: "POST",
        url: "index.aspx/ReportarMascotaWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE }),
        async: true,
        beforeSend: function () {
            $("#page-loader").show();
        },
        success: function (data, status) {
            $("#page-loader").hide();
            if (!data.d.Activo) {
                $("#errorReporte").html(GenerarAlertaError(data.d.Mensaje));
            } else {
                $("#pnl_report_mascota").modal('hide');
                msg_OpenDay("c", data.d.Mensaje);
            }
        },
        error: function (data) {
            $("#page-loader").hide();
            $("#errorReporte").html(GenerarAlertaError("Inconveniente en la operación"));
        }
    });
    
    
});

