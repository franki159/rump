$(document).ready(function () {
    var objE = {
        ID_ENCRIP: sessionStorage.getItem("rump_conf_idmascota"),
        OPCION: sessionStorage.getItem("rump_conf_sol")
    };

    if (sessionStorage.getItem("rump_conf_idmascota") !== null) {
        $.ajax({
            type: "POST",
            url: "page/mantenimiento/mascota.aspx/SolicitarServicioWM",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ objE: objE }),
            async: true,
            success: function (data) {
                if (!data.d.Activo) {
                    $("#page-loader").hide();
                    return;
                }
            },
            error: function (data) {
                $("#page-loader").hide();
            }
        });
        event.preventDefault();
    } else {
        $("#page-loader").hide();
    }
});