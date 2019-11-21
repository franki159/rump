using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.IO;
using ENTIDAD;
using NEGOCIOS;
using iTextSharp.text;
using iTextSharp.text.pdf;

namespace PRESENTACION.page.mantenimiento
{
    public partial class mascota : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Page.IsPostBack == false)
            {
                if (Session["userRump"] == null) Response.Redirect("~/login.aspx");
            }
        }

        [WebMethod()]
        public static object ListaMascotaWM(EMascota objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }

                List<EMascota> objResultado = new List<EMascota>();
                //EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];
                objResultado = NMascota.listarMascota(objE);
                if (objResultado.Count == 0)
                {
                    objRespuesta.Error("No se encontraron registros.");
                }
                else
                {
                    objRespuesta.Resultado = objResultado;
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
        [WebMethod()]
        public static object ObtenerMascotaWM(EMascota objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }

                EMascota objResultado = new EMascota();
                //EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];
                objResultado = NMascota.ObtenerMascota(objE);
                objRespuesta.Resultado = objResultado;
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }

        [WebMethod()]
        public static object AnularMascotaWM(EMascota objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }

                int objResultado = 0;
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["userRump"];
                objE.USUARIO_ID = eSession.ID;

                objResultado = NMascota.AnularMascotaWM(objE);

                if (objResultado == 0)
                {
                    objRespuesta.Error("No se pudo eliminar.");
                }
                else
                {
                    objRespuesta.Success("Se eliminó la mascota correctamente");
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
        [WebMethod()]
        public static object AdopcionMascotaWM(EMascota objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }

                int objResultado = 0;
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["userRump"];
                objE.USUARIO_ID = eSession.ID;

                objResultado = NMascota.AdopcionMascotaWM(objE);

                if (objResultado == 0)
                {
                    objRespuesta.Error("No se pudo poner en adopción la mascota.");
                }
                else
                {
                    objRespuesta.Success("Se puso en adopción la mascota correctamente");
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
        [WebMethod()]
        public static object NoAdopcionMascotaWM(EMascota objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }

                int objResultado = 0;
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["userRump"];
                objE.USUARIO_ID = eSession.ID;

                objResultado = NMascota.NoAdopcionMascotaWM(objE);

                if (objResultado == 0)
                {
                    objRespuesta.Error("No se pudo sacar de adopción la mascota.");
                }
                else
                {
                    objRespuesta.Success("Se saco a la mascota de adopción correctamente");
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
        [WebMethod()] 
        public static object PerdidaMascotaWM(EMascota objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }

                string objResultado = "";
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["userRump"];
                objE.USUARIO_ID = eSession.ID;

                objResultado = NMascota.PerdidaMascotaWM(objE);

                if (objResultado == "")
                {
                    objRespuesta.Error("No se pudo reportar la mascota como perdida.");
                }
                else
                {
                    ECorreo correo = new ECorreo();
                    //Correo al cliente
                    correo.Para = objResultado;
                    correo.Asunto = "Reportar mascota extraviada";
                    correo.Mensaje = "<h4>¡Saludos desde RUMP!</h4>" +
"<p>Lamentamos oír que su mascota se ha extraviado.</p>" +
"<p>Con su chapita identificadora quien la encuentre podrá acceder a la información de contacto " +
"para poder retornarla. Introduciendo el número RUMP en la web y reportándola como " +
"extraviada. En cuanto suceda se le enviará una alerta indicando que la mascota ha sido " +
"encontrada. Del mismo modo, quien la encuentre podrá ver si el animal necesita algún " +
"medicamento o sufre de alguna condición o alergia.</p>" +
"<p>Esperamos recibir buenas noticias pronto. Por el momento haremos difusión en las redes para " +
"que el mayor número de gente posible esté atenta por la zona en que fue extraviada.</p>" +
"<p>Nos gustaría saber específicamente las circunstancias en la que su mascota se " +
"perdió, de este modo podremos aconsejarle para que esta situación no se vuelva a dar.</p>" +
"<p>Estaremos en contacto.</p>" +
"<p>Saludos cordiales,</p>" +
"<h4>Equipo RUMP</h4>";
                    correo.Enviar();
                    //Correo a RUMP
                    //correo.Para = "worldpetsperu.2210@gmail.com";
                    //correo.Asunto = "Mascota extraviada";
                    //correo.Mensaje = "<h4>Se perdió la mascota </h4>";
                    //correo.Enviar();

                    objRespuesta.Success("Se reportó la mascota como perdida correctamente");
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
        [WebMethod()]
        public static object MuerteMascotaWM(EMascota objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }

                string objResultado = "";
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["userRump"];
                objE.USUARIO_ID = eSession.ID;

                objResultado = NMascota.MuerteMascotaWM(objE);

                if (objResultado == "")
                {
                    objRespuesta.Error("Error al querer modificar.");
                }
                else
                {
//                    ECorreo correo = new ECorreo();
//                    //Correo al cliente
//                    correo.Para = objResultado;
//                    correo.Asunto = "Reportar mascota extraviada";
//                    correo.Mensaje = "<h4>¡Saludos desde RUMP!</h4>" +
//"<p>Lamentamos oír que su mascota se ha extraviado.</p>" +
//"<p>Con su chapita identificadora quien la encuentre podrá acceder a la información de contacto " +
//"para poder retornarla. Introduciendo el número RUMP en la web y reportándola como " +
//"extraviada. En cuanto suceda se le enviará una alerta indicando que la mascota ha sido " +
//"encontrada. Del mismo modo, quien la encuentre podrá ver si el animal necesita algún " +
//"medicamento o sufre de alguna condición o alergia.</p>" +
//"<p>Esperamos recibir buenas noticias pronto. Por el momento haremos difusión en las redes para " +
//"que el mayor número de gente posible esté atenta por la zona en que fue extraviada.</p>" +
//"<p>Nos gustaría saber específicamente las circunstancias en la que su mascota se " +
//"perdió, de este modo podremos aconsejarle para que esta situación no se vuelva a dar.</p>" +
//"<p>Estaremos en contacto.</p>" +
//"<p>Saludos cordiales,</p>" +
//"<h4>Equipo RUMP</h4>";
//                    correo.Enviar();
                    //Correo a RUMP
                    //correo.Para = "worldpetsperu.2210@gmail.com";
                    //correo.Asunto = "Mascota extraviada";
                    //correo.Mensaje = "<h4>Se perdió la mascota </h4>";
                    //correo.Enviar();

                    objRespuesta.Success("Se actualizó correctamente");
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
        [WebMethod()]
        public static object EncontradaMascotaWM(EMascota objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }

                int objResultado = 0;
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["userRump"];
                objE.USUARIO_ID = eSession.ID;

                objResultado = NMascota.EncontradaMascotaWM(objE);

                if (objResultado == 0)
                {
                    objRespuesta.Error("No se reportar la mascota como encontrada.");
                }
                else
                {
                    objRespuesta.Success("Se reportó la mascota como encontrada correctamente");
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
        [WebMethod()]
        public static object SolicitarServicioWM(EMascota objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }

                string objResultado = "";
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["userRump"];
                objE.USUARIO_ID = eSession.ID;

                objResultado = NMascota.SolicitarServicioWM(objE);

                if (objResultado == "")
                {
                    objRespuesta.Error("No se pudo realizar la solicitud.");
                }
                else
                {
                    var asunto = "";
                    switch (objE.OPCION)
                    {
                        case 1://Solicitar copia DNI
                            asunto = "SOLICITAR DNI";
                            break;
                        case 2://Solicitar copia DNI
                            asunto = "SOLICITAR DUPLICADO DNI";
                            break;
                        case 3://Solicitar copia chapita
                            asunto = "SOLICITAR DUPLICADO DE CHAPITA";
                            break;
                        case 4://Solicitar copia dni y chapita
                            asunto = "SOLICITAR DUPLICADO DE DNI Y CHAPITA";
                            break;
                        case 5://Solicitar copia renovacion DNI
                            asunto = "SOLICITAR RENOVACION DE DNI";
                            break;
                        case 6://Solicitar copia certificado de dueño responsable
                            asunto = "SOLICITAR CERTIFICADO DE DUEÑO RESPONSABLE";
                            break;
                        default:
                            break;
                    }

                    var mensaje = "<h4>¡Saludos desde RUMP!</h4>" +
                       "<p>Su petición ha sido procesada con éxito y en breves nos pondremos en contacto con usted para coordinar la entrega.</p>" +
                       "<h4>Equipo RUMP</h4>";
                    ECorreo correo = new ECorreo();
                    //Correo al cliente
                    correo.Para = objResultado;
                    correo.Asunto = asunto;
                    correo.Mensaje = mensaje;
                    correo.Enviar();

                    objRespuesta.Success("Se realizó la solicitud correctamente");
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
        [WebMethod()]
        public static object ActualizarMascotaWM(EMascota objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }

                string objResultado = "";
                EUsuario eSession = (EUsuario)HttpContext.Current.Session["userRump"];
                objE.USUARIO = eSession.ID;
                if (objE.ID_ENCRIP != "")
                {
                    objResultado = NMascota.ActualizarMascotaWM(objE).ToString();
                }
                else
                {
                    objResultado = NMascota.RegistrarMascotaWM(objE);
                }
                

                if (objResultado == "")
                {
                    objRespuesta.Error("No se pudo actualizar.");
                }
                else
                {
                    objRespuesta.Resultado = objResultado;
                    objRespuesta.Success("Se guardó la información correctamente");
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
                
        [WebMethod()]
        public static object ActualizarFotoMascotaWM(EMascota objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }

                int objResultado = 0;
                //EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];
                objE.FOTO = EUtil.getEncriptar(EUtil.getDesencriptar(objE.ID_ENCRIP)) + "." + objE.EXTENSION;
                objResultado = NMascota.ActualizarFotoMascotaWM(objE);


                if (objResultado == 0)
                {
                    objRespuesta.Error("No se pudo actualizar.");
                }
                else
                {
                    objRespuesta.Success("Se guardó la información correctamente");
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }

        [WebMethod()]
        public static object InsertarFotoMascotaWM(EMascota objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                string objResultado = "";
                //EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];
                objE.FOTO = objE.EXTENSION;
                objResultado = NMascota.InsertarFotoMascotaWM(objE);


                if (objResultado == "")
                {
                    objRespuesta.Error("No se pudo actualizar.");
                }
                else
                {
                    objRespuesta.Resultado = objResultado;
                    objRespuesta.Success("Se guardó la información correctamente");
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
        [WebMethod()]
        public static object listarParametro(EGeneral objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                List<EGeneral> objResultado = new List<EGeneral>();
                //EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];
                objResultado = NParametro.listarParametro(objE);
                if (objResultado.Count == 0)
                {
                    objRespuesta.Error("No se encontraron registros.");
                }
                else
                {
                    objRespuesta.Resultado = objResultado;
                }
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
        [WebMethod()]
        public static object ObtenerPropitarioMascotaWM(EUsuario objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }

                EUsuario objResultado = new EUsuario();
                objResultado = NUsuario.ObtenerPropietarioMascota(objE);
                objRespuesta.Resultado = objResultado;

            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }
    }
}