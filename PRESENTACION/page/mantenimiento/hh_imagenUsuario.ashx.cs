using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using ENTIDAD;
using NEGOCIOS;
using System.Drawing;


namespace PRESENTACION.page.mantenimiento
{
    /// <summary>
    /// Descripción breve de hh_imagenUsuario
    /// </summary>
    public class hh_imagenUsuario : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                context.Response.ContentType = "text/plain";
                string str_image = "";

                foreach (string s in context.Request.Files)
                {
                    HttpPostedFile file = context.Request.Files[s];
                    str_image = context.Request.Form["name"];

                    if (!string.IsNullOrEmpty(str_image))
                    {
                        string pathToSave = HttpContext.Current.Server.MapPath("~/img/usuario/") + str_image;
                        Image img = clsUtil.RedimensionarImagen(file.InputStream, 200);
                        using (MemoryStream stream = new MemoryStream())
                        {
                            img.Save(pathToSave);
                            stream.WriteTo(context.Response.OutputStream);
                        }
                        //img.Save(pathToSave);
                        //file.SaveAs(pathToSave);
                    }
                }
                context.Response.Write(str_image);
            }
            catch (Exception ex)
            {
                NMascota.log_error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message, "imagen usuario");
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}