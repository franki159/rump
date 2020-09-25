function guardarImagen(evt, nameId, file) {
    var objResp = 0;
    var dataImagen = new FormData();
    dataImagen.append('file', file);
    dataImagen.append('name', nameId);

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/hh_imagenUsuario.ashx",
        data: dataImagen,
        async: false,
        contentType: false,
        processData: false,
        success: function (result) {
            //msg_OpenDay("c", "Mascota guardada correctamente");
            objResp = 0;
        },
        error: function (err) {
            //msg_OpenDay("e", "Error al guardar imagen");
            objResp = 1;
        }
    });

    return objResp;
}

$("#btn_enviar").click(function (evt) {
    var codePais = "";
    var numTel = $("#txt_telefono").val().replace(/ /g, "").trim();

    if (numTel === "") {
        return;
    }

    if (numTel.length === 9) {
        codePais = "51";//Peru por defecto
    }

    window.location = "https://api.whatsapp.com/send?phone=" + codePais + numTel +"&text=";
    evt.preventDefault();
});