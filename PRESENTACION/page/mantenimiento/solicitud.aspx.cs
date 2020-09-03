using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.IO;
using ENTIDAD;
using NEGOCIOS;

namespace PRESENTACION.page.mantenimiento
{
    public partial class solicitud : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Page.IsPostBack == false)
            {
                if (Session["userRump"] == null) Response.Redirect("~/InicioSesion");
            }
        }
        [WebMethod()]
        public static object addCarritoItemWM(ESolicitud objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }
                //*************** Validando items anteriores ***************
                if (HttpContext.Current.Session["carritoMascota"] == null)//nuevo item
                {
                    List<ESolicitud> carritoMascota = new List<ESolicitud>();
                    carritoMascota.Add(NSolicitud.listarServicioxId(objE));
                    HttpContext.Current.Session["carritoMascota"] = carritoMascota;
                    objRespuesta.Resultado = carritoMascota;
                }
                else
                {
                    List<ESolicitud> carritoMascota = new List<ESolicitud>((List<ESolicitud>)HttpContext.Current.Session["carritoMascota"]);
                    ESolicitud itemCarrito = NSolicitud.listarServicioxId(objE);
                    bool itemEncontrado = false;

                    foreach (ESolicitud item in carritoMascota)
                    {
                        if (item.ID == itemCarrito.ID && item.ID_MSC_ENCRIP == (itemCarrito.TIPO == "mascota" ? item.ID_MSC_ENCRIP : item.ID_MSC_ENCRIP))
                        {
                            item.CANTIDAD += 1;
                            itemEncontrado = true;
                        }
                    }
                    
                    if (itemEncontrado == false)
                    {
                        carritoMascota.Add(itemCarrito);
                    }
                    
                    HttpContext.Current.Session["carritoMascota"] = carritoMascota;

                    if (carritoMascota == null || carritoMascota.Count == 0)
                    {
                        objRespuesta.Error("SR");
                    }
                    else
                    {
                        objRespuesta.Resultado = carritoMascota;
                    }
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
        [WebMethod()]
        public static object delCarritoItemWM(ESolicitud objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }
                //*************** Validando items anteriores ***************
                if (HttpContext.Current.Session["carritoMascota"] == null)
                {
                    objRespuesta.Error("No existen items");
                }
                else
                {
                    List<ESolicitud> carritoMascota = new List<ESolicitud>((List<ESolicitud>)HttpContext.Current.Session["carritoMascota"]);
                    ESolicitud itemCarrito = NSolicitud.listarServicioxId(objE);
                    ESolicitud itemEncontrado = null;

                    foreach (ESolicitud item in carritoMascota)
                    {
                        if (item.ID == itemCarrito.ID && item.ID_MSC_ENCRIP == (itemCarrito.TIPO == "mascota" ? item.ID_MSC_ENCRIP : item.ID_MSC_ENCRIP))
                        {
                            if (objE.OPCION == 1)
                            {
                                if (item.CANTIDAD == 1)
                                    itemEncontrado = item;
                                else 
                                    item.CANTIDAD -= 1;
                            }
                            else if(objE.OPCION == 2) {
                                itemEncontrado = item;
                            }
                        }
                    }

                    if (itemEncontrado != null)
                    {
                        carritoMascota.Remove(itemEncontrado);
                    }                    

                    HttpContext.Current.Session["carritoMascota"] = carritoMascota;

                    if (carritoMascota == null || carritoMascota.Count == 0)
                    {
                        objRespuesta.Error("SR");
                    }
                    else
                    {
                        objRespuesta.Resultado = carritoMascota;
                    }
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
        [WebMethod()]
        public static object getCarritoItemWM()
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("NS");
                    return objRespuesta;
                }

                List<ESolicitud> objResultado = new List<ESolicitud>();
                objResultado = (List<ESolicitud>)HttpContext.Current.Session["carritoMascota"];

                if (objResultado == null || objResultado.Count == 0)
                {
                    objRespuesta.Error("SR");
                }
                else
                {
                    objRespuesta.Resultado = objResultado;
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
        [WebMethod()]
        public static object getDeliveryWM(ESolicitud objE) {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("NS");
                    return objRespuesta;
                }

                List<ESolicitud> objCarrito = new List<ESolicitud>();
                objCarrito = (List<ESolicitud>)HttpContext.Current.Session["carritoMascota"];
                var precioDelivery = NSolicitud.getDelivery(objE);

                if (objCarrito == null || objCarrito.Count == 0)
                {
                    objRespuesta.Error("SR");
                }
                else
                {
                    objRespuesta.Resultado = new
                    {
                        Carrito = objCarrito,
                        Envio = precioDelivery
                    };
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
        [WebMethod()]
        public static object guardarPedidoWM(ESolicitud objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null || HttpContext.Current.Session["carritoMascota"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }

                List<ESolicitud> carritoMascota = new List<ESolicitud>((List<ESolicitud>)HttpContext.Current.Session["carritoMascota"]);

                //Cabecera
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["userRump"];
                objE.USUARIO_ID = eSession.ID;
                //Detalle
                string bodyDetalle = "";
                double pTotal = 0;
                decimal objResultado = 0;
                foreach (ESolicitud item in carritoMascota)
                {
                    pTotal += Convert.ToDouble(item.PRECIO * item.CANTIDAD);
                    bodyDetalle += item.ID + "," + item.CANTIDAD + "," + (item.ID_MSC_ENCRIP== null ? "": EUtil.getDesencriptar(item.ID_MSC_ENCRIP)) + "|";
                }

                objE.TOTAL = pTotal;
                objE.vPARAM1 = bodyDetalle;
                objResultado = NSolicitud.guardarServicioWM(objE);

                ESolicitud objPedido = new ESolicitud();
                objPedido.ID = objResultado;
                HttpContext.Current.Session["solicitudPedido"] = objPedido;

                if (objResultado == 0)
                {
                    objRespuesta.Error("No se pudo realizar la solicitud.");
                }
                else
                {
                    objRespuesta.Success("Se realizó la solicitud correctamente");
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
        [WebMethod()]
        public static object ListaSolicitudWM(ESolicitud objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }

                List<ESolicitud> objResultado = new List<ESolicitud>();
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["userRump"];
                objE.USUARIO = eSession.ID;
                objResultado = NSolicitud.listarSolicitud(objE);

                if (objResultado.Count == 0)
                {
                    objRespuesta.Error("No se encontraron registros.");
                }
                else
                {
                    objRespuesta.Resultado = objResultado;
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
        [WebMethod()]
        public static object ListaSolicitudxIdWM(ESolicitud objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }

                ESolicitud objResultado = new ESolicitud();
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["userRump"];
                objE.USUARIO = eSession.ID;
                objE.ID = Convert.ToDecimal(EUtil.getDesencriptar(objE.SOLICITUD_ID_ENCRIP));
                objE.OPCION = 5;
                objResultado = NSolicitud.listarSolicitudxId(objE);

                if (objResultado.ID_ENCRIP == "")
                {
                    objRespuesta.Error("No se encontraron registros.");
                }
                else
                {
                    objRespuesta.Resultado = objResultado;
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
        [WebMethod()]
        public static object ListaServicioXmascotaWM(ESolicitud objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }

                List<ESolicitud> objResultado = new List<ESolicitud>();

                objResultado = NSolicitud.listarServicioXmascota(objE);

                if (objResultado.Count == 0)
                {
                    objRespuesta.Error("No se encontraron registros.");
                }
                else
                {
                    objRespuesta.Resultado = objResultado;
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
        [WebMethod()]
        public static object ListaServicioWM()
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }

                List<ESolicitud> objResultado = new List<ESolicitud>();

                objResultado = NSolicitud.listarServicio();

                if (objResultado.Count == 0)
                {
                    objRespuesta.Error("No se encontraron registros.");
                }
                else
                {
                    objRespuesta.Resultado = objResultado;
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
        [WebMethod()]
        public static object AtenderSolicitudWM(ESolicitud objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }

                int objResultado = 0;
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["userRump"];
                objE.USUARIO = eSession.ID;
                objE.ID = Convert.ToDecimal(EUtil.getDesencriptar(objE.ID_ENCRIP));
                objResultado = NSolicitud.AtenderSolicitud(objE);

                if (objResultado == 0)
                {
                    objRespuesta.Error("No se pudo atender.");
                }
                else
                {
                    objRespuesta.Success("Se atendió la solicitud correctamente");
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
        [WebMethod()]
        public static object AnularSolicitudWM(ESolicitud objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }

                int objResultado = 0;
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["userRump"];
                objE.USUARIO = eSession.ID;
                objE.ID = Convert.ToDecimal(EUtil.getDesencriptar(objE.ID_ENCRIP));
                objResultado = NSolicitud.AnularSolicitud(objE);

                if (objResultado == 0)
                {
                    objRespuesta.Error("No se pudo eliminar.");
                }
                else
                {
                    objRespuesta.Success("Se eliminó la solicitud correctamente");
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
        [WebMethod()]
        public static object ActualizarSolicitudWM(ESolicitud objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }

                int objResultado = 0;
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["userRump"];
                objE.USUARIO = eSession.ID;
                objResultado = NSolicitud.ActualizarSolicitud(objE);

                if (objResultado == 0)
                {
                    objRespuesta.Error("No se pudo actualizar.");
                }
                else
                {
                    objRespuesta.Success("Se eliminó la solicitud correctamente");
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
        [WebMethod()]
        public static object LiberarSolicitud(ESolicitud objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }

                int objResultado = 0;
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["userRump"];
                objE.USUARIO = eSession.ID;
                objResultado = NSolicitud.LiberarSolicitud(objE);

                if (objResultado == 0)
                {
                    objRespuesta.Error("No se pudo eliminar.");
                }
                else
                {
                    objRespuesta.Success("Se eliminó la solicitud correctamente");
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }

    }
}