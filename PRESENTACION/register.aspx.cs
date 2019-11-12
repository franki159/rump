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
    public partial class register : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod()]
        public static object AccederWM(string usuario, string clave)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                /*Valida usuario*/
                EUsuario eUsuario = new EUsuario();
                eUsuario.EMAIL = usuario.Trim();
                eUsuario.PASSWORD = clave.Trim();
                string objResultado = NUsuario.CrearUsuario(eUsuario);

                if (string.IsNullOrWhiteSpace(objResultado))
                {
                    objRespuesta.Error("Inconveniente al registrar al usuario!");
                }
                else
                {
                    eUsuario.ID_ENCRIP = objResultado;
                    eUsuario.TOKEN_ACTIVACION = objResultado;
                    int objResultadoActivacion = NUsuario.TokenActivoUsuario(eUsuario);

                    ECorreo correo = new ECorreo();
                    correo.Para = eUsuario.EMAIL;
                    correo.Asunto = "Activación de Usuario";
                    correo.Mensaje = "Active su cuenta ingresando al siguiente enlace:<br/>" +
                        "<a href=\"https://rumpp.charpetechnology.com/active.aspx?user=" + objResultado + "\">ACTIVAR CUENTA</a>";
                    correo.Enviar();

                    objRespuesta.Mensaje = "Se registro su cuenta satisfactoriamente, se envio un correo para activar su cuenta";
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