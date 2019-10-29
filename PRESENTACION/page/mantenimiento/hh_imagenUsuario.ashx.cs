using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PRESENTACION.page.mantenimiento
{
    /// <summary>
    /// Descripción breve de hh_imagenUsuario
    /// </summary>
    public class hh_imagenUsuario : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
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
                    file.SaveAs(pathToSave);
                }
            }
            context.Response.Write(str_image);
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