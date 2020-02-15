$(function () {
    $("#page-loader").hide();

    $("#usuario").focus();
    $("#myModal10").modal('show');

    $("#btnAcceder").click(function () {
        var msjValida = "";
        if ($("#txtEmail").val() === "") msjValida += "Ingrese Usuario</br>";

        if (msjValida !== "") {
            $("#txtEmail").focus();
            return;
        }

        $.ajax({
            type: "POST",
            url: "forgotPassword.aspx/AccederWM",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ usuario: $("#txtEmail").val() }),
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
                    $("#page-loader").hide();
                    msg_OpenDay("c", data.d.Mensaje);
                    $("#frmLogin a").hide();
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