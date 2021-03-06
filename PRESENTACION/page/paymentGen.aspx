﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="paymentGen.aspx.cs" Inherits="PRESENTACION.page.paymentGen" %>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>World Pets Perú</title>
    <link rel="shortcut icon" type="image/png" href="img/favicon.png" />

    <!-- Custom styles for this template-->
    <%--<link href="../css/bootstrap3.4.min.css" rel="stylesheet" />--%>
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
    <link href="../templateSoft/css/sb-admin-2.css?v=<%:DateTime.Now.ToString("yyyyMMddHHmm")%>" rel="stylesheet">

    <link href="../css/stylePropio.css?v=<%:DateTime.Now.ToString("yyyyMMddHHmm")%>" rel="stylesheet" />
    <style>
         html, body, #wrapper {
            height:100%;
        }
        *,
        :before,
        :after {
            box-sizing: border-box;
        }

        form {
            /*width: 320px;*/
            /*width: 650px;*/
            margin: 45px auto;
        }

            form h1 {
                font-size: 3em;
                font-weight: 300;
                text-align: center;
            }

            form h5 {
                text-align: center;
                text-transform: uppercase;
                color: #c6c6c6;
            }

            form hr.sep {
                background: #2196F3;
                box-shadow: none;
                border: none;
                height: 2px;
                width: 25%;
                margin: 0px auto 45px auto;
            }

            form .emoji {
                font-size: 1.2em;
            }

        .group {
            position: relative;
            margin: 20px 0;
        }

        textarea {
            resize: none;
        }

        input,
        textarea {
            background: none;
            color: #717171;
            font-size: 18px;
            padding: 10px 10px 10px 5px;
            display: block;
            /*width: 320px;*/
            width: 100%;
            border: none;
            border-radius: 0;
            border-bottom: 1px solid #c6c6c6;
        }

            input:focus,
            textarea:focus {
                outline: none;
            }

                input:focus ~ label, input:valid ~ label,
                textarea:focus ~ label,
                textarea:valid ~ label {
                    top: -14px;
                    font-size: 12px;
                }

                input:focus ~ .bar:before,
                textarea:focus ~ .bar:before {
                    /*width: 320px;*/
                    width: 100%;
                }

            input[type="password"] {
                letter-spacing: 0.3em;
            }

        label {
            color: #c6c6c6;
            font-size: 16px;
            font-weight: normal;
            position: absolute;
            pointer-events: none;
            left: 5px;
            top: 10px;
            -webkit-transition: 300ms ease all;
            transition: 300ms ease all;
        }

        .bar {
            position: relative;
            display: block;
            color: #de1212;
            /*width: 320px;*/
            width: 100%;
        }

            .bar:before {
                content: '';
                height: 2px;
                width: 0;
                bottom: 0px;
                position: absolute;
                background: #2196F3;
                -webkit-transition: 300ms ease all;
                transition: 300ms ease all;
                left: 0%;
            }

        .btn {
            background: #fff;
            color: #959595;
            border: none;
            padding: 10px 20px;
            border-radius: 3px;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            text-decoration: none;
            outline: none;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
            -webkit-transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

            .btn:hover {
                color: #8b8b8b;
                box-shadow: 0 7px 14px rgba(0, 0, 0, 0.18), 0 5px 5px rgba(0, 0, 0, 0.12);
            }

            .btn.btn-link {
                background: #2196F3;
                color: #d3eafd;
            }

                .btn.btn-link:hover {
                    background: #0d8aee;
                    color: #deeffd;
                }

            .btn.btn-submit {
                background: #2196F3;
                color: #bce0fb;
            }

                .btn.btn-submit:hover {
                    background: #0d8aee;
                    color: #deeffd;
                }

            .btn.btn-cancel {
                background: #eee;
            }

                .btn.btn-cancel:hover {
                    background: #e1e1e1;
                    color: #8b8b8b;
                }

        .btn-box {
            text-align: center;
            margin: 50px 0;
        }


        .layout-col {
            min-width: 646px;
            max-width: 70.75em;
            width: 100%;
        }
        .layout-col-left {
            width:70%;
            padding:10px;
            background: #eee;
        }
            .layout-col-left .payment-card {
                margin: 0 auto;
                font-size: .625em;
                height: 120px;
                width: 200px;
                position: relative;
            }
            .layout-col-left .payment-card-rotate {
                width: 100%;
                height: 100%;
                position: absolute;
                -webkit-transform-style: preserve-3d;
                transform-style: preserve-3d;
            }
            .layout-col-left .payment-card-front {
                transform: rotateY(0deg);
                z-index: 2;
                backface-visibility: hidden;
                background-size: contain;
                border-radius: .84615em;
                color: #333;
                font-family: Roboto Mono;
                overflow: hidden;
                position: absolute;
                height: 100%;
                width: 100%;
                padding: 1.07692em .61538em;
                box-shadow: 0 0.30769em 0.76923em 0 rgba(0,0,0,.2);
            }
            .layout-col-left .payment-card-bg {
                background: linear-gradient(90deg,#c5c5c5,#f3f3f3);
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -3;
            }
            .layout-col-left .payment-card-bg-overlay {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                z-index: -1;
            }
            .layout-col-left .payment-card-bg-overlay:before {
                top: .875em;
                left: -9em;
                background: rgba(0,0,0,.03);
                position: absolute;
                border-radius: 50%;
                width: 26.25em;
                height: 26.25em;
                content: " ";
                z-index: 1;
            }
            .layout-col-left .payment-card-bg-overlay:after {
                right: -11.188em;
                top: -15.875em;
                left: 2.188em;
                box-shadow: -1px 1px 1px hsla(0,0%,100%,.12);
                background: rgba(58,58,58,.03);
                position: absolute;
                border-radius: 50%;
                width: 26.25em;
                height: 26.25em;
                content: " ";
                z-index: 1;
            }
            .layout-col-left .payment-card-row {
                width: 100%;
                font-size: 1.30769em;
                padding: 0 10px;
                color: #868686;
            }
        .layout-col-right {
            width:30%;
            padding:10px;
        }
            .layout-col-right .brand-image {
                width: 2.625em;
                height: 2.625em;
            }
            .layout-col-right .brand-name {
                font-size: 1.5em;
                margin-left: .5em;
                font-weight: 700;
                line-height: 1;
                word-break: break-word;
                font-family: Proxima Nova,Helvetica Neue,Helvetica,Arial,sans-serif;
            }
            .center {
              width: 100%;
              margin: auto;
            }
    </style>
</head>

<body id="page-top">
    <div id="page-loader"><img style="-webkit-user-select: none; margin: auto;" src="img/loader-pet.gif"></div>
    <div class="layout-col center mt-3 rounded" style="overflow: auto;background: #f7f7f7;box-shadow: 0 0.125em 0.375em rgba(0,0,0,.3);">
        <div class="layout-col-left float-left p-3 rounded-left">
            <h3 class="mt-3 mb-3 text-dark">Ingrese datos de la tarjeta</h3>
            <div class="bg-white p-3 rounded">
                <div class="payment-card">
                    <div class="payment-card-rotate">
                        <div class="payment-card-front">
                            <div class="payment-card-bg"></div>
                            <div class="payment-card-bg-overlay"></div>
                            <div class="payment-card-row"></div>
                            <div class="payment-card-row"></div>
                            <div class="payment-card-row" style="font-family: monospace;font-size: 16px;">
                                <br><br><br><br>
                                ****&nbsp;****&nbsp;****&nbsp;****
                            </div>
                            <div class="payment-card-row text-left" style="font-family: monospace;font-size: 1.2em;">
                                NOMBRE Y APELLIDO&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MM/AA
                            </div>
                        </div>
                    </div>
                </div>
                <form action="/page/paymentGen.aspx" method="post" id="pay" name="pay">
                    <div class="row">
                        <%--<div class="group">
                        <input type="text" name="description" id="description" value="Ítem seleccionado"/>
                        <label for="description">Descripción</label>
                    </div>                   
                        <div class="group">
                        <input name="transaction_amount" id="transaction_amount" value="100"/>
                        <label for="transaction_amount">Monto a pagar</label>      
                    </div>--%>
                        <div class="col-md-6">
                            <div class="group">
                                <input required="required" type="text" id="cardNumber" data-checkout="cardNumber" onselectstart="return false" onpaste="return false" oncopy="return false" oncut="return false" ondrag="return false" ondrop="return false" autocomplete="off" />
                                <span class="highlight"></span><span class="cardNumber-bar bar"></span>
                                <label for="cardNumber">Número de la tarjeta</label>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="group">
                                <label style="top: -10px;font-size: 12px;">Mes venc</label>
                                <span class="highlight"></span><span class="bar"></span>
                                <input required="required" class="integerFCP" placeholder="MM" maxlength="2" type="text" id="cardExpirationMonth" data-checkout="cardExpirationMonth" onselectstart="return false" onpaste="return false" oncopy="return false" oncut="return false" ondrag="return false" ondrop="return false" autocomplete="off" />
                                <span class="highlight"></span><span class="cardExpirationMonth-bar bar"></span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="group">
                                <label style="top: -10px;font-size: 12px;">Año venc</label>
                                <span class="highlight"></span><span class="bar"></span>
                                <input required="required" class="integerFCP" placeholder="AAAA" maxlength="4" type="text" id="cardExpirationYear" data-checkout="cardExpirationYear" onselectstart="return false" onpaste="return false" oncopy="return false" oncut="return false" ondrag="return false" ondrop="return false" autocomplete="off" />
                                <span class="highlight"></span><span class="cardExpirationYear-bar bar"></span>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="group">
                                <input required="required" type="text" id="cardholderName" data-checkout="cardholderName" />
                                <span class="highlight"></span><span class="cardholderName-bar bar"></span>
                                <label for="cardholderName">Nombre y apellido</label>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="group">
                                <input required="required" class="cc-cvc-input integerFCP" maxlength="4" type="text" id="securityCode" data-checkout="securityCode" onselectstart="return false" onpaste="return false" oncopy="return false" oncut="return false" ondrag="return false" ondrop="return false" autocomplete="off" />
                                <span class="highlight"></span><span class="securityCode-bar bar"></span>
                                <label for="securityCode">Código de seguridad</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="group">
                                <input required="required" type="email" id="email" name="email" />
                                <span class="highlight"></span><span class="bar"></span>
                                <label for="email">Email</label>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="group" style="margin: 8px 0;">
                                <label for="docType" style="position: revert;top: -14px;font-size: 12px;">Tipo de documento</label>                   
                                <select id="docType" class="form-control" data-checkout="docType"></select>                    
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="group">
                                <input required="required" class="integerFCP" maxlength="12" type="text" id="docNumber" data-checkout="docNumber" />
                                <span class="highlight"></span><span class="docNumber-bar bar"></span>
                                <label for="docNumber">Número dni</label>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <%--<div class="group">
                                <label for="installments" style="position: revert;">Cuotas</label>
                                <select id="installments" class="form-control" name="installments"></select>
                            </div>--%>
                            <input type="hidden" name="payment_method_id" id="payment_method_id" />
                            <input type="submit" class="btn btn-submit" value="Pagar" />
                        </div>
                    </div>
                </form>
            </div>
            
        </div>
        <div class="layout-col-right float-right p-4">
            <span class="brand-image">
                <img src="https://mpe-s1-p.mlstatic.com/820214-MPE43100003857_082020-O.jpg" alt="RUMP" title="RUMP">
            </span>
            <span class="brand-name text-dark">RUMP</span>
            <br />
            <br />
            <h4><span class="text-dark">Detalle de tu compra</span></h4>
            <br />
            <br />
            <div class="row-summary h5">
                <span class="float-left">??</span>
                <span class="float-right">??</span>
            </div>
        </div>
    </div>
    
    <!-- Bootstrap core JavaScript-->
    <script src="../templateSoft/vendor/jquery/jquery.min.js"></script>
    <!-- Custom scripts for all pages-->
    <%--<script src="../templateSoft/js/sb-admin-2.js"></script>--%>
    <script src="../js/all/bootstrap.min.js"></script>
    <script src="../js/general.js?v=<%:DateTime.Now.ToString("yyyyMMddHHmm")%>"></script>
    <!-- Mercado Pago-->
    <script src="https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js"></script>
    
    <script>
        window.Mercadopago.setPublishableKey("<%:ConfigurationManager.AppSettings.Get("PUBLIC_KEY")%>");

        //let ccNumberInput = document.querySelector(".cc-number-input"),
	let ccNumberPattern = /^\d{0,16}$/g,
	ccNumberSeparator = " ",
	ccNumberInputOldValue,
	ccNumberInputOldCursor,
	ccExpiryInput = document.querySelector(".cc-expiry-input"),
	ccExpiryPattern = /^\d{0,4}$/g,
	ccExpirySeparator = "/",
	ccExpiryInputOldValue,
	ccExpiryInputOldCursor,
	ccCVCInput = document.querySelector(".cc-cvc-input"),
	ccCVCPattern = /^\d{0,3}$/g,
	mask = (value, limit, separator) => {
		var output = [];
		for (let i = 0; i < value.length; i++) {
			if (i !== 0 && i % limit === 0) {
				output.push(separator);
			}

			output.push(value[i]);
		}

		return output.join("");
	},
	unmask = (value) => value.replace(/[^\d]/g, ""),
	checkSeparator = (position, interval) => Math.floor(position / (interval + 1)),
	ccNumberInputKeyDownHandler = (e) => {
		let el = e.target;
		ccNumberInputOldValue = el.value;
		ccNumberInputOldCursor = el.selectionEnd;
	},
	ccNumberInputInputHandler = (e) => {
		let el = e.target,
			newValue = unmask(el.value),
			newCursorPosition;

		if (newValue.match(ccNumberPattern)) {
			newValue = mask(newValue, 4, ccNumberSeparator);

			newCursorPosition =
				ccNumberInputOldCursor -
				checkSeparator(ccNumberInputOldCursor, 4) +
				checkSeparator(
					ccNumberInputOldCursor + (newValue.length - ccNumberInputOldValue.length),
					4
				) +
				(unmask(newValue).length - unmask(ccNumberInputOldValue).length);

			el.value = newValue !== "" ? newValue : "";
		} else {
			el.value = ccNumberInputOldValue;
			newCursorPosition = ccNumberInputOldCursor;
		}

		el.setSelectionRange(newCursorPosition, newCursorPosition);

		highlightCC(el.value);
	},
	highlightCC = (ccValue) => {
		let ccCardType = "",
			ccCardTypePatterns = {
				amex: /^3/,
				visa: /^4/,
				mastercard: /^5/,
				disc: /^6/,

				genric: /(^1|^2|^7|^8|^9|^0)/
			};

		for (const cardType in ccCardTypePatterns) {
			if (ccCardTypePatterns[cardType].test(ccValue)) {
				ccCardType = cardType;
				break;
			}
		}

		let activeCC = document.querySelector(".cc-types__img--active"),
			newActiveCC = document.querySelector(`.cc-types__img--${ccCardType}`);

		if (activeCC) activeCC.classList.remove("cc-types__img--active");
		if (newActiveCC) newActiveCC.classList.add("cc-types__img--active");
	},
	ccExpiryInputKeyDownHandler = (e) => {
		let el = e.target;
		ccExpiryInputOldValue = el.value;
		ccExpiryInputOldCursor = el.selectionEnd;
	},
	ccExpiryInputInputHandler = (e) => {
		let el = e.target,
			newValue = el.value;

		newValue = unmask(newValue);
		if (newValue.match(ccExpiryPattern)) {
			newValue = mask(newValue, 2, ccExpirySeparator);
			el.value = newValue;
		} else {
			el.value = ccExpiryInputOldValue;
		}
	};

//ccNumberInput.addEventListener("keydown", ccNumberInputKeyDownHandler);
//ccNumberInput.addEventListener("input", ccNumberInputInputHandler);

//ccExpiryInput.addEventListener("keydown", ccExpiryInputKeyDownHandler);
//ccExpiryInput.addEventListener("input", ccExpiryInputInputHandler);

    </script>
    <script type="text/javascript">
        $.getScript("../js/page/paymentGen.js")
            .fail(function (jqxhr, settings, exception) {
                alert("Error: No se ha cargando un complemento del sistema (paymentGen.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
            });
    </script>

</body>
</html>
