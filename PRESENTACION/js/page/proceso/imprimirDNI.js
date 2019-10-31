/*Inicializar Script*/
$(function () {
    closeLoading();
    $("#txt_dni").focus();
});
/*Eventos por Control*/
$(document).keydown(function (evt) {
    switch (evt ? evt.which : event.keyCode) {
        case 8: //BLOQUEA RETROCESO DE PAGINA
            var valor = document.activeElement.value;
            if (valor === undefined) { return false; } break;
        case 13: //BLOQUEA ENTER
            return false;
        case 66: //BUSCAR
            if (evt ? evt.altKey : event.altKey) $("#btn_buscar").click();
            break;
        case 78: //NUEVO
            if (evt ? evt.altKey : event.altKey) $("#btn_nuevo").click();
            break;
        case 71: //GUARDAR
            if (evt ? evt.altKey : event.altKey) {
                if ($("#pnl_mascota").css('display') === 'block') {
                    $("#btn_guardar").click();
                }
            }
            break;
    }
});

//function guardarImagen(evt) {
//    $.ajax({
//        type: "POST",
//        url: "page/proceso/hh_imprimirDNi.ashx",
//        data: dataImagen,
//        contentType: false,
//        processData: false,
//        success: function (result) {
//            msg_OpenDay("c", "Usuario guardado correctamente");
//        },
//        error: function (err) {
//            msg_OpenDay("e", "Error al guardar imagen");
//        }
//    });

//    evt.preventDefault();
//}
$("#btn_print").click(function (evt) {
    window.open('page/proceso/visorWeb.aspx?numIdentify=' + $("#txt_dni").val(), '_blank');
});