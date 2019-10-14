using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using ENTIDAD;
using NEGOCIOS;
using System.Globalization;
using System.Threading;

namespace PRESENTACION.page
{
    public partial class inicio : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Page.IsPostBack == false)
            {
                if (Session["UserData"] == null) Response.Redirect("~/login.aspx");
            }
        }
    }
}