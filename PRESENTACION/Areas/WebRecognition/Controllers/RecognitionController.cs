using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace PRESENTACION.Areas.WebRecognition.Controllers
{
    public class RecognitionController : Controller
    {
        // GET: Recognition
        public ActionResult Index()
        {

            //TempData["Url_WebApi"] = ConfigurationManager.ConnectionStrings["Url_WebApi"].ConnectionString.ToString();
            ViewBag.sUrl_WebAdmin = ConfigurationManager.ConnectionStrings["Url_WebAdmin"].ConnectionString.ToString();
            ViewBag.sUrl_WebApi = ConfigurationManager.ConnectionStrings["Url_WebApi"].ConnectionString.ToString();
            ViewBag.sUrl_Imagenes = ConfigurationManager.ConnectionStrings["Url_Imagenes"].ConnectionString.ToString();

            ViewBag.sConfiabilidad = ConfigurationManager.ConnectionStrings["Confiabilidad"].ConnectionString.ToString();

            return View();
        }

        public ActionResult Index2()
        {

            return View();
        }


        [HttpPost]
        public object mObtenerImagenes()
        {
            object objResult = null;
            string sError = "";
            Logic logic = new Logic();
            Model modeloRpta = new Model();

            try
            {
                object objRpta = logic.mObtenerImagenes();

                modeloRpta = (Model)objRpta;

            }
            catch (Exception ex)
            {
                sError = ex.Message.ToString();
                sError = Regex.Replace(sError, @"[^0-9A-Za-z]", " ", RegexOptions.None);
                sError = Regex.Replace(sError, @"[^\w\.@-]", " ", RegexOptions.None);
                sError = sError.Replace("'", "");

                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 500;
                modeloRpta.sRpta = sError;
                modeloRpta.obj = null;
            }

            string sjsonRpta = JsonConvert.SerializeObject(modeloRpta);

            objResult = sjsonRpta;//respiuesta de WepApi Rest-Full

            return Json(objResult);
        }


        [HttpPost]
        public object mCargarImagenes()
        {
            object objResult = "ok";

            return Json(objResult);
        }




        [HttpPost]
        public object mTipo()
        {
            object objResult = null;
            string sError = "";
            Logic logic = new Logic();
            Model modeloRpta = new Model();

            try
            {
                object objRpta = logic.mTipo();

                modeloRpta = (Model)objRpta;

            }
            catch (Exception ex)
            {
                sError = ex.Message.ToString();
                sError = Regex.Replace(sError, @"[^0-9A-Za-z]", " ", RegexOptions.None);
                sError = Regex.Replace(sError, @"[^\w\.@-]", " ", RegexOptions.None);
                sError = sError.Replace("'", "");

                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 500;
                modeloRpta.sRpta = sError;
                modeloRpta.obj = null;
            }

            string sjsonRpta = JsonConvert.SerializeObject(modeloRpta);

            objResult = sjsonRpta;//respiuesta de WepApi Rest-Full

            return Json(objResult);
        }

        [HttpPost]
        public object mRaza(string sTipoID)
        {
            object objResult = null;
            string sError = "";
            Logic logic = new Logic();
            Model modeloRpta = new Model();

            try
            {
                object objRpta = logic.mRaza(sTipoID);

                modeloRpta = (Model)objRpta;

            }
            catch (Exception ex)
            {
                sError = ex.Message.ToString();
                sError = Regex.Replace(sError, @"[^0-9A-Za-z]", " ", RegexOptions.None);
                sError = Regex.Replace(sError, @"[^\w\.@-]", " ", RegexOptions.None);
                sError = sError.Replace("'", "");

                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 500;
                modeloRpta.sRpta = sError;
                modeloRpta.obj = null;
            }

            string sjsonRpta = JsonConvert.SerializeObject(modeloRpta);

            objResult = sjsonRpta;//respiuesta de WepApi Rest-Full

            return Json(objResult);
        }


        [HttpPost]
        public object mObtenerImagenes_filtro(string sTipoID, string sRazaID)
        {
            object objResult = null;
            string sError = "";
            Logic logic = new Logic();
            Model modeloRpta = new Model();

            try
            {
                object objRpta = logic.mObtenerImagenes_filtro(sTipoID, sRazaID);

                modeloRpta = (Model)objRpta;

            }
            catch (Exception ex)
            {
                sError = ex.Message.ToString();
                sError = Regex.Replace(sError, @"[^0-9A-Za-z]", " ", RegexOptions.None);
                sError = Regex.Replace(sError, @"[^\w\.@-]", " ", RegexOptions.None);
                sError = sError.Replace("'", "");

                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 500;
                modeloRpta.sRpta = sError;
                modeloRpta.obj = null;
            }

            string sjsonRpta = JsonConvert.SerializeObject(modeloRpta);

            objResult = sjsonRpta;//respiuesta de WepApi Rest-Full

            return Json(objResult);
        }


    }
}