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

namespace PRESENTACION.page.mantenimiento
{
    public partial class mascota : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
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
                //objE.ID_LOCAL = eSession.LOCAL.ID_LOCAL;
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
                //objE.ID_LOCAL = eSession.LOCAL.ID_LOCAL;
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
                //EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];
                //objE.ID_LOCAL = eSession.LOCAL.ID_LOCAL;
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

                int objResultado = 0;
                //EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];
                //objE.ID_LOCAL = eSession.LOCAL.ID_LOCAL;
                if (objE.ID != 0)
                {
                    objResultado = NMascota.ActualizarMascotaWM(objE);
                }
                else
                {
                    objResultado = NMascota.RegistrarMascotaWM(objE);
                }
                

                if (objResultado == 0)
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
                //objE.ID_LOCAL = eSession.LOCAL.ID_LOCAL;
                objE.FOTO = EUtil.getEncriptar(objE.ID.ToString()) + "." + objE.EXTENSION;
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
        public static object listarParametro(EGeneral objE)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                if (HttpContext.Current.Session["userRump"] == null)
                {
                    objRespuesta.Error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
                    return objRespuesta;
                }
                List<EGeneral> objResultado = new List<EGeneral>();
                //EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];
                //objE.ID_LOCAL = eSession.LOCAL.ID_LOCAL;
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