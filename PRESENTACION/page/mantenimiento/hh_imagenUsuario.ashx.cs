using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using ENTIDAD;
using NEGOCIOS;

namespace PRESENTACION.page.mantenimiento
{
    /// <summary>
    /// Descripción breve de hh_imagenMascota
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
                string fileName = context.Request.Form["name"];
                string fileExtension = file.ContentType;

                if (!string.IsNullOrEmpty(fileName))
                {
                    fileExtension = Path.GetExtension(file.FileName);
                    str_image = EUtil.getEncriptar(fileName) + fileExtension;
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