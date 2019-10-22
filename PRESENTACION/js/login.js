$(function () {
    $("#page-loader").hide();

    $("#usuario").focus();
    $("#myModal10").modal('show');
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
                $("#page-loader").show();
            },
            success: function (data) {
                if (!data.d.Activo) {
                    $("#page-loader").hide();
                    msg_OpenDay("e", data.d.Mensaje);
                    $("#frmLogin :input").removeAttr("disabled");
                    $("#usuario").focus();
                } else {
                    window.location = "default.aspx";
                }
            },
            error: function (data) {
                $("#page-loader").hide();
                msg_OpenDay("e", "Inconveniente en la operación");
                $("#frmLogin :input").removeAttr("disabled");
                $("#usuario").focus();
            }
        });
    });
});