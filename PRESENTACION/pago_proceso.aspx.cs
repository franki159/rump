using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using ENTIDAD;
using NEGOCIOS;
using Newtonsoft.Json;
using System.Net.Http;
using System.Configuration;

namespace PRESENTACION
{
    public partial class pago_proceso : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Page.IsPostBack == false)
            {
                //if (Session["UserRump"] == null) Response.Redirect("~/InicioSesion");
            }
        }
    }
}