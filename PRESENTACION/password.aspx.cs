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
    public partial class password : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                try
                {
                    string cadena = HttpContext.Current.Request.Url.AbsoluteUri;
                    cadena = cadena.Substring(cadena.IndexOf("=") + 1, cadena.Length - cadena.IndexOf("=") - 1);

                    txtEmail.Value = cadena;
                }
                catch
                {
                    txtEmail.Value = "";
                }
            }
        }

        [WebMethod()]
        public static object IniciarWM(string usuario)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                /*Valida usuario*/
                if (usuario == "" || usuario == "0")
                {
                    objRespuesta.Error("No se logro identificar al usuario");
                }
                else
                {
                    EUsuario eUsuario = new EUsuario();
                    eUsuario.ID_ENCRIP = usuario;
                    eUsuario = NUsuario.ObtenerUsuario(eUsuario);

                    if (eUsuario == null)
                    {
                        objRespuesta.Error("No se logro identificar el usuario");
                    }
                    else if (eUsuario.TOKEN_PASSWORD != usuario)
                    {
                        objRespuesta.Error("Contraseña ya fue reestablecida en otro momento");
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
        public static object CambiarWM(string usuario, string clave)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                /*Valida usuario*/
                EUsuario eUsuario = new EUsuario();
                eUsuario.ID_ENCRIP = usuario.Trim();
                eUsuario.PASSWORD = clave.Trim();
                int objResultado = NUsuario.CambiarClaveUsuario(eUsuario);

                if (objResultado == 0)
                {
                    objRespuesta.Error("No se logro cambiar la contraseña del usuario");
                }
                else
                {
                    objRespuesta.Mensaje = "Se cambio satisfactoriamente la contraseña";
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