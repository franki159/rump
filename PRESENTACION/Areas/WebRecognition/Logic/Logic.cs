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
namespace WebPetWorld_Recognition
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



    }
}