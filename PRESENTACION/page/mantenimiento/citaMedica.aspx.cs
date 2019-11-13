using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using ENTIDAD;
using NEGOCIOS;

namespace PRESENTACION.page.mantenimiento
{
    public partial class citaMedica : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Page.IsPostBack == false)
            {
                if (Session["userRump"] == null) Response.Redirect("~/login.aspx");
            }
        }

        [WebMethod()]
        public static object ActualizarClinicaCitaWM(EClinica objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }

                decimal objResultado = 0;
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["userRump"];
                objE.USUARIO_ID = eSession.ID;
                objResultado = NClinica.ActualizarClinicaCitaWM(objE);

                if (objResultado == 0)
                {
                    objRespuesta.Error("No se pudo registrar.");
                }
                else
                {
                    objRespuesta.Resultado = objResultado;
                    objRespuesta.Success("Se registró la clínica correctamente");
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }

        [WebMethod()]
        public static object ActualizarMedicoCitaWM(EMedico objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }

                decimal objResultado = 0;
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["userRump"];
                objE.USUARIO_ID = eSession.ID;
                objResultado = NMedico.ActualizarMedicoCitaWM(objE);

                if (objResultado == 0)
                {
                    objRespuesta.Error("No se pudo registrar.");
                }
                else
                {
                    objRespuesta.Resultado = objResultado;
                    objRespuesta.Success("Se registró el medico correctamente");
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
        [WebMethod()]
        public static object ActualizarCitaWM(ECita objE)
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
                objResultado = NCita.ActualizarCitaWM(objE);

                if (objResultado == 0)
                {
                    objRespuesta.Error("No se pudo registrar.");
                }
                else
                {
                    objRespuesta.Success("Se registró la cita correctamente");
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