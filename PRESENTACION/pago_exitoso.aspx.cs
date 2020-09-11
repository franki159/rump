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
    public partial class pago_exitoso : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Page.IsPostBack == false)
            {
                if (Session["UserRump"] == null) Response.Redirect("~/InicioSesion");
            }

            var objPedido = Request.QueryString["vtoken"];

            sub_wrapper.InnerHtml = "Su pedido N°: " + EUtil.getDesencriptar(objPedido) + " ha sido pagado exitosamente. De ser necesario nos comunicaremos con usted para coordinar detalles de la entrega.";
        }

        [WebMethod()]
        public static object obtenerCupon()
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();

            /*try
            {
                objRespuesta.Resultado = NConvenio.obtenerCupon();
            }
            catch (Exception ex)
            {
                objRespuesta.Error(string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }*/

            return objRespuesta;
        }
    }
}