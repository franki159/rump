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
    public partial class pago_error : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Page.IsPostBack == false)
            {
                if (Session["UserRump"] == null) Response.Redirect("~/InicioSesion");
            }

            var objTipo = Request.QueryString["vTipo"];

            switch (EUtil.getDesencriptar(objTipo))
            {
                case "cancelled":
                case "rejected":
                    sub_wrapper.InnerHtml = "Lo setimos su pago no se realizó correctamente.";
                    break;
                case "in_process":
                    sub_wrapper.InnerHtml = "Su pago está pendiente de verificación. Se le comunicará a través de correo cuando haya sido confirmado";
                    break;
                default:
                    break;
            }
        }
    }
}