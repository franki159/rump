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

namespace PRESENTACION.page
{
    public partial class pagoSolicitud : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Page.IsPostBack == false)
            {
                if (Session["UserRump"] == null) Response.Redirect("~/pagoSolicitudSesion");
            }
        }

        [WebMethod()]
        public static object ObtenerCuentaWM()
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }

                EUsuario eUsuario = (EUsuario)HttpContext.Current.Session["userRump"];

                EUsuario objE = new EUsuario();
                objE.ID_ENCRIP = EUtil.getEncriptar(eUsuario.ID.ToString());

                EUsuario objResultado = NUsuario.ObtenerUsuario(objE);

                objRespuesta.Resultado = objResultado;
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }

        [WebMethod()]
        public static object ActualizarCuentaWM(EUsuario objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }

                EUsuario eUsuario = (EUsuario)HttpContext.Current.Session["userRump"];

                objE.ID_ENCRIP = EUtil.getEncriptar(eUsuario.ID.ToString());

                string objResultado = "";

                if (NUsuario.ActualizarBasicoUsuario(objE) > 0)
                {
                    objResultado = objE.ID_ENCRIP;
                }

                if (objResultado == "")
                {
                    objRespuesta.Error("No se pudo actualizar.");
                }
                else
                {
                    objRespuesta.Resultado = objResultado;
                    objRespuesta.Success("Se guardó la información correctamente");
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }

        [WebMethod()]
        public static object InsertarFotoCuentaWM(EUsuario objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }

                string objResultado = "";
                objE.FOTO = objE.EXTENSION;
                objResultado = NUsuario.ActualizarFotoUsuario(objE);

                if (objResultado == "")
                {
                    objRespuesta.Error("No se pudo actualizar.");
                }
                else
                {
                    objRespuesta.Resultado = objResultado;
                    objRespuesta.Success("Se guardó la información correctamente");
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