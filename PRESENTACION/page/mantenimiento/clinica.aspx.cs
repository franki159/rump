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
using iTextSharp.text;
using iTextSharp.text.pdf;

namespace PRESENTACION.page.mantenimiento
{
    public partial class clinica : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Page.IsPostBack == false)
            {
                if (Session["userRump"] == null) Response.Redirect("~/login.aspx");
            }
        }

        [WebMethod()]
        public static object ListaClinicaWM(EClinica objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }

                List<EClinica> objResultado = new List<EClinica>();
                //EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];
                objResultado = NClinica.listarClinica(objE);
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
        public static object ObtenerClinicaWM(EClinica objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }

                EClinica objResultado = new EClinica();
                objE.OPCION = 4;
                objResultado = NClinica.ObtenerClinica(objE);
                objRespuesta.Resultado = objResultado;
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }

        [WebMethod()]
        public static object AnularClinicaWM(EClinica objE)
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
                objE.USUARIO_ID = eSession.ID;
                objE.OPCION = 5;
                objResultado = NClinica.actualizarConvenio(objE);

                if (objResultado == 0)
                {
                    objRespuesta.Error("No se pudo eliminar.");
                }
                else
                {
                    objRespuesta.Success("Se eliminó el convenio correctamente");
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
        [WebMethod()]
        public static object ActualizarClinicaWM(EClinica objE)
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
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["userRump"];
                objE.USUARIO_ID = eSession.ID;
                if (objE.ID_ENCRIP == "")
                {
                    objE.OPCION = 3;
                }
                else
                {
                    objE.OPCION = 4;
                }

                objResultado = NClinica.actualizarConvenio(objE).ToString();

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