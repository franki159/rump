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
                    //Para el usuario
                    correo.Para = "worldpetsperu.2210@gmail.com";
                    correo.Copia = objE.CORREO;
                    correo.Asunto = "ENCONTRASTE A UNA MASCOTA";
                    correo.Mensaje = "<h4>¡Saludos desde RUMP!</h4>" +
"<p>Le agradecemos que se haya hecho cargo de una mascota extraviada, gracias a buenas personas como usted podemos evitar que más animales acaben viviendo en la calle en las peores condiciones.</p>" +
"<p>Le contactaremos lo antes posible para coordinar la devolución de la mascota a su hogar. Asimismo, le pedimos por favor que acoja y cuide al animalito hasta que se pueda contactar con éxito al dueño.</p>" +
"<p>Nuevamente, gracias por responsabilizarse sobre el bienestar animal.</p>" +
"<h4>Equipo RUMP</h4>";
                    correo.Enviar();
                    //Para rump
                    correo.Para = "worldpetsperu.2210@gmail.com";
                    correo.Copia = objE.CORREO;
                    correo.Asunto = "MASCOTA ENCONTRADA";
                    correo.Mensaje = "He encontraedo una mascota con el DNI: " + objE.DNI + "<br/>" +
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

        [WebMethod()]
        public static object EnviarMensajeWM(EMascota objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                ECorreo correo = new ECorreo();
                //Para el usuario
                correo.Para = "worldpetsperu.2210@gmail.com";
                correo.Copia = objE.CORREO;
                correo.Asunto = "Mensaje de " + objE.NOMBRE + " Correo: "+ objE.CORREO;
                correo.Mensaje = objE.OBSERVACION;
                correo.Enviar();

                objRespuesta.Success("Se envió correctamente");
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
    }
}