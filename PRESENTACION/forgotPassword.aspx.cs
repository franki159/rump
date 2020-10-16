using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using ENTIDAD;
using NEGOCIOS;
using System.Configuration;

namespace PRESENTACION
{
    public partial class forgotPassword : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod()]
        public static object AccederWM(string usuario)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                /*Valida usuario*/
                EUsuario eUsuario = new EUsuario();
                eUsuario.EMAIL = usuario.Trim();
                List<EUsuario> objLista = NUsuario.listarUsuario(eUsuario);

                if (objLista.Count == 0)
                {
                    objRespuesta.Error("El usuario no existe");
                }
                else
                {
                    objLista[0].TOKEN_PASSWORD = objLista[0].ID_ENCRIP;
                    int objResultado = NUsuario.TokenClaveUsuario(objLista[0]);

                    if (objLista[0].EMAIL.Contains("@"))
                    {
                        ECorreo correo = new ECorreo();
                        correo.Para = objLista[0].EMAIL;
                        correo.Asunto = "Reestablecer Usuario";
                        correo.Mensaje = "Reestablezca su cuenta ingresando al siguiente enlace para asignar nueva contraseña:<br/>" +
                            "<a href=\"" + ConfigurationManager.AppSettings["dominioRump"].ToString() + objLista[0].ID_ENCRIP + "\">REESTABLECER USUARIO</a>";
                        correo.Enviar();
                    }

                    objRespuesta.Mensaje = "Se envio un correo para el cambio de contraseña";
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