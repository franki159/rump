using System;
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

namespace PRESENTACION.page.proceso
{
    public partial class visorWeb : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (Session["UserRump"] == null) Response.Redirect("~/login.aspx");

                var num_dni = Request.QueryString["numIdentify"];

                EMascota objE = new EMascota();
                objE.DNI = num_dni;
                //EUsuario eSession = (EUsuario)HttpContext.Current.Session["UserData"];
                objE = NMascota.ObtenerMascotaxDNI(objE);

                using (MemoryStream ms = new MemoryStream())
                {
                    using (var doc = new Document(PageSize.LETTER, 25, 20, 20, 20))
                    {
                        using (PdfWriter w = PdfWriter.GetInstance(doc, ms))
                        {
                            doc.Open();
                            //Estilos
                            var titleHeader = FontFactory.GetFont("Arial", 7, Font.BOLD, new BaseColor(76, 76, 76));
                            var titleRUMP = FontFactory.GetFont("Arial", 7, Font.BOLD, new BaseColor(0, 0, 0));
                            var titleSmall7B = FontFactory.GetFont("Arial", 7, Font.BOLD, new BaseColor(0, 0, 0));
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

                            cell = new PdfPCell(new Phrase("RUMP - " + objE.DNI + "-" + (objE.SEXO == "Macho"?"1":"2"), titleRUMP));
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

                            var dniSeparado = "";

                            for (int i = 0; i < objE.DNI.Length; i++)
                                dniSeparado += objE.DNI.Substring(i, 1) + " ";

                            cell = new PdfPCell(new Phrase(dniSeparado.Trim(), numDNI));
                            cell.Border = 0;
                            cell.Rotation = -90;
                            cell.HorizontalAlignment = 1;
                            tbody.AddCell(cell);

                            var imgMascota = iTextSharp.text.Image.GetInstance(Server.MapPath("~/img/mascota/"+ objE.lMASCOTA[0].FOTO));
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

                            cell = new PdfPCell(new Phrase("Sexo " + objE.SEXO.Substring(0,1), titleSmall6B));
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
                            cell.PaddingTop = 6;
                            cell.HorizontalAlignment = 1;
                            tFechas.AddCell(cell);

                            cell = new PdfPCell(new Phrase(objE.FEC_NAC.Value.ToString("dd MM yyyy"), titleSmall5B));
                            cell.Border = 0;
                            cell.HorizontalAlignment = 1;
                            cell.PaddingTop = -2;
                            tFechas.AddCell(cell);

                            cell = new PdfPCell(new Phrase("Fecha de Caducidad", titleSmall5));
                            cell.Border = 0;
                            cell.PaddingTop = 6;
                            cell.HorizontalAlignment = 1;
                            tFechas.AddCell(cell);

                            cell = new PdfPCell(new Phrase(objE.FEC_NAC.Value.AddYears(1).ToString("dd MM yyyy"), fechaCaducidad));
                            cell.Border = 0;
                            cell.HorizontalAlignment = 1;
                            cell.PaddingTop = -2;
                            tFechas.AddCell(cell);

                            var imgMascotaSmall = iTextSharp.text.Image.GetInstance(Server.MapPath("~/img/mascota/"+ objE.lMASCOTA[0].FOTO));
                            imgMascotaSmall.ScaleAbsolute(33, 41);
                            imgMascotaSmall.SpacingBefore = 10f;
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

                            cell = new PdfPCell(new Phrase(objE.TIPO.Substring(0, 1) + "<PER" + objE.APELLIDO.Replace(" ", "") + "<<<<<<"+ objE.NOMBRE.ToUpper() +"<<", titleSmall7B));
                            cell.Border = 0;
                            cell.PaddingTop = -6;
                            cell.PaddingLeft = 18;
                            tmayor.AddCell(cell);

                            cell = new PdfPCell(new Phrase(objE.DNI + "<1<<<<<<<<<<<<<<<<<", titleSmall7B));
                            cell.Border = 0;
                            cell.PaddingLeft = 18;
                            cell.PaddingTop = -2;
                            tmayor.AddCell(cell);
                            //*******************************************************
                            //********** INICIO PARTE POSTERIOR *********************
                            //*******************************************************
                            PdfPTable tposterior = new PdfPTable(4);
                            tposterior.TotalWidth = 250f;
                            float[] widthsPosterior = new float[] { 45f, 15f, 100f, 90f };
                            tposterior.SetWidths(widthsPosterior);
                            tposterior.LockedWidth = true;
                            tposterior.HorizontalAlignment = 0;
                            tposterior.SpacingBefore = 60f;

                            cell = new PdfPCell(new Phrase("Madre", titleSmall6));
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

                            cell = new PdfPCell(new Phrase("Padre", titleSmall6));
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

                            cell = new PdfPCell(new Phrase(objE.RAZA, titleSmall6B));
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

                            var calificacion  = objE.CALIFICACION;
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
                        }
                    }

                    Response.ContentType = "application/pdf";
                    Response.OutputStream.Write(ms.GetBuffer(), 0, ms.GetBuffer().Length);
                    Response.OutputStream.Flush();
                    Response.OutputStream.Close();

                }
            }
            catch (Exception ex)
            {
                Response.Write(ex.Message);
            }
        }
    }
}