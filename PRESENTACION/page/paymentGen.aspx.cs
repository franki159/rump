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
            var payAmount = Request.Form["transaction_amount"];



            if (tokencard != null)
            {
                response_card_mercadopago(tokencard, payMethod, (float)Convert.ToInt32(payAmount), installmt);
            }
        }

        public object response_card_mercadopago(string tokencard, string payMethod, float payAmount, int installmt)
        {

            object payResult= null;

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
    }
}