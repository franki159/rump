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
                if (Session["UserRump"] == null) Response.Redirect("~/InicioSesion");
            }
            ESolicitud objPedido = new ESolicitud();
            objPedido = (ESolicitud)HttpContext.Current.Session["solicitudPedido"];

            //get params form
            float payAmount = (float)objPedido.TOTAL;//Request.Form["transaction_amount"];
            var tokencard = Request.Form["token"];
            var payMethod = Request.Form["payment_method_id"];
            
            var installmt = 1;//Request.Form["installments"];***********cuotas

            if (tokencard != null && payMethod != null && payAmount != 0)
            {
                var p_email = Request.Form["email"];

                var rp_payment = response_card_mp(tokencard, payMethod, payAmount, installmt, p_email, objPedido.ID.ToString());
                processPaymentResponse(rp_payment, objPedido.ID.ToString());
            }
        }
        public object response_card_mp(string tokencard, string payMethod, float payAmount, int installmt, string email, string numPedido)
        {
            object payResult = null;

            //MercadoPago.SDK.SetAccessToken("TEST-3603622080694099-071517-bee1bd3569411ac4d402e97b83c04cf9-334567666");
            //MercadoPago.SDK.SetAccessToken("TEST-3603622080694099-071517-bee1bd3569411ac4d402e97b83c04cf9-334567666");

            //MercadoPago.SDK.ClientId = "3603622080694099";
            //MercadoPago.SDK.ClientSecret = "dMQJoxgQbagyNwqw0xuVMOrFfVHViVxY";
            if (MercadoPago.SDK.AccessToken == null)
            {
                MercadoPago.SDK.AccessToken = "TEST-3603622080694099-071517-bee1bd3569411ac4d402e97b83c04cf9-334567666";
            }
            //MercadoPago.SDK.AccessToken = "TEST-3603622080694099-071517-bee1bd3569411ac4d402e97b83c04cf9-334567666";

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
                    Email = email//,
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
        public void processPaymentResponse(dynamic payment, string numPedido) {
            try
            {
                if (payment != null)
                {
                    int objResultado = 0;
                    ESolicitud objSol = new ESolicitud();
                    objSol.ID = Convert.ToDecimal(numPedido);
                    EUsuario eUsuario = (EUsuario)HttpContext.Current.Session["userRump"];
                    objSol.USUARIO = eUsuario.ID;

                    EPago objPago = new EPago();
                    objPago.USUARIO = eUsuario.ID;
                    objPago.TOTAL = payment.TransactionAmount;
                    objPago.NUM_TARJETA = payment.Card.LastFourDigits;
                    objPago.SOLICITUD_ID = Convert.ToDecimal(numPedido);
                    objPago.OPCION = 2;

                    //Limpiando sesiones
                    HttpContext.Current.Session["solicitudPedido"] = null;
                    HttpContext.Current.Session["carritoMascota"] = null;

                    switch (payment.Status)
                    {
                        case MercadoPago.Common.PaymentStatus.approved:
                        case MercadoPago.Common.PaymentStatus.authorized:
                            //Actualiza el estado de la solicitud a APROBADO
                            objSol.COMENTARIO = "approved::MercadoPago";
                            objResultado = NSolicitud.AtenderSolicitud(objSol);
                            //Guardando datos pago
                            objPago.OBSERVACION = "approved::MercadoPago";
                            objPago.ESTADO = 1;
                            NPago.ActualizarPago(objPago);
                            Response.Redirect("~/pago_exitoso.aspx");
                            break;
                        case MercadoPago.Common.PaymentStatus.cancelled:
                            //cancelado
                            //Actualiza el estado de la solicitud a ANULADO
                            objSol.COMENTARIO = "cancelled::MercadoPago";
                            objResultado = NSolicitud.AnularSolicitud(objSol);
                            Response.Redirect("~/pago_error.aspx?vTipo=" + EUtil.getEncriptar("cancelled"));
                            break;
                        case MercadoPago.Common.PaymentStatus.rejected:
                            //fallido
                            //Actualiza el estado de la solicitud a ANULADO
                            objSol.COMENTARIO = "rejected::MercadoPago";
                            objResultado = NSolicitud.AnularSolicitud(objSol);
                            Response.Redirect("~/pago_error.aspx?vTipo=" + EUtil.getEncriptar("rejected"));
                            break;
                        case MercadoPago.Common.PaymentStatus.in_process:
                            //Caso particular de MercadoPago (pago pendiente de revision, se da hasta 6hrs para revision)
                            objPago.ESTADO = 2;
                            NPago.ActualizarPago(objPago);
                            Response.Redirect("~/pago_error.aspx?vTipo=" + EUtil.getEncriptar("in_process"));
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
                    Response.Redirect("~/Sistema#!/page/pageError");
                }
            }
            catch (Exception ex)
            {
                NMascota.log_error("payment card::" + (String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message), "pago");
            }
            
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
        public static object response_pagoefectivo_mp()
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
                if (MercadoPago.SDK.AccessToken == null)
                {
                    MercadoPago.SDK.AccessToken = "TEST-3603622080694099-071517-bee1bd3569411ac4d402e97b83c04cf9-334567666";
                }
                //Get datos Pedido
                ESolicitud objPedido = new ESolicitud();
                objPedido = (ESolicitud)HttpContext.Current.Session["solicitudPedido"];

                ESolicitud objSolicitud = new ESolicitud();
                objSolicitud.ID = objPedido.ID;
                objSolicitud.OPCION = 7;
                objPedido = NSolicitud.listarPedidoxId(objSolicitud);

                //get params form
                float payAmount = (float)objPedido.TOTAL;

                var payment = new Payment
                {
                    TransactionAmount = payAmount,
                    PaymentMethodId = "pagoefectivo_atm",
                    Description = "Pedido Rump: " + objPedido.ID.ToString(),
                    ExternalReference = objPedido.ID.ToString(),

                    Payer = new Payer
                    {
                        Email = objPedido.EMAIL
                    },
                };
              
                payment.Save();
                objRespuesta.Resultado = payment;

                //Limpiando sesiones
                HttpContext.Current.Session["solicitudPedido"] = null;
                HttpContext.Current.Session["carritoMascota"] = null;

                //Guardando pago
                EUsuario eUsuario = (EUsuario)HttpContext.Current.Session["userRump"];
                EPago objPago = new EPago();
                objPago.USUARIO = eUsuario.ID;
                objPago.TOTAL = payAmount;
                objPago.NUM_TARJETA = "";
                objPago.SOLICITUD_ID = objPedido.ID;
                objPago.OPCION = 2;
                objPago.OBSERVACION = "approved::MercadoPago";
                objPago.ESTADO = 1;
                NPago.ActualizarPago(objPago);
            }
            catch (Exception ex)
            {
                NMascota.log_error("pagoefectivo::" + (String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message), "pago");
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
        [WebMethod()]
        public static object job_ProcessPendingPayments()
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                //obteniendo pagos pendientes





                //Get datos Pedido
                if (MercadoPago.SDK.AccessToken == null)
                {
                    MercadoPago.SDK.AccessToken = "TEST-3603622080694099-071517-bee1bd3569411ac4d402e97b83c04cf9-334567666";
                }
                //Get datos Pedido
                ESolicitud objPedido = new ESolicitud();
                objPedido = (ESolicitud)HttpContext.Current.Session["solicitudPedido"];

                ESolicitud objSolicitud = new ESolicitud();
                objSolicitud.ID = objPedido.ID;
                objSolicitud.OPCION = 7;
                objPedido = NSolicitud.listarPedidoxId(objSolicitud);

                //get params form
                float payAmount = (float)objPedido.TOTAL;

                var payment = new Payment
                {
                    TransactionAmount = payAmount,
                    PaymentMethodId = "pagoefectivo_atm",
                    Description = "Pedido Rump: " + objPedido.ID.ToString(),
                    ExternalReference = objPedido.ID.ToString(),

                    Payer = new Payer
                    {
                        Email = objPedido.EMAIL
                    },
                };

                payment.Save();
                objRespuesta.Resultado = payment;

                //Limpiando sesiones
                HttpContext.Current.Session["solicitudPedido"] = null;
                HttpContext.Current.Session["carritoMascota"] = null;
            }
            catch (Exception ex)
            {
                NMascota.log_error("pagoefectivo::" + (String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message), "pago");
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
    }
}