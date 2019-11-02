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
    public partial class active : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                try
                {
                    string cadena = HttpContext.Current.Request.Url.AbsoluteUri;
                    cadena = cadena.Substring(cadena.IndexOf("=") + 1, cadena.Length - cadena.IndexOf("=") - 1);

                    EUsuario eUsuario = new EUsuario();
                    eUsuario.ID_ENCRIP = cadena;
                    eUsuario = NUsuario.ObtenerUsuario(eUsuario);

                    if (eUsuario == null)
                    {
                        lblMensaje.InnerHtml = "No se logro identificar el usuario";
                    }
                    else if (eUsuario.TOKEN_PASSWORD != cadena)
                    {
                        lblMensaje.InnerHtml = "Usuario ya fue activado en otro momento";
                    }
                    else
                    {
                        string objResultado = NUsuario.ActivarUsuario(eUsuario);

                        lblMensaje.InnerHtml = objResultado;
                    }
                }
                catch
                {
                    lblMensaje.InnerHtml = "Inconveniente en la activacion del usuario<br />Consulte con administrador";
                }
            }
        }
    }
}