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
        $("#msgError").html('');

        var msjValida = "";
        if (isEmail($("#txtEmail").val()) == false) msjValida += "Ingrese email valido</br>";
        if (validPasswordInput($("#txtPassword").val()) == true) msjValida += "Ingrese Contraseña valida";

        if (msjValida !== "") {
            $("#msgError").html(GenerarAlertaError(msjValida));
            $("#txtEmail").focus();
            return;
        }

        $.ajax({
            type: "POST",
            url: "register.aspx/AccederWM",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ usuario: $("#txtEmail").val(), clave: $("#txtPassword").val()}),
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