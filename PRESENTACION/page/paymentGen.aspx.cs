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
using System.Configuration;
using Newtonsoft.Json;

namespace PRESENTACION.page
{
    public partial class paymentGen : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Page.IsPostBack == false)
            {
                if (Session["UserRump"] == null) Response.Redirect("~/InicioSesion");
                if (Session["solicitudPedido"] == null) Response.Redirect("~/Sistema#!/page/mantenimiento/mascota");
            }

            ESolicitud objPedido = new ESolicitud();
            objPedido = (ESolicitud)HttpContext.Current.Session["solicitudPedido"];

            //get params form
            float payAmount = (objPedido == null ? 0 : (float)objPedido.TOTAL);//Request.Form["transaction_amount"];
            var tokencard = Request.Form["token"];
            var payMethod = Request.Form["payment_method_id"];
            var docType = Request["docType"];
            var docNumber = Request["docNumber"];

            var installmt = 1;//Request.Form["installments"];***********cuotas

            if (tokencard != null && payMethod != null && payAmount != 0)
            {
                var p_email = Request.Form["email"];

                var rp_payment = response_pay_mp(payMethod, payAmount, p_email, objPedido.ID.ToString(), tokencard, installmt, docType, docNumber);
                PaymentStatus rp_respose = processPaymentResponse(rp_payment, objPedido.ID, p_email);

                if (rp_respose == MercadoPago.Common.PaymentStatus.approved || rp_respose == MercadoPago.Common.PaymentStatus.authorized)                 
                    Response.Redirect("~/pago_exitoso.aspx?vtoken=" + EUtil.getEncriptar(objPedido.ID.ToString()), true);
                else if (rp_respose == MercadoPago.Common.PaymentStatus.cancelled)
                    Response.Redirect("~/pago_error.aspx?vTipo=" + EUtil.getEncriptar("cancelled"), true);
                else if (rp_respose == MercadoPago.Common.PaymentStatus.cancelled)
                    Response.Redirect("~/pago_error.aspx?vTipo=" + EUtil.getEncriptar("rejected"), true);
                else if (rp_respose == MercadoPago.Common.PaymentStatus.rejected)
                    Response.Redirect("~/pago_error.aspx?vTipo=" + EUtil.getEncriptar("rejected"), true);
                else if (rp_respose == MercadoPago.Common.PaymentStatus.in_process)
                    Response.Redirect("~/pago_error.aspx?vTipo=" + EUtil.getEncriptar("in_process"), false);
            }
        }
        public PaymentStatus processPaymentResponse(dynamic payment, decimal numPedido, string p_email) {
            PaymentStatus result_estado;
            try
            {
                if (payment != null)
                {
                    ESolicitud objSol = new ESolicitud();
                    objSol.ID = numPedido;
                    EUsuario eUsuario = (EUsuario)HttpContext.Current.Session["userRump"];
                    objSol.USUARIO = eUsuario.ID;
                    
                    //Limpiando sesiones
                    HttpContext.Current.Session["solicitudPedido"] = null;
                    HttpContext.Current.Session["carritoMascota"] = null;

                    if (payment.Status == MercadoPago.Common.PaymentStatus.approved || payment.Status == MercadoPago.Common.PaymentStatus.authorized)
                    {
                        //Actualiza el estado de la solicitud a APROBADO
                        objSol.COMENTARIO = "approved::MercadoPago";
                        //Guardando datos pago
                        savePayDatabase(payment.TransactionAmount, payment.Card.LastFourDigits, numPedido, 2, JsonConvert.SerializeObject(payment), 1, p_email, "approved");
                        //Atendiendo solicitud
                        NSolicitud.AtenderSolicitud(objSol);
                        enviarMail(p_email, "aprobada", numPedido.ToString());
                    }
                    else if (payment.Status == MercadoPago.Common.PaymentStatus.cancelled)
                    {
                        //cancelado
                        //Actualiza el estado de la solicitud a ANULADO
                        objSol.COMENTARIO = "cancelled::MercadoPago";
                        NSolicitud.AnularSolicitud(objSol);
                    }
                    else if (payment.Status == MercadoPago.Common.PaymentStatus.cancelled)
                    {
                        //fallido
                        //Actualiza el estado de la solicitud a ANULADO
                        objSol.COMENTARIO = "rejected::MercadoPago";
                        NSolicitud.AnularSolicitud(objSol);
                    }
                    else if (payment.Status == MercadoPago.Common.PaymentStatus.rejected)
                    {
                        //fallido
                        //Actualiza el estado de la solicitud a ANULADO
                        objSol.COMENTARIO = "rejected::MercadoPago";
                        NSolicitud.AnularSolicitud(objSol);
                    }
                    else if (payment.Status == MercadoPago.Common.PaymentStatus.in_process)
                    {
                        //Caso particular de MercadoPago (pago pendiente de revision, se da hasta 6hrs para revision)
                        savePayDatabase(payment.TransactionAmount, payment.Card.LastFourDigits, numPedido, 2, JsonConvert.SerializeObject(payment), 2, p_email, "in_process");
                        enviarMail(p_email, "proceso", numPedido.ToString());
                    }
                    else {
                        //Error en la pasarela de pago. Intente nuevamente por favor
                        NMascota.log_error("Error en la pasarela de pago. Intente nuevamente por favor", "pago");
                    }
                }
                else
                {
                    NMascota.log_error("payment card", "pago");
                    //Response.Redirect("~/Sistema#!/page/pageError");
                    ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "Alerta", "alert('El pago no devolvió información')", true);
                }

                result_estado = payment.Status;
            }
            catch (Exception ex)
            {
                NMascota.log_error("payment card::" + (String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message), "pago");
                ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "Alerta", "alert('"+ (String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message) + "')", true);
                result_estado = 0;
            }

            return result_estado;
        }
        [WebMethod()]
        public static object getPedidoItemWM()
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("NS");
                    return objRespuesta;
                }

                //Get datos Pedido
                ESolicitud objPedido = new ESolicitud();
                objPedido = (ESolicitud)HttpContext.Current.Session["solicitudPedido"];

                ESolicitud objSolicitud = new ESolicitud();
                objSolicitud.ID = objPedido.ID;
                objSolicitud.OPCION = 7;
                objPedido = NSolicitud.listarPedidoxId(objSolicitud);

                if (objPedido.ID == 0)
                {
                    objRespuesta.Error("SR");
                }
                else
                {
                    HttpContext.Current.Session["solicitudPedido"] = objPedido;
                    objRespuesta.Resultado = objPedido;
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
        [WebMethod()]
        public static object response_pagoefectivo_mp(ESolicitud objPago)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("NS");
                    return objRespuesta;
                }

                //Validando AccessToken MP
                if (MercadoPago.SDK.AccessToken == null)
                    MercadoPago.SDK.AccessToken = ConfigurationManager.AppSettings.Get("ACCESS_TOKEN");

                //Get datos Pedido
                ESolicitud objPedido = new ESolicitud();
                objPedido = (ESolicitud)HttpContext.Current.Session["solicitudPedido"];

                ESolicitud objSolicitud = new ESolicitud();
                objSolicitud.ID = objPedido.ID;
                objSolicitud.OPCION = 7;
                objPedido = NSolicitud.listarPedidoxId(objSolicitud);

                //Pagando pagoefectivo
                float payAmount = (float)objPedido.TOTAL;
                var payment = response_pay_mp("pagoefectivo_atm", payAmount, objPedido.EMAIL, objPedido.ID.ToString());
                //Guardando pago
                savePayDatabase(payAmount, "", objPedido.ID, 2, JsonConvert.SerializeObject(payment), 2, objPago.EMAIL, "pending");
                //Enviando correo al cliente
                enviarMail(objPedido.EMAIL, "mercadopago", objPedido.ID.ToString());

                //Limpiando sesiones
                HttpContext.Current.Session["solicitudPedido"] = null;
                HttpContext.Current.Session["carritoMascota"] = null;

                objRespuesta.Resultado = payment;
            }
            catch (Exception ex)
            {
                NMascota.log_error("pagoefectivo::" + (String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message), "pago");
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
        private static int savePayDatabase(float total, string carnum, decimal solicitud_id, int opcion, string observacion, int estado, string mail, string vestado) {
            EUsuario eUsuario = (EUsuario)HttpContext.Current.Session["userRump"];
            EPago objPago = new EPago();
            objPago.USUARIO = eUsuario.ID;
            objPago.TOTAL = total;
            objPago.NUM_TARJETA = carnum;
            objPago.SOLICITUD_ID = solicitud_id;
            objPago.OPCION = opcion;
            objPago.OBSERVACION = observacion;
            objPago.ESTADO = estado;
            objPago.EMAIL = mail;
            objPago.vPARAM1 = vestado;
            return NPago.ActualizarPago(objPago);
        }
        public static int updatePayDatabase(decimal idPago,int opcion, string observacion, int estado, string vestado)
        {
            EUsuario eUsuario = (EUsuario)HttpContext.Current.Session["userRump"];
            EPago objPago = new EPago();
            objPago.USUARIO = eUsuario.ID;
            objPago.OPCION = opcion;
            objPago.OBSERVACION = observacion;
            objPago.ESTADO = estado;
            objPago.ID = idPago;
            objPago.vPARAM1 = vestado;
            return NPago.ActualizarPago(objPago);
        }
        public static object response_pay_mp(string payMethod, float payAmount, string email, string numPedido, string tokencard, int installmt, string docType, string docNumber)
        {
            object payResult = null;

            if (MercadoPago.SDK.AccessToken == null)
                MercadoPago.SDK.AccessToken = ConfigurationManager.AppSettings.Get("ACCESS_TOKEN");

            var payment = new Payment
            {
                TransactionAmount = payAmount,
                Token = tokencard,
                Installments = installmt,
                PaymentMethodId = payMethod,
                Description = "Pedido Rump: " + numPedido,
                ExternalReference = numPedido,

                Payer = new Payer
                {
                    Email = email,
                    Identification = new Identification()
                    {
                        Type = docType,
                        Number = docNumber
                    }
                }
            };


            try
            {
                payment .Save();
                payResult = payment;
            }
            catch (Exception)
            {
                payResult = payment.Status;
            }

            return payResult;
        }
        public static object response_pay_mp(string payMethod, float payAmount, string email, string numPedido)
        {
            object payResult = null;

            if (MercadoPago.SDK.AccessToken == null)
                MercadoPago.SDK.AccessToken = ConfigurationManager.AppSettings.Get("ACCESS_TOKEN");

            var payment = new Payment
            {
                TransactionAmount = payAmount,
                PaymentMethodId = payMethod,//"pagoefectivo_atm",
                Description = "Pedido Rump: " + numPedido,
                ExternalReference = numPedido,

                Payer = new Payer
                {
                    Email = email
                },
            };

            payment.Save();
            payResult = payment;

            return payResult;
        }
        public static void enviarMail(string p_para, string p_tipo, string p_adicional) {
            ECorreo correo = new ECorreo();

            var p_asunto = "";
            var mensaje = "<h4>¡Saludos desde RUMP!</h4>";
            
            switch (p_tipo)
            {
                case "aprobada":
                    p_asunto = "Solicitud aprobada";
                    mensaje += "<p>Su solicitud ha sido procesada con éxito, de ser necesario nos pondremos en contacto con usted para coordinar la entrega.</p><h4>Equipo RUMP</h4>";
                    break;
                case "proceso":
                    p_asunto = "Solicitud en proceso";
                    mensaje += "<p>Su solicitud está siendo procesada, su banco puede tardar algunos días para confirmar el pago. Si tiene alguna consulta no dude en contactarse con nosotros.</p><h4>Equipo RUMP</h4>";
                    break;
                case "cancelada":
                    p_asunto = "Solicitud cancelada";
                    mensaje += "<p>Su solicitud fue cancelada, no se pudo confirmar el pago.</p><h4>Equipo RUMP</h4>";
                    break;
                case "mercadopago":
                    p_asunto = "Pago pendiente";
                    mensaje += "<p>Su solicitud está siendo procesada, deberá acercarse al banco y brindar el código de Pago en efectivo.</p><h4>Equipo RUMP</h4>";
                    break;
                default:
                    break;
            }

            correo.Para = p_para;
            correo.Asunto = p_asunto;
            correo.Mensaje = mensaje;
            try
            {
                //correo.Enviar();
            }
            catch (Exception ex)
            {
                NMascota.log_error("pagoefectivo::" + (String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message), "pago");
            }
            
        }
    }
}