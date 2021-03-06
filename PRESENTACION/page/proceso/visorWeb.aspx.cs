﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ENTIDAD;
using NEGOCIOS;
using iTextSharp.text;
using iTextSharp.text.html.simpleparser;
using iTextSharp.text.pdf;
using System.Globalization;
using System.Threading;

namespace PRESENTACION.page.proceso
{
    public partial class visorWeb : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (Session["UserRump"] == null) Response.Redirect("~/InicioSesion");

                var tip_imp = Request.QueryString["tipoImpresion"];

                if (tip_imp == "DNI")
                {
                    imprimirDNI();
                }
                else if (tip_imp == "REGISTRO")
                {
                    ImprimirRegistro();
                }
                else if (tip_imp == "RESPONSABLE")
                {
                    ImprimirResponsable();
                }
            }
            catch (Exception ex)
            {
                Response.Write(ex.Message + " " + ex.StackTrace);
            }
        }

        public string letraCapital(string valor)
        {
            string resultado = "";
            var arrayTexto = valor.Trim().Split(Convert.ToChar(" "));
            for (int i = 0; i < arrayTexto.Length; i++)
            {
                if (arrayTexto[i].Trim() != "")
                {
                    resultado += arrayTexto[i].Trim().Substring(0, 1).ToUpper() + arrayTexto[i].Trim().Substring(1, arrayTexto[i].Trim().Length - 1).ToLower() + " ";
                }
            }

            return resultado.Trim();
        }

        private void ImprirRegistroSC(EMascota objE)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                var doc = new Document(PageSize.A4, 270, 10, 360, 5);//Margen del documento
                                                                     //{
                iTextSharp.text.pdf.PdfWriter w = iTextSharp.text.pdf.PdfWriter.GetInstance(doc, ms);
                //using (PdfWriter w = PdfWriter.GetInstance(doc, ms))
                //{
                doc.Open();
                doc.NewPage();
                //Estilos
                var textoBody = FontFactory.GetFont("Calibri", 18, Font.BOLD, new BaseColor(94, 94, 94));

                //Fondo
                var logo = iTextSharp.text.Image.GetInstance(Server.MapPath("~/img/dni/registro_sc.jpg"));
                logo.ScaleToFit(doc.PageSize.Width, doc.PageSize.Height - 20);//Tamaño
                logo.SetAbsolutePosition(5, 10);
                doc.Add(logo);
                //Tabla Datos
                PdfPTable table = new PdfPTable(1);
                table.WidthPercentage = 93;
                table.HorizontalAlignment = Element.ALIGN_LEFT;

                PdfPCell cell = new PdfPCell(new Phrase(objE.DNI, textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                cell.PaddingBottom = 20;
                table.AddCell(cell);
                //Nombre del mascota
                var nomMascota = objE.NOMBRE + " " + objE.APELLIDO;
                cell = new PdfPCell(new Phrase(letraCapital(nomMascota), textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                cell.PaddingBottom = 13;
                if ((nomMascota).Length > 30)
                    cell.PaddingTop = -10;
                table.AddCell(cell);
                //Nombre del responsable
                var nomResponsable = objE.FAMILIARP;
                cell = new PdfPCell(new Phrase(letraCapital(nomResponsable), textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                cell.PaddingBottom = 13;
                if ((nomResponsable).Length > 30)
                {
                    cell.PaddingTop = -20;
                    cell.PaddingBottom = 10;
                }
                else
                {
                    cell.PaddingBottom = 13;
                }

                table.AddCell(cell);

                cell = new PdfPCell(new Phrase(objE.FEC_CREA.Value.ToString("dd") + " de " + objE.FEC_CREA.Value.ToString("MMMM", CultureInfo.CreateSpecificCulture("es-ES")) + " de " + objE.FEC_CREA.Value.ToString("yyyy"), textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                cell.PaddingBottom = 13;
                table.AddCell(cell);
                //Nombre de Provincia y departamento
                var nomProv = objE.PROVINCIA + "-" + objE.DEPARTAMENTO;
                cell = new PdfPCell(new Phrase(letraCapital(nomProv), textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                cell.PaddingBottom = 14;
                if ((nomProv).Length > 30)
                    cell.PaddingTop = 4;
                table.AddCell(cell);
                //Nombre de Distrito
                var nomDist = objE.DISTRITO;
                cell = new PdfPCell(new Phrase(letraCapital(nomDist), textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                cell.PaddingBottom = 14;
                if ((nomDist).Length > 30)
                    cell.PaddingTop = 4;
                table.AddCell(cell);
                //Nombre de raza
                var nomRaza = objE.RAZA;
                cell = new PdfPCell(new Phrase(letraCapital(nomRaza), textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                cell.PaddingBottom = 14;
                if ((nomRaza).Length > 30)
                    cell.PaddingTop = 4;
                table.AddCell(cell);
                //Nombre color
                var nomColor = objE.COLOR;
                cell = new PdfPCell(new Phrase(nomColor, textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                if ((nomRaza).Length > 30)
                    cell.PaddingTop = -16;
                table.AddCell(cell);
                doc.Add(table);

                doc.Close();
                //}
                //}

                Response.ContentType = "application/pdf";
                Response.OutputStream.Write(ms.GetBuffer(), 0, ms.GetBuffer().Length);
                Response.OutputStream.Flush();
                Response.OutputStream.Close();

            }
        }
        private void ImprirRegistroCC(EMascota objE)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                var doc = new Document(PageSize.A4, 270, 10, 345, 5);//Margen del documento
                                                                     //{
                iTextSharp.text.pdf.PdfWriter w = iTextSharp.text.pdf.PdfWriter.GetInstance(doc, ms);
                //using (PdfWriter w = PdfWriter.GetInstance(doc, ms))
                //{
                doc.Open();
                doc.NewPage();
                //Estilos
                var textoBody = FontFactory.GetFont("Calibri", 18, Font.BOLD, new BaseColor(94, 94, 94));

                //Fondo
                var logo = iTextSharp.text.Image.GetInstance(Server.MapPath("~/img/dni/registro_cc.jpg"));
                logo.ScaleToFit(doc.PageSize.Width, doc.PageSize.Height - 20);//Tamaño
                logo.SetAbsolutePosition(5, 10);
                doc.Add(logo);
                //Tabla Datos
                PdfPTable table = new PdfPTable(1);
                table.WidthPercentage = 93;
                table.HorizontalAlignment = Element.ALIGN_LEFT;

                PdfPCell cell = new PdfPCell(new Phrase(objE.DNI, textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                cell.PaddingBottom = 14;
                table.AddCell(cell);
                //Código de Microchip
                var codMicrochip = objE.COD_MICROCHIP;
                cell = new PdfPCell(new Phrase(letraCapital(codMicrochip), textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                cell.PaddingBottom = 14;
                if ((codMicrochip).Length > 30)
                    cell.PaddingTop = -10;
                table.AddCell(cell);
                //Nombre del mascota
                var nomMascota = objE.NOMBRE + " " + objE.APELLIDO;
                cell = new PdfPCell(new Phrase(letraCapital(nomMascota), textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                cell.PaddingBottom = 14;
                if ((nomMascota).Length > 30)
                    cell.PaddingTop = -10;
                table.AddCell(cell);
                //Nombre del responsable
                var nomResponsable = objE.FAMILIARP;
                cell = new PdfPCell(new Phrase(letraCapital(nomResponsable), textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                if ((nomResponsable).Length > 30)
                {
                    cell.PaddingTop = -20;
                    cell.PaddingBottom = 10;
                }
                else
                {
                    cell.PaddingBottom = 14;
                }

                table.AddCell(cell);

                cell = new PdfPCell(new Phrase(objE.FEC_CREA.Value.ToString("dd") + " de " + objE.FEC_CREA.Value.ToString("MMMM", CultureInfo.CreateSpecificCulture("es-ES")) + " de " + objE.FEC_CREA.Value.ToString("yyyy"), textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                cell.PaddingBottom = 14;
                table.AddCell(cell);
                //Nombre de Provincia y departamento
                var nomProv = objE.PROVINCIA + " - " + objE.DEPARTAMENTO;
                cell = new PdfPCell(new Phrase(letraCapital(nomProv), textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                if ((nomProv).Length >= 20)
                {
                    cell.PaddingTop = -8;
                    cell.PaddingBottom = 5;
                }
                else
                {
                    cell.PaddingBottom = 14;
                }
                table.AddCell(cell);
                //Nombre de Distrito
                var nomDist = objE.DISTRITO;
                cell = new PdfPCell(new Phrase(letraCapital(nomDist), textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                cell.PaddingBottom = 14;
                if ((nomDist).Length > 30)
                    cell.PaddingTop = 4;
                table.AddCell(cell);
                //Nombre de raza
                var nomRaza = objE.RAZA;
                cell = new PdfPCell(new Phrase(letraCapital(nomRaza), textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                cell.PaddingBottom = 14;
                if ((nomRaza).Length > 30)
                    cell.PaddingTop = 4;
                table.AddCell(cell);
                //Nombre color
                var nomColor = objE.COLOR;
                cell = new PdfPCell(new Phrase(nomColor, textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                if ((nomRaza).Length > 30)
                    cell.PaddingTop = -16;
                table.AddCell(cell);
                doc.Add(table);

                doc.Close();
                //}
                //}

                Response.ContentType = "application/pdf";
                Response.OutputStream.Write(ms.GetBuffer(), 0, ms.GetBuffer().Length);
                Response.OutputStream.Flush();
                Response.OutputStream.Close();

            }
        }

        private void ImprimirRegistro()
        {
            try
            {
                var num_dni = Request.QueryString["numIdentify"];

                EMascota objE = new EMascota();
                objE.DNI = num_dni;
                //EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];
                objE = NMascota.ObtenerMascotaxDNI(objE);
                if (objE.COD_MICROCHIP.Trim() == "")
                    ImprirRegistroSC(objE);
                else
                    ImprirRegistroCC(objE);

            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
        private void ImprirResponsableSC(EMascota objE) {
            using (MemoryStream ms = new MemoryStream())
            {
                var doc = new Document(PageSize.A4, 270, 10, 240, 5);//Margen del documento
                doc.SetPageSize(iTextSharp.text.PageSize.A4.Rotate());//Rotando horizontalmente
                iTextSharp.text.pdf.PdfWriter w = iTextSharp.text.pdf.PdfWriter.GetInstance(doc, ms);
                //using (PdfWriter w = PdfWriter.GetInstance(doc, ms))
                //{
                doc.Open();
                doc.NewPage();
                //Estilos
                var textoBody = FontFactory.GetFont("Calibri", 18, Font.BOLD, new BaseColor(94, 94, 94));

                //Fondo
                var logo = iTextSharp.text.Image.GetInstance(Server.MapPath("~/img/dni/certificado_sc.jpg"));
                logo.ScaleToFit(doc.PageSize.Width, doc.PageSize.Height - 20);//Tamaño
                logo.SetAbsolutePosition(5, 10);
                doc.Add(logo);
                //Tabla Datos
                PdfPTable table = new PdfPTable(1);
                table.WidthPercentage = 93;
                table.HorizontalAlignment = Element.ALIGN_LEFT;

                PdfPCell cell = new PdfPCell(new Phrase(objE.DNI, textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                cell.PaddingBottom = 16;
                table.AddCell(cell);

                //Nombre del mascota
                var nomMascota = objE.NOMBRE + " " + objE.APELLIDO;
                cell = new PdfPCell(new Phrase(letraCapital(nomMascota), textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                cell.PaddingBottom = 16;
                if ((nomMascota).Length > 30)
                    cell.PaddingTop = -10;
                table.AddCell(cell);

                //Nombre del responsable
                var nomResponsable = objE.FAMILIARP;
                cell = new PdfPCell(new Phrase(letraCapital(nomResponsable), textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                if ((nomResponsable).Length > 30)
                {
                    cell.PaddingTop = -14;
                    cell.PaddingBottom = 12;
                }
                else
                {
                    cell.PaddingBottom = 16;
                }

                table.AddCell(cell);
                //Nombre de Distrito
                var nomDist = objE.DISTRITO;
                cell = new PdfPCell(new Phrase(letraCapital(nomDist), textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                cell.PaddingBottom = 16;
                if ((nomDist).Length > 30)
                    cell.PaddingTop = 4;
                table.AddCell(cell);
                //Fecha de inscripcion
                cell = new PdfPCell(new Phrase(objE.FEC_CREA.Value.ToString("dd") + " de " + objE.FEC_CREA.Value.ToString("MMMM", CultureInfo.CreateSpecificCulture("es-ES")) + " de " + objE.FEC_CREA.Value.ToString("yyyy"), textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                cell.PaddingBottom = 16;
                table.AddCell(cell);
                //Nombre de macota Mayuscula
                cell = new PdfPCell(new Phrase(nomMascota.ToUpper(), textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                cell.PaddingBottom = 16;
                if ((nomMascota).Length > 30)
                    cell.PaddingTop = 4;
                table.AddCell(cell);
                doc.Add(table);

                doc.Close();
                //}
                //}

                Response.ContentType = "application/pdf";
                Response.OutputStream.Write(ms.GetBuffer(), 0, ms.GetBuffer().Length);
                Response.OutputStream.Flush();
                Response.OutputStream.Close();

            }
        }
        private void ImprirResponsableCC(EMascota objE)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                var doc = new Document(PageSize.A4, 270, 10, 240, 5);//Margen del documento
                doc.SetPageSize(iTextSharp.text.PageSize.A4.Rotate());//Rotando horizontalmente
                iTextSharp.text.pdf.PdfWriter w = iTextSharp.text.pdf.PdfWriter.GetInstance(doc, ms);
                //using (PdfWriter w = PdfWriter.GetInstance(doc, ms))
                //{
                doc.Open();
                doc.NewPage();
                //Estilos
                var textoBody = FontFactory.GetFont("Calibri", 18, Font.BOLD, new BaseColor(94, 94, 94));

                //Fondo
                var logo = iTextSharp.text.Image.GetInstance(Server.MapPath("~/img/dni/certificado_cc.jpg"));
                logo.ScaleToFit(doc.PageSize.Width, doc.PageSize.Height - 20);//Tamaño
                logo.SetAbsolutePosition(5, 10);
                doc.Add(logo);
                //Tabla Datos
                PdfPTable table = new PdfPTable(1);
                table.WidthPercentage = 93;
                table.HorizontalAlignment = Element.ALIGN_LEFT;

                PdfPCell cell = new PdfPCell(new Phrase(objE.DNI, textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                cell.PaddingBottom = 10;
                table.AddCell(cell);
                //Código de Microchip
                var codMicrochip = objE.COD_MICROCHIP;
                cell = new PdfPCell(new Phrase(letraCapital(codMicrochip), textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                cell.PaddingBottom = 11;
                if ((codMicrochip).Length > 30)
                    cell.PaddingTop = -10;
                table.AddCell(cell);
                //Nombre del mascota
                var nomMascota = objE.NOMBRE + " " + objE.APELLIDO;
                cell = new PdfPCell(new Phrase(letraCapital(nomMascota), textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                cell.PaddingBottom = 11;
                if ((nomMascota).Length > 30)
                    cell.PaddingTop = -10;
                table.AddCell(cell);

                //Nombre del responsable
                var nomResponsable = objE.FAMILIARP;
                cell = new PdfPCell(new Phrase(letraCapital(nomResponsable), textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                if ((nomResponsable).Length > 30)
                {
                    cell.PaddingTop = -14;
                    cell.PaddingBottom = 6;
                }
                else
                {
                    cell.PaddingBottom = 11;
                }

                table.AddCell(cell);
                //Nombre de Distrito
                var nomDist = objE.DISTRITO;
                cell = new PdfPCell(new Phrase(letraCapital(nomDist), textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                cell.PaddingBottom = 11;
                if ((nomDist).Length > 30)
                    cell.PaddingTop = 4;
                table.AddCell(cell);
                //Fecha de inscripcion
                cell = new PdfPCell(new Phrase(objE.FEC_CREA.Value.ToString("dd") + " de " + objE.FEC_CREA.Value.ToString("MMMM", CultureInfo.CreateSpecificCulture("es-ES")) + " de " + objE.FEC_CREA.Value.ToString("yyyy"), textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                cell.PaddingBottom = 11;
                table.AddCell(cell);
                //Nombre de macota Mayuscula
                cell = new PdfPCell(new Phrase(nomMascota.ToUpper(), textoBody));
                cell.Border = 0;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                cell.PaddingBottom = 14;
                if ((nomMascota).Length > 30)
                    cell.PaddingTop = 4;
                table.AddCell(cell);
                doc.Add(table);

                doc.Close();
                //}
                //}

                Response.ContentType = "application/pdf";
                Response.OutputStream.Write(ms.GetBuffer(), 0, ms.GetBuffer().Length);
                Response.OutputStream.Flush();
                Response.OutputStream.Close();

            }
        }
        private void ImprimirResponsable()
        {
            try
            {
                var num_dni = Request.QueryString["numIdentify"];

                EMascota objE = new EMascota();
                objE.DNI = num_dni;
                //EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];
                objE = NMascota.ObtenerMascotaxDNI(objE);

                if (objE.COD_MICROCHIP.Trim() == "")
                    ImprirResponsableSC(objE);
                else
                    ImprirResponsableCC(objE);

            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
        private void imprimirDNI()
        {
            try
            {
                var num_dni = Request.QueryString["numIdentify"];

                EMascota objE = new EMascota();
                objE.DNI = num_dni;
                //EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];
                objE = NMascota.ObtenerMascotaxDNI(objE);

                using (MemoryStream ms = new MemoryStream())
                {
                    var doc = new Document(PageSize.LETTER, 25, 20, 25, 20);
                    //using (var doc = new Document(PageSize.LETTER, 25, 20, 20, 20))
                    //{
                    iTextSharp.text.pdf.PdfWriter w = iTextSharp.text.pdf.PdfWriter.GetInstance(doc, ms);
                    //using (PdfWriter w = PdfWriter.GetInstance(doc, ms))
                    //{
                    doc.Open();
                    doc.NewPage();
                    //Estilos
                    var titleHeader = FontFactory.GetFont("Arial", 7, Font.BOLD, new BaseColor(76, 76, 76));
                    var titleRUMP = FontFactory.GetFont("Arial", 7, Font.BOLD, new BaseColor(0, 0, 0));
                    var titleSmall7B = FontFactory.GetFont("Courier", 7, Font.BOLD, new BaseColor(0, 0, 0));
                    var titleSmall6 = FontFactory.GetFont("Arial", 6, Font.NORMAL, new BaseColor(0, 0, 0));
                    var titleSmall6B = FontFactory.GetFont("Arial", 6, Font.BOLD, new BaseColor(0, 0, 0));
                    var titleSmall5 = FontFactory.GetFont("Arial", 5, Font.NORMAL, new BaseColor(0, 0, 0));
                    var titleSmall5B = FontFactory.GetFont("Arial", 5, Font.BOLD, new BaseColor(0, 0, 0));
                    var fechaCaducidad = FontFactory.GetFont("Arial", 5, Font.BOLD, new BaseColor(228, 141, 25));
                    var numDNI = FontFactory.GetFont("Arial", 11, Font.BOLD, new BaseColor(255, 131, 5));

                    //Fondo
                    var logo = iTextSharp.text.Image.GetInstance(Server.MapPath("~/img/dni/fondo.jpg"));
                    logo.ScaleAbsolute(263, 358);
                    logo.SetAbsolutePosition(10, 423);
                    doc.Add(logo);

                    //Tabla Header
                    PdfPTable table = new PdfPTable(2);
                    float[] widths = new float[] { 1f, 2f };
                    table.SetWidths(widths);
                    table.HorizontalAlignment = 0;

                    PdfPCell cell = new PdfPCell(new Phrase("REPUBLICA DEL PERU", titleHeader));
                    cell.Border = 0;
                    cell.HorizontalAlignment = 1;
                    table.AddCell(cell);

                    cell = new PdfPCell(new Phrase("RUMP - " + objE.DNI + "-" + (objE.SEXO == "Macho" ? "1" : "2"), titleRUMP));
                    cell.Border = 0;
                    cell.Rowspan = 2;
                    cell.PaddingTop = 8;
                    cell.VerticalAlignment = 1;
                    table.AddCell(cell);

                    cell = new PdfPCell(new Phrase("REGISTRO UNICO DE MASCOTAS", titleHeader));
                    cell.Border = 0;
                    cell.HorizontalAlignment = 1;
                    table.AddCell(cell);

                    //Tabla Body
                    PdfPTable tbody = new PdfPTable(4);
                    tbody.TotalWidth = 237f;
                    tbody.LockedWidth = true;
                    float[] widths2 = new float[] { 17f, 65f, 75f, 80f };
                    tbody.SetWidths(widths2);
                    tbody.HorizontalAlignment = 0;
                    tbody.SpacingBefore = 5f;
                    //DNI VERTICAL SEPARADO
                    var dniSeparado = "";

                    for (int i = 0; i < objE.DNI.Length; i++)
                        dniSeparado += objE.DNI.Substring(i, 1) + " ";

                    cell = new PdfPCell(new Phrase(dniSeparado.Trim(), numDNI));
                    cell.Border = 0;
                    cell.Rotation = -90;
                    cell.HorizontalAlignment = 1;
                    tbody.AddCell(cell);
                    //Foto Mascota
                    string url_img_mascota = Server.MapPath("~/img/mascota/" + objE.lMASCOTA[0].FOTO);
                    iTextSharp.text.Image imgMascota;
                    if (File.Exists(url_img_mascota))
                    {
                        imgMascota = iTextSharp.text.Image.GetInstance(url_img_mascota);
                    }
                    else
                    {
                        imgMascota = iTextSharp.text.Image.GetInstance(Server.MapPath("~/img/noPets.png"));
                    }
                    imgMascota.ScaleAbsolute(65, 85);
                    imgMascota.SpacingBefore = 5f;
                    cell = new PdfPCell(imgMascota);
                    cell.Border = 0;
                    tbody.AddCell(cell);

                    //*******************************************************
                    //************* INICIO NOMBRES Y DATOS ******************
                    //*******************************************************
                    PdfPTable tdatos = new PdfPTable(1);

                    cell = new PdfPCell(new Phrase("Nombre", titleSmall6));
                    cell.Border = 0;
                    tdatos.AddCell(cell);

                    cell = new PdfPCell(new Phrase(objE.NOMBRE.ToUpper(), titleSmall6B));
                    cell.Border = 0;
                    tdatos.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Apellidos", titleSmall6));
                    cell.Border = 0;
                    tdatos.AddCell(cell);

                    cell = new PdfPCell(new Phrase(objE.APELLIDO.ToUpper(), titleSmall6B));
                    cell.Border = 0;
                    tdatos.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Fecha de Nacimiento", titleSmall6));
                    cell.Border = 0;
                    cell.PaddingTop = 20;
                    tdatos.AddCell(cell);

                    cell = new PdfPCell(new Phrase(objE.FEC_NAC.Value.ToString("dd MM yyyy"), titleSmall6B));
                    cell.Border = 0;
                    tdatos.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Sexo " + objE.SEXO.Substring(0, 1), titleSmall6B));
                    cell.Border = 0;
                    tdatos.AddCell(cell);

                    cell = new PdfPCell(tdatos);
                    cell.Border = 0;
                    tbody.AddCell(cell);
                    //*******************************************************
                    //**************** FIN NOMBRES Y DATOS ******************
                    //*******************************************************

                    //*******************************************************
                    //******* INICIO FECHAS DE INSCRIPCION ******************
                    //*******************************************************
                    PdfPTable tFechas = new PdfPTable(1);

                    cell = new PdfPCell(new Phrase("Fecha de Inscripción", titleSmall5));
                    cell.Border = 0;
                    cell.HorizontalAlignment = 1;
                    tFechas.AddCell(cell);

                    cell = new PdfPCell(new Phrase(objE.FEC_CREA.Value.ToString("dd MM yyyy"), titleSmall5B));
                    cell.Border = 0;
                    cell.HorizontalAlignment = 1;
                    cell.PaddingTop = -2;
                    tFechas.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Fecha de Emisión", titleSmall5));
                    cell.Border = 0;
                    cell.PaddingTop = 5;
                    cell.HorizontalAlignment = 1;
                    tFechas.AddCell(cell);

                    cell = new PdfPCell(new Phrase(objE.FEC_EMI.Value.ToString("dd MM yyyy"), titleSmall5B));
                    cell.Border = 0;
                    cell.HorizontalAlignment = 1;
                    cell.PaddingTop = -2;
                    tFechas.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Fecha de Caducidad", titleSmall5));
                    cell.Border = 0;
                    cell.PaddingTop = 5;
                    cell.HorizontalAlignment = 1;
                    tFechas.AddCell(cell);

                    cell = new PdfPCell(new Phrase(objE.FEC_CAD.Value.ToString("dd MM yyyy"), fechaCaducidad));
                    cell.Border = 0;
                    cell.HorizontalAlignment = 1;
                    cell.PaddingTop = -2;
                    tFechas.AddCell(cell);
                    //Imagen Pequeña
                    iTextSharp.text.Image imgMascotaSmall;
                    if (File.Exists(url_img_mascota))
                    {
                        imgMascotaSmall = iTextSharp.text.Image.GetInstance(url_img_mascota);
                    }
                    else
                    {
                        imgMascotaSmall = iTextSharp.text.Image.GetInstance(Server.MapPath("~/img/noPets.png"));
                    }

                    imgMascotaSmall.ScaleAbsolute(30, 38);
                    imgMascotaSmall.SpacingBefore = 7f;
                    cell = new PdfPCell(imgMascotaSmall);
                    cell.Border = 0;
                    cell.HorizontalAlignment = 1;
                    tFechas.AddCell(cell);

                    cell = new PdfPCell(tFechas);
                    cell.Border = 0;
                    cell.HorizontalAlignment = 0;
                    tbody.AddCell(cell);
                    //*******************************************************
                    //******* FIN FECHAS DE INSCRIPCION *********************
                    //*******************************************************
                    PdfPTable tmayor = new PdfPTable(1);
                    tmayor.TotalWidth = 237f;
                    tmayor.LockedWidth = true;
                    tmayor.HorizontalAlignment = 0;

                    int cant_str_nom = 0;
                    cant_str_nom += (objE.TIPO.Substring(0, 1) + "<PER" + objE.NOMBRE.ToUpper() + "<<").Length;
                    if (46 - cant_str_nom < 0)
                        cant_str_nom = 0;
                    else
                        cant_str_nom = 46 - cant_str_nom;
                    cell = new PdfPCell(new Phrase(objE.TIPO.Substring(0, 1) + "<PER" + objE.APELLIDO.Replace(" ", "").PadRight(cant_str_nom, Convert.ToChar("<")) + objE.NOMBRE.ToUpper() + "<<", titleSmall7B));
                    cell.Border = 0;
                    cell.PaddingTop = 0;
                    cell.PaddingLeft = 18;
                    tmayor.AddCell(cell);

                    cell = new PdfPCell(new Phrase(objE.DNI + "<1<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<", titleSmall7B));
                    cell.Border = 0;
                    cell.PaddingLeft = 18;
                    cell.PaddingTop = -2;
                    tmayor.AddCell(cell);
                    //*******************************************************
                    //********** INICIO PARTE POSTERIOR *********************
                    //*******************************************************
                    PdfPTable tposterior = new PdfPTable(4);
                    tposterior.TotalWidth = 250f;
                    float[] widthsPosterior = new float[] { 60f, 15f, 100f, 90f };
                    tposterior.SetWidths(widthsPosterior);
                    tposterior.LockedWidth = true;
                    tposterior.HorizontalAlignment = 0;
                    tposterior.SpacingBefore = 60f;

                    cell = new PdfPCell(new Phrase("Responsable 1", titleSmall6));
                    cell.Border = 0;
                    cell.PaddingLeft = 12;
                    tposterior.AddCell(cell);

                    cell = new PdfPCell(new Phrase("-", titleSmall6));
                    cell.Border = 0;
                    cell.HorizontalAlignment = 1;
                    tposterior.AddCell(cell);

                    cell = new PdfPCell(new Phrase(objE.FAMILIARP.ToUpper(), titleSmall6B));
                    cell.Border = 0;
                    tposterior.AddCell(cell);

                    PdfContentByte cb = w.DirectContent;
                    Barcode128 bc128 = new Barcode128();
                    bc128.Code = objE.DNI;
                    bc128.Font = null;
                    iTextSharp.text.Image imgCodeBar = bc128.CreateImageWithBarcode(cb, null, null);
                    imgCodeBar.ScaleAbsolute(70, 30);
                    cell = new PdfPCell(imgCodeBar);
                    cell.Border = 0;
                    cell.Rotation = 90;
                    cell.PaddingLeft = 30;
                    cell.HorizontalAlignment = 2;
                    cell.Rowspan = 7;
                    tposterior.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Responsable 2", titleSmall6));
                    cell.Border = 0;
                    cell.PaddingLeft = 12;
                    tposterior.AddCell(cell);

                    cell = new PdfPCell(new Phrase("-", titleSmall6));
                    cell.Border = 0;
                    cell.HorizontalAlignment = 1;
                    tposterior.AddCell(cell);

                    cell = new PdfPCell(new Phrase(objE.FAMILIARM.ToUpper(), titleSmall6B));
                    cell.Border = 0;
                    tposterior.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Caracteristicas", titleSmall6B));
                    cell.Border = 0;
                    cell.Colspan = 3;
                    cell.PaddingTop = 5;
                    cell.PaddingBottom = 5;
                    cell.PaddingLeft = 12;
                    tposterior.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Raza", titleSmall6));
                    cell.Border = 0;
                    cell.PaddingLeft = 12;
                    tposterior.AddCell(cell);

                    cell = new PdfPCell(new Phrase("-", titleSmall6));
                    cell.Border = 0;
                    cell.HorizontalAlignment = 1;
                    tposterior.AddCell(cell);

                    cell = new PdfPCell(new Phrase(objE.RAZA.ToUpper(), titleSmall6B));
                    cell.Border = 0;
                    tposterior.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Calificación", titleSmall6));
                    cell.Border = 0;
                    cell.PaddingLeft = 12;
                    tposterior.AddCell(cell);

                    cell = new PdfPCell(new Phrase("-", titleSmall6));
                    cell.Border = 0;
                    cell.HorizontalAlignment = 1;
                    tposterior.AddCell(cell);

                    var calificacion = objE.CALIFICACION;
                    switch (calificacion)
                    {
                        case "Rojo":
                            calificacion = "AGRESIVO"; break;
                        case "Verde":
                            calificacion = "AMISTOSO"; break;
                        case "Blanco":
                            calificacion = "DISCAPACITADO"; break;
                        case "Azul":
                            calificacion = "ENTRENADO"; break;
                        case "Amarillo":
                            calificacion = "MIEDOSO"; break;
                        case "Naranja":
                            calificacion = "PELEADOR"; break;
                    }

                    cell = new PdfPCell(new Phrase(calificacion.ToUpper(), titleSmall6B));
                    cell.Border = 0;
                    tposterior.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Pelaje", titleSmall6));
                    cell.Border = 0;
                    cell.PaddingLeft = 12;
                    tposterior.AddCell(cell);

                    cell = new PdfPCell(new Phrase("-", titleSmall6));
                    cell.Border = 0;
                    cell.HorizontalAlignment = 1;
                    tposterior.AddCell(cell);

                    cell = new PdfPCell(new Phrase(objE.COLOR, titleSmall6B));
                    cell.Border = 0;
                    tposterior.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Domicilio", titleSmall6));
                    cell.Border = 0;
                    cell.Colspan = 4;
                    cell.PaddingLeft = 12;
                    tposterior.AddCell(cell);

                    cell = new PdfPCell(new Phrase(objE.DIRECCION, titleSmall6B));
                    cell.Border = 0;
                    cell.Colspan = 4;
                    cell.PaddingLeft = 20;
                    tposterior.AddCell(cell);

                    //*******************************************************
                    //********** INICIO DIRECCION POSTERIOR *****************
                    //*******************************************************
                    PdfPTable tdireccion = new PdfPTable(3);
                    tdireccion.TotalWidth = 200f;
                    float[] widthsDireccion = new float[] { 100f, 50f, 50f };
                    tdireccion.SetWidths(widthsDireccion);
                    tdireccion.LockedWidth = true;
                    tdireccion.HorizontalAlignment = 0;
                    //tdireccion.SpacingBefore = 10f;

                    cell = new PdfPCell(new Phrase("Distrito", titleSmall6));
                    cell.Border = 0;
                    cell.PaddingLeft = 12;
                    tdireccion.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Provincia", titleSmall6));
                    cell.Border = 0;
                    tdireccion.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Departamento", titleSmall6));
                    cell.Border = 0;
                    tdireccion.AddCell(cell);

                    cell = new PdfPCell(new Phrase(objE.DISTRITO, titleSmall6B));
                    cell.Border = 0;
                    cell.PaddingLeft = 12;
                    tdireccion.AddCell(cell);

                    cell = new PdfPCell(new Phrase(objE.PROVINCIA, titleSmall6B));
                    cell.Border = 0;
                    tdireccion.AddCell(cell);

                    cell = new PdfPCell(new Phrase(objE.DEPARTAMENTO, titleSmall6B));
                    cell.Border = 0;
                    tdireccion.AddCell(cell);


                    doc.Add(table);
                    doc.Add(tbody);
                    doc.Add(tmayor);
                    doc.Add(tposterior);
                    doc.Add(tdireccion);

                    doc.Close();
                    //}
                    //}

                    Response.ContentType = "application/pdf";
                    Response.OutputStream.Write(ms.GetBuffer(), 0, ms.GetBuffer().Length);
                    Response.OutputStream.Flush();
                    Response.OutputStream.Close();

                }
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
    }
}