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
    public partial class index : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod()]
        public static object InfoSesionWM()
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();

            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("No login.");
                }
                else
                {
                    objRespuesta.Resultado = HttpContext.Current.Session["userRump"];
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }

            return objRespuesta;
        }

        [WebMethod()]
        public static object ReportarMascotaWM(EMascota objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                string objResultado = "";

                int objResultadoReporte = NMascota.ReportarMascotaWM(objE);
                if (objResultadoReporte > 0)
                {
                    ECorreo correo = new ECorreo();
                    correo.Para = "worldpetsperu.2210@gmail.com";
                    correo.Copia = objE.CORREO;
                    correo.Asunto = "Reporte de Mascota extraviada";
                    correo.Mensaje = "Hola RUMP, he encontraedo una mascota con el DNI: " + objE.DNI + "<br/>" +
                                    "Mi numero de telefono es :" + objE.TELEFONO;

                    correo.Enviar();
                }

                if (objResultadoReporte > 0)
                {
                    objRespuesta.Error("No se pudo repotar.");
                }
                else
                {
                    objRespuesta.Resultado = objResultado;
                    objRespuesta.Success("Se reportó correctamente");
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