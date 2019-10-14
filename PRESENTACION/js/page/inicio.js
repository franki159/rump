/*Inicializar Script*/
//Variacion de la zona horaria
$(function () {
    $(document).prop("title", "::Inicio");
    $(document).unbind("keydown");   
});

/*Eventos por Control*/
$(document).keydown(function (evt) {
    switch (evt ? evt.which : event.keyCode) {
        case 8: //BLOQUEA RETROCESO DE PAGINA
            var valor = document.activeElement.value;
            if (valor === undefined) {
                return false;
            }
            break;
        case 13: //BLOQUEA ENTER
            if ($("#modalConfirm").css('display') === 'block') 
                $("#btnAceptar").click();
            if ($("#pnl_reserva").css('display') === 'block') 
                $("#btn_guardar").click();
            if ($("#pnl_atencion_a").css('display') === 'block')
                $("#btn_guardar_a").click();
            if ($("#pnl_atencion_h").css('display') === 'block')
                $("#btn_guardar_h").click();
            break;
    }
});






