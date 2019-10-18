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
                    objRespuesta.Resultado = HttpContext.Current.Session["userRump"];
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
    }
}