$(function () {
    $("#usuario").focus();

    $("#frmLogin input").keypress(function (e) {
        if (e.keyCode === 13) {
            if ($("#txtEmail").val() !== "" && $("#txtPassword").val() !== "") {
                $("#btnAcceder").click();
            } else {
                if ($(this).attr("id") === "usuario") $("#txtPassword").focus();
                else $("#btnAcceder").click();
            }
        }
    });

    $("#btnAcceder").click(function () {
        var msjValida = "";
        if ($("#txtEmail").val() === "") msjValida += "Ingrese Usuario</br>";
        if ($("#txtPassword").val() === "") msjValida += "Ingrese Contraseña";

        if (msjValida !== "") {
            $("#msgError").html(GenerarAlertaError(msjValida));
            $("#txtEmail").focus();
            return;
        }
        
        $.ajax({
            type: "POST",
            url: "login.aspx/AccederWM",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($("#frmLogin").serializeObject()),
            async: true,
            beforeSend: function () {
                $("#frmLogin :input").attr("disabled", true);
            },
            success: function (data) {
                if (!data.d.Activo) {
                    alert_OpenDay("Error", data.d.Mensaje);
                    $("#frmLogin :input").removeAttr("disabled");
                    $("#usuario").focus();
                } else {
                    alert_OpenDay("ok");
                }
            },
            error: function (data) {
                alert_OpenDay("Error", "Inconveniente en la operación");
                $("#frmLogin :input").removeAttr("disabled");
                $("#usuario").focus();
            }
        });
    });
});