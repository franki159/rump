$(document).ready(function () {
    InfoSesion();
    $("#logoutModal").click(function () {
        $.ajax({
            type: "POST",
            url: "../default.aspx/CerrarSesionWM",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (data, status) {
                window.location = data.d.Resultado;
            },
            error: function (data) { }
        });
    });
});

function InfoSesion() {
    $.ajax({
        type: "POST",
        url: "../index.aspx/InfoSesionWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data, status) {
            if (!data.d.Activo) {
                $("#divLoginUser").html('<a href="../login.aspx"><strong>Iniciar Sesión</br></strong> </br><i class="fa fa-user-circle" aria-hidden="true"/></a>');
            } else {
                $("#divLoginUser").html('<a  href="../default.aspx">' + data.d.Resultado.NOMBRE.split(" ")[0] + " " + data.d.Resultado.APELLIDO.split(" ")[0] + ' <i class="fa fa-user-circle-o" aria-hidden="true"></i></a>');
            }
        },
        error: function (data) {
            closeLoading();
        }
    });
}
