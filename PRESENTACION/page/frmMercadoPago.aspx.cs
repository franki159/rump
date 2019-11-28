using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using MercadoPago;
using MercadoPago.Resources;
using MercadoPago.DataStructures.Payment;
using MercadoPago.Common;

namespace PRESENTACION.page
{
    public partial class frmMercadoPago : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            MercadoPago.SDK.ClientId = "YOUR_CLIENT_ID";

            MercadoPago.SDK.ClientSecret = "YOUR_CLIENT_SECRET";
            MercadoPago.SDK.AccessToken = "ENV_ACCESS_TOKEN";
            Payment payment = new Payment
            {
                TransactionAmount = (float)100.0,
                Token = "YOUR_CARD_TOKEN",
                Description = "Ergonomic Silk Shirt",
                PaymentMethodId = "visa",
                Installments = 1,
                Payer = new Payer
                {
                    Email = "larue.nienow@hotmail.com"
                }
            };

            payment.Save();

            Console.Out.WriteLine(payment.Status);
        }
    }
}