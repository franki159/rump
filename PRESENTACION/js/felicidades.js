$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/mascota.aspx/ObtenerCuponWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (data) {
            if (!data.d.Activo) {
                alert(data.d.Mensaje);
                window.location = "InicioSesion";
                return;
            }

            $(".cod-promocion").html(data.d.Resultado.DESCRIPCION);
        }
    });
});