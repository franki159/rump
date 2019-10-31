using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PRESENTACION.page.proceso
{
    public partial class imprimirDNI : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                if (Session["userRump"] == null) Response.Redirect("~/login.aspx");
            }
        }

        protected void Button1_Click(object sender, EventArgs e)
        {


        }
    }
}