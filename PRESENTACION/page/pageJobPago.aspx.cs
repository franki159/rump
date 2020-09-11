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
using Newtonsoft.Json;
using System.Net.Http;
using System.Configuration;
using MercadoPago;
using MercadoPago.Resources;
using MercadoPago.DataStructures.Payment;
using MercadoPago.Common;
using MercadoPago.DataStructures.Preference;

namespace PRESENTACION.page
{
    public partial class pageJobPago : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                //obteniendo pagos pendientes
                List<EPago> lpagosPendientes = new List<EPago>();
                lpagosPendientes = NPago.listarPagosPendientes();
                var str_mensaje = "";

                str_mensaje += DateTime.Now.ToString();

                foreach (EPago item in lpagosPendientes)
                {
                    dynamic payment_response;
                    try
                    {
                        payment_response = JsonConvert.DeserializeObject(item.OBSERVACION);
                    }
                    catch (Exception ex)
                    {
                        payment_response = null;
                        NMascota.log_error("job_ProcessPendingPayments::" + (String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message), "obj_pago");
                    }
                    
                    if (payment_response != null)
                    {
                        var payment_id = payment_response["Id"].Value;
                        //Obteniendo estado del pago
                        var result_payment = get_pay_mp(payment_id);
                        processPaymentResponse(result_payment, item.SOLICITUD_ID, item.ID, item.EMAIL);
                        str_mensaje += item.SOLICITUD_ID + "::" + payment_id + "::" + result_payment.StatusDetail + "<br>";
                    }
                }

                str_mensaje += DateTime.Now.ToString();
                bodyProcesos.InnerHtml = str_mensaje;
            }
            catch (Exception ex)
            {
                NMascota.log_error("job_ProcessPendingPayments::" + (String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message), "obj_pago");
            }
        }

        public void processPaymentResponse(dynamic payment, decimal numPedido, decimal idPago, string p_email)
        {
            try
            {
                if (payment != null)
                {
                    int objResultado = 0;
                    ESolicitud objSol = new ESolicitud();
                    objSol.ID = numPedido;

                    switch (payment.Status)
                    {
                        case MercadoPago.Common.PaymentStatus.approved:
                        case MercadoPago.Common.PaymentStatus.authorized:
                            //Actualiza el estado de la solicitud a APROBADO
                            objSol.COMENTARIO = "approved::MercadoPago";
                            objResultado = NSolicitud.AtenderSolicitud(objSol);
                            paymentGen.updatePayDatabase(idPago, 4, "", 1, "approved");
                            paymentGen.enviarMail(p_email, "aprobada", numPedido.ToString());
                            break;
                        case MercadoPago.Common.PaymentStatus.cancelled:
                            //cancelado
                            //Actualiza el estado de la solicitud a ANULADO
                            objSol.COMENTARIO = "cancelled::MercadoPago";
                            objResultado = NSolicitud.AnularSolicitud(objSol);
                            paymentGen.updatePayDatabase(idPago, 4, "", 0, "cancelled");
                            paymentGen.enviarMail(p_email, "cancelada", numPedido.ToString());
                            break;
                        case MercadoPago.Common.PaymentStatus.rejected:
                            //fallido
                            //Actualiza el estado de la solicitud a ANULADO
                            objSol.COMENTARIO = "rejected::MercadoPago";
                            objResultado = NSolicitud.AnularSolicitud(objSol);
                            paymentGen.updatePayDatabase(idPago, 4, "", 0, "cancelled");
                            paymentGen.enviarMail(p_email, "cancelada", numPedido.ToString());
                            break;
                        case MercadoPago.Common.PaymentStatus.in_process:
                            //Caso particular de MercadoPago (pago pendiente de revision, se da hasta 6hrs para revision)
                            break;
                        case null:
                            //Error en la pasarela de pago. Intente nuevamente por favor
                            NMascota.log_error("Error en la pasarela de pago. Intente nuevamente por favor", "pago");
                            break;
                        default:
                            break;
                    }
                }
                else
                {
                    NMascota.log_error("payment card", "pago");
                }
            }
            catch (Exception ex)
            {
                NMascota.log_error("payment card::" + (String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message), "pago");
            }

        }

        [WebMethod()]
        public static object get_pay_mp(object id)
        {
            if (MercadoPago.SDK.AccessToken == null)
                MercadoPago.SDK.AccessToken = ConfigurationManager.AppSettings.Get("ACCESS_TOKEN");
            if (MercadoPago.SDK.ClientId == null)
                MercadoPago.SDK.ClientId = ConfigurationManager.AppSettings.Get("CLIENT_ID");
            if (MercadoPago.SDK.ClientSecret == null)
                MercadoPago.SDK.ClientSecret = ConfigurationManager.AppSettings.Get("CLIENT_SECRET");

            var result = Payment.FindById((long)id);
            return result;
        }
    }

    
}