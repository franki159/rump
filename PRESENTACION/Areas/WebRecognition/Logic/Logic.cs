using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

using System.Net.Http;
using Newtonsoft.Json;
using System.Text;
using System.Net.Http.Headers;
using System.Net;
using System.IO;
namespace PRESENTACION.Areas.WebRecognition
{
    public class Logic
    {

        public object mObtenerImagenes()
        {
            object objRpta = null;

            Model modeloRpta = new Model();

            try
            {
                string sUrlWebApi = ConfigurationManager.ConnectionStrings["Url_WebApi"].ConnectionString.ToString();

                HttpClient http = new HttpClient();
                var response = http.GetAsync(sUrlWebApi + "mObtenerImagenes").Result;
                string sJson = response.Content.ReadAsStringAsync().Result;
                object data = JsonConvert.DeserializeObject<Model>(sJson);

                modeloRpta = (Model)data;

                objRpta = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;

                objRpta = modeloRpta;
            }

            return objRpta;
        }

        public object mTipo()
        {
            object objRpta = null;

            Model modeloRpta = new Model();

            try
            {
                string sUrlWebApi = ConfigurationManager.ConnectionStrings["Url_WebApi"].ConnectionString.ToString();

                HttpClient http = new HttpClient();
                var response = http.GetAsync(sUrlWebApi + "mTipo").Result;
                string sJson = response.Content.ReadAsStringAsync().Result;
                object data = JsonConvert.DeserializeObject<Model>(sJson);

                modeloRpta = (Model)data;

                objRpta = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;

                objRpta = modeloRpta;
            }

            return objRpta;
        }


        public object mRaza(string sTipoID)
        {
            object objRpta = null;

            Model modeloRpta = new Model();

            try
            {
                string sUrlWebApi = ConfigurationManager.ConnectionStrings["Url_WebApi"].ConnectionString.ToString();

                string sParamentros = "/" + sTipoID;
                HttpClient http = new HttpClient();
                var response = http.GetAsync(sUrlWebApi + "mRaza" + sParamentros).Result;
                string sJson = response.Content.ReadAsStringAsync().Result;
                object data = JsonConvert.DeserializeObject<Model>(sJson);

                modeloRpta = (Model)data;

                objRpta = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;

                objRpta = modeloRpta;
            }

            return objRpta;
        }


        public object mObtenerImagenes_filtro(string sTipoID, string sRazaID)
        {
            object objRpta = null;

            Model modeloRpta = new Model();

            try
            {
                sTipoID = sTipoID == "" ? "-1" : sTipoID;
                sRazaID = sRazaID == "" ? "-1" : sRazaID;

                string sUrlWebApi = ConfigurationManager.ConnectionStrings["Url_WebApi"].ConnectionString.ToString();

                string sParamentros = "/" + sTipoID + "/" + sRazaID;

                HttpClient http = new HttpClient();
                var response = http.GetAsync(sUrlWebApi + "mObtenerImagenes_filtro" + sParamentros).Result;
                string sJson = response.Content.ReadAsStringAsync().Result;
                object data = JsonConvert.DeserializeObject<Model>(sJson);

                modeloRpta = (Model)data;

                objRpta = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;

                objRpta = modeloRpta;
            }

            return objRpta;
        }


    }
}