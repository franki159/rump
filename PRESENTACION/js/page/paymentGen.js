var valRND = Math.floor(Math.random() * 100);
var g_id_mascota = 0;
var g_id_sol = 0;
var doSubmit = false;

/*Inicializar Script*/
//Variacion de la zona horaria
$(document).ready(function () {
    fc_listar_inicio();
    closeLoading();
    $(document).prop("title", "::Pago");
    $(document).unbind("keydown"); 
});

function fc_listar_inicio() {
    window.Mercadopago.setPublishableKey("TEST-c86d8288-620b-4175-b89f-25259cb838e1");
    //window.Mercadopago.setPublishableKey("APP_USR-0c13961c-03f3-4a0c-b508-102f081274fa");

    window.Mercadopago.getIdentificationTypes();

    document.getElementById('cardNumber').addEventListener('keyup', guessPaymentMethod);
    document.getElementById('cardNumber').addEventListener('change', guessPaymentMethod);

    document.querySelector('#pay').addEventListener('submit', doPay);
    //get detalis pay
    //get session solicitud
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/solicitud.aspx/getCarritoItemWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        beforeSend: function () {
            openLoading();
        },
        success: function (data) {
            if (!data.d.Activo) {
                if (data.d.Mensaje === "SR") {
                    alert("No selecciono ninguna solicitud");
                    window.location = "Sistema";
                    return;
                } else {
                    closeLoading();
                    return;
                }
            }

            for (var i = 0; i < data.d.Resultado.length; i++) {
                $(".row-summary").html("<span class='float-left'>" + data.d.Resultado[i].DESCRIPCION + "</span><span class='float-right'>" + data.d.Resultado[i].PRECIO + "</span>");
            }

            //g_id_mascota = data.d.Resultado[0].ID_MSC_ENCRIP;
            //g_id_sol = data.d.Resultado[0].ID;

            closeLoading();
        },
        error: function (data) {
            closeLoading();
        }
    });
}
//***************************************************************************************************
//************************* Obtener método de pago de la tarjeta Inicio *****************************
//***************************************************************************************************
function guessPaymentMethod(event) {
    let cardnumber = document.getElementById("cardNumber").value;
    $(".cardNumber-bar").html(``);

    if (cardnumber.length >= 6) {
        let bin = cardnumber.substring(0, 6);
        window.Mercadopago.getPaymentMethod({
            "bin": bin
        }, setPaymentMethod);
    }
}

function setPaymentMethod(status, response) {
    if (status === 200) {
        let paymentMethodId = response[0].id;
        let element = document.getElementById('payment_method_id');
        element.value = paymentMethodId;
        //getInstallments();
    } else {
        $(".cardNumber-bar").html(`Tarjeta no valida`);
        $("#cardNumber").focus();
    }
}
//***************************************************************************************************
//**************************** Obtener método de pago de la tarjeta Fin *****************************
//***************************************************************************************************
//Obtener cantidad de cuotas
/*
function getInstallments() {
    window.Mercadopago.getInstallments({
        "payment_method_id": document.getElementById('payment_method_id').value,
        "amount": parseFloat(document.getElementById('transaction_amount').value)

    }, function (status, response) {
        if (status === 200) {
            document.getElementById('installments').options.length = 0;
            response[0].payer_costs.forEach(installment => {
                let opt = document.createElement('option');
                opt.text = installment.recommended_message;
                opt.value = installment.installments;
                document.getElementById('installments').appendChild(opt);
            });
        } else {
            alert(`installments method info error: ${response}`);
        }
    });
}*/
//***************************************************************************************************
//****************************** Crea el token de la tarjeta Inicio *********************************
//***************************************************************************************************
function doPay(event) {
    event.preventDefault();
    if (!doSubmit) {
        var $form = document.querySelector('#pay');

        window.Mercadopago.createToken($form, sdkResponseHandler);

        return false;
    }
}

function sdkResponseHandler(status, response) {
    if (status !== 200 && status !== 201) {
        alert("verify filled data");
    } else {
        var form = document.querySelector('#pay');
        var card = document.createElement('input');
        card.setAttribute('name', 'token');
        card.setAttribute('type', 'hidden');
        card.setAttribute('value', response.id);
        form.appendChild(card);
        doSubmit = true;
        form.submit();
    }
}
//***************************************************************************************************
//********************************* Crea el token de la tarjeta Fin *********************************
//***************************************************************************************************
function openLoading() {
    $("#page-loader").show();
}

function closeLoading() {
    $("#page-loader").hide();
}
