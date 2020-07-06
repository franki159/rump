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

$("#btn_print").click(function (evt) {
    window.open('page/proceso/visorWeb.aspx?tipoImpresion=DNI&numIdentify=' + $("#txt_dni").val(), '_blank');
});

$("#btn_print_reg").click(function (evt) {
    window.open('page/proceso/visorWeb.aspx?tipoImpresion=REGISTRO&numIdentify=' + $("#txt_dni").val(), '_blank');
});

$("#btn_print_resp").click(function (evt) {
    window.open('page/proceso/visorWeb.aspx?tipoImpresion=RESPONSABLE&numIdentify=' + $("#txt_dni").val(), '_blank');
});