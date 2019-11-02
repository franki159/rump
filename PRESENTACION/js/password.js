$(function () {
    $.ajax({
        type: "POST",
        url: "password.aspx/IniciarWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ usuario: $('#txtEmail').val() }),
        async: true,
        beforeSend: function () {
            $("#page-loader").show();
        },
        success: function (data) {
            $("#page-loader").hide();

            if (!data.d.Activo) {
                $('#frmLogin').empty();
                $('#frmLogin').html('<br /><br /><br /><br />' +
                    '<div class="text-center">' + data.d.Mensaje + '</div>' +
                    '<br /><br /><br /><br />');
            } else {
                $("#usuario").focus();
                $("#myModal10").modal('show');

                $("#btnAcceder").click(function () {
                    $("#msgError").html('');

                    if (validIdInput($("#txtPassword").val()) || validPasswordInput($("#txtPassword").val())) {
                        $("#msgError").html(GenerarAlertaWarning("Contraseña: ingrese contraseña valida"));
                        $("#txtPassword").focus();
                        return;
                    } else if (validIdInput($("#txtPassword2").val()) || validPasswordInput($("#txtPassword2").val())) {
                        $("#msgError").html(GenerarAlertaWarning("Confirmar Contraseña: ingrese contraseña valida"));
                        $("#txtPassword2").focus();
                        return;
                    } else if ($("#txtPassword").val() != $("#txtPassword2").val()) {
                        $("#msgError").html(GenerarAlertaWarning("Contraseña: ambas constraseñas no son iguales"));
                        $("#txtPassword2").focus();
                        return;
                    }

                    $.ajax({
                        type: "POST",
                        url: "password.aspx/CambiarWM",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify({ usuario: $('#txtEmail').val(), clave: $('#txtPassword').val()}),
                        async: true,
                        beforeSend: function () {
                            $("#frmLogin :input").attr("disabled", true);
                            $("#page-loader").show();
                        },
                        success: function (data) {
                            $("#page-loader").hide();
                            if (!data.d.Activo) {
                                msg_OpenDay("e", data.d.Mensaje);
                                $("#frmLogin :input").removeAttr("disabled");
                                $("#txtPassword").focus();
                            } else {
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
            }
        },
        error: function (data) {
            $("#page-loader").hide();
            $('#frmLogin').empty();
            $('#frmLogin').html('<br />< br /><br /><br /><br />' +
                '<div class="text-center">Inconveniente en la operación, contacte con el administrador</div>' +
                '<br /><br /><br /><br /><br />');
        }
    });
});