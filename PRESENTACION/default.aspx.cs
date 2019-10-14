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
            //if (Session["UserData"] == null) Response.Redirect("~/login.aspx");
        }

        [WebMethod()]
        public static object InfoSesionWM(EUsuario objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();

            try
            {
                //if (HttpContext.Current.Session["UserData"] == null)
                //{
                //    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                //}
                EUsuario objResultado = new EUsuario();
                //EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];
                //objE.ID_LOCAL = eSession.LOCAL.ID_LOCAL;
                //objE.ID = Convert.ToInt32(EUtil.desencriptaPHP("rumpWorldPets20603922990", "usuarioSesion", objE.IDENCRIPT));

                objResultado = NUsuario.ListarUsuarios(objE);
                if (objResultado.PERFIL_ID == 0)
                {
                    objRespuesta.Error("No se encontraron registros.");
                }
                else
                {
                    objResultado.ID = objE.ID;
                    HttpContext.Current.Session["userRump"] = objResultado;
                    objRespuesta.Resultado = objResultado;
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }

            return objRespuesta;
        }
    }
}