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
    public partial class raza : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Page.IsPostBack == false)
            {
                if (Session["userRump"] == null) Response.Redirect("~/InicioSesion");
            }
        }

        [WebMethod()]
        public static object ListaRazaWM(ERaza objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }

                List<ERaza> objResultado = new List<ERaza>();
                objResultado = NRaza.listarRaza(objE);

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
        public static object ActualizarRazaWM(ERaza objE)
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
                if (objE.ID_ENCRIP.Trim() == "")
                    objE.OPCION = 2;
                else
                    objE.OPCION = 3;
                objResultado = NRaza.actualizarRaza(objE);
                if (objResultado <= 0)
                {
                    objRespuesta.Error("No se realizaron cambios.");
                }
                else
                {
                    objRespuesta.Success("Se guardó satisfactoriamente la raza");
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
        [WebMethod()]
        public static object ObtenerRazaWM(ERaza objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();

            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }
                objRespuesta.Resultado = NRaza.obtenerRaza(objE).ToList();
            }
            catch (Exception ex)
            {
                objRespuesta.Error(string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }

            return objRespuesta;
        }
        [WebMethod()]
        public static object AnularRazaWM(ERaza objE)
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
                objE.OPCION = 4;

                objResultado = NRaza.actualizarRaza(objE);
                if (objResultado <= 0)
                {
                    objRespuesta.Error("No se realizaron cambios.");
                }
                else
                {
                    objRespuesta.Success("Se eliminó satisfactoriamente la raza");
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