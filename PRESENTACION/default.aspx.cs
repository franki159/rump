using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using ENTIDAD;
using NEGOCIOS;

namespace PRESENTACION
{
    public partial class _default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Page.IsPostBack == false)
            {

                if (Session["UserRump"] == null) Response.Redirect("~/login.aspx");
            }
        }

        [WebMethod()]
        public static object InfoSesionWM()
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();

            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("No se encontraron registros.");
                }
                else
                {
                    EUsuario eSession = (EUsuario)HttpContext.Current.Session["userRump"];

                    EEvento objEvento = new EEvento() { USUARIO_ID = eSession.ID };
                    eSession.EVENTOS = NEvento.listarEventoNotificacion(objEvento);

                    objRespuesta.Resultado = eSession;
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }

            return objRespuesta;
        }

        [WebMethod()]
        public static object CerrarSesionWM()
        {
            HttpContext.Current.Session.Clear();

            ERespuestaJson objRespuesta = new ERespuestaJson();
            objRespuesta.Resultado = "login.aspx";
            return objRespuesta;
        }

        [WebMethod()]
        public static object EventoNotificaWM(EEvento objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();

            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                }
                else
                {

                    if (NEvento.ActualizarEventoNotificacion(objE) <= 0)
                    {
                        objRespuesta.Error("No se pudo actualizar.");
                    }
                    else
                    {
                        objRespuesta.Success("Se actualizo la información correctamente");
                    }
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }

            return objRespuesta;
        }

        [WebMethod()]
        public static object listarParametroGrupo(EParametro objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }
                List<EParametro> objResultado = new List<EParametro>();
                //EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];
                objResultado = NParametro.listarParametroGrupo(objE);
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
    }
}