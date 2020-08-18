using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using ENTIDAD;
using NEGOCIOS;
using System.Globalization;
using System.Threading;
using MercadoPago;
using MercadoPago.Resources;
using MercadoPago.DataStructures.Payment;
using MercadoPago.Common;
using ENTIDAD;
using NEGOCIOS;

namespace PRESENTACION.page
{
    public partial class paymentGen : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Page.IsPostBack == false)
            {
                //if (Session["UserRump"] == null) Response.Redirect("~/InicioSesion");
            }
            //get params form
            var tokencard = Request.Form["token"];
            var payMethod = Request.Form["payment_method_id"];
            var installmt = 1;//Request.Form["installments"];***********cuotas
            //get total pedido
            List<ESolicitud> objCarrito = new List<ESolicitud>();
            objCarrito = (List<ESolicitud>)HttpContext.Current.Session["carritoMascota"];
            float payAmount = (float)objCarrito.Sum(x => x.PRECIO);//Request.Form["transaction_amount"];

            if (tokencard != null && payMethod != null && payAmount != 0)
            {
                var rp_payment = response_card_mercadopago(tokencard, payMethod, payAmount, installmt);
                processPaymentResponse(rp_payment);
            }
            else{
                //log('error: parametros nulos')
            }
        }

        public object response_card_mercadopago(string tokencard, string payMethod, float payAmount, int installmt)
        {
            object payResult = null;

            MercadoPago.SDK.AccessToken = "TEST-3603622080694099-071517-bee1bd3569411ac4d402e97b83c04cf9-334567666";
            //MercadoPago.SDK.SetAccessToken("TEST-3603622080694099-071517-bee1bd3569411ac4d402e97b83c04cf9-334567666");

            var payment = new Payment
            {
                TransactionAmount = payAmount,
                Token = tokencard,
                Description = "Ergonomic Granite Wallet",
                ExternalReference = "ID_PEDIDO",
                PaymentMethodId = payMethod,
                Installments = installmt,
                Payer = new Payer
                {
                    Email = "chara.20.90@gmail.com"//,
                    //FirstName = "Frank",
                    //LastName = "Chara"
                },
            };

            try
            {
                payment.Save();
                payResult = payment;
            }
            catch (Exception ex)
            {
                payResult = payment.Status;
            }

            return payResult;
        }
        public void processPaymentResponse(dynamic payment) {

            if (payment != null)
            {
                switch (payment.Status)
                {
                    case "approved":
                    case "authorized":
                        break;
                    case "cancelled":
                        //cancelado
                        break;
                    case "rejected":
                        //fallido
                        break;
                    case "in_process":
                        //Caso particular de MercadoPago (pago pendiente de revision, se da hasta 6hrs para revision)
                        break;
                    case null:
                        //Error en la pasarela de pago. Intente nuevamente por favor
                        break;
                    default:
                        break;
                }
            }
            else {

            }
        }
    }
}