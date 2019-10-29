using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using ENTIDAD;
using NEGOCIOS;
using iTextSharp.text;
using iTextSharp.text.pdf;

namespace PRESENTACION.page.proceso
{
    /// <summary>
    /// Descripción breve de hh_imagenMascota
    /// </summary>
    public class hh_imprimirDNI : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            //try
            //{
            //    Document pdfDoc = new Document(PageSize.A4, 25, 10, 25, 10);
            //    PdfWriter pdfWriter = PdfWriter.GetInstance(pdfDoc, Response.OutputStream);
            //    pdfDoc.Open();
            //    Paragraph Text = new Paragraph("This is test file");
            //    pdfDoc.Add(Text);
            //    pdfWriter.CloseStream = false;
            //    pdfDoc.Close();
            //    Response.Buffer = true;
            //    Response.ContentType = "application/pdf";
            //    Response.AddHeader("content-disposition", "attachment;filename=Example.pdf");
            //    Response.Cache.SetCacheability(HttpCacheability.NoCache);
            //    Response.Write(pdfDoc);
            //    Response.End();
            //}
            //catch (Exception ex)
            //{ Response.Write(ex.Message); }
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