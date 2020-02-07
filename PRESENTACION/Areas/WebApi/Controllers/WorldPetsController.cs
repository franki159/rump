using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PRESENTACION.Areas.WebApi.Controllers
{
    //[RoutePrefix("Api/WorldPets")]

    public class WorldPetsController : ApiController
    {
        //WEB 
        [HttpGet]
        [Route("mObtenerImagenes")]
        public object mObtenerImagenes()
        {
            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mObtenerImagenes();
                //object objRpta = mLogic.mBuscarCitas("", "", "", "");
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }


        //MOBIL
        [HttpGet]
        [Route("mObtenerMascotas")]
        public object mObtenerMascotas()
        {
            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mObtenerMascotas();
                //object objRpta = mLogic.mBuscarCitas("", "", "", "");
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }


        [HttpGet]
        [Route("DownloadFileFTP/{sTag}")]
        public object DownloadFileFTP(string sTag)
        {
            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                //object objRpta = mLogic.DownloadFileFTP();
                mLogic.DownloadFileFTP(sTag);
                //object objRpta = mLogic.mBuscarCitas("", "", "", "");
                //modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }



        [HttpPost]
        public IHttpActionResult mMascotaExtraviada(MascotaExtraviada mod)
        {
            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mMascotaExtraviada(mod);
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }


        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


        public object mAutenticationGoogle([FromBody] string valueJson)
        {

            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            try
            {

                AutenticationGoogle objValue = JsonConvert.DeserializeObject<AutenticationGoogle>(valueJson);

                object objRpta = mLogic.mAutenticationGoogle(objValue);

                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = null;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }



        [HttpPost]
        public IHttpActionResult mLogin_(Login mod)
        {
            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mLogin(mod);
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }


        [HttpGet]
        [Route("mLogin/{sUsuario}/{sPassword}")]
        public object mLogin(string sUsuario, string sPassword)
        {
            sUsuario = sUsuario.Replace(",", ".");
            sPassword = sPassword.Replace(",", ".");
            
            Login mod = new Login();
            mod.sUsuario = sUsuario;
            mod.sPassword = sPassword;

            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mLogin(mod);
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }

        [HttpGet]
        [Route("mObtener_Mascotas_Usuario/{sUsuarioId}")]
        public object mObtener_Mascotas_Usuario(string sUsuarioId)
        {
            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mObtener_Mascotas_Usuario(sUsuarioId);
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }

        [HttpGet]
        [Route("mObtener_Mascotas_Galeria_Id/{sUsuarioId}/{sMascotaId}")]
        public object mObtener_Mascotas_Galeria_Id(string sUsuarioId, string sMascotaId)
        {
            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mObtener_Mascotas_Galeria_Id(sUsuarioId, sMascotaId);
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }





        //[HttpGet]
        //[Route("mObtenerMisMascotas/{sUsuarioId}")]
        //public object mObtenerMisMascotas(string sUsuarioId)
        //{
        //    object objResult = null;

        //    Model modeloRpta = new Model();
        //    Logic mLogic = new Logic();

        //    DataTable dt = new DataTable("DATA");
        //    object obj = new object();

        //    try
        //    {
        //        object objRpta = mLogic.mObtenerMisMascotas(sUsuarioId);
        //        //object objRpta = mLogic.mBuscarCitas("", "", "", "");
        //        modeloRpta = (Model)objRpta;

        //        objResult = modeloRpta;
        //    }
        //    catch (Exception ex)
        //    {
        //        modeloRpta.bEstado = false;
        //        modeloRpta.iCodigo = 1;
        //        modeloRpta.sRpta = ex.Message.ToString();
        //        modeloRpta.obj = obj;
        //        objResult = modeloRpta;
        //    }

        //    return Json(objResult);
        //}



        [HttpGet]
        [Route("mMascota_Info_Detalle_Dni/{sDNI}")]
        public object mMascota_Info_Detalle_Dni(string sDNI)
        {
            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mMascota_Info_Detalle_Dni(sDNI);
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }



        //::::::::::::::::::::::::



        [HttpGet]
        [Route("mTipo")]
        public object mTipo()
        {
            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mTipo();
                //object objRpta = mLogic.mBuscarCitas("", "", "", "");
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }



        [HttpGet]
        [Route("mRaza/{sTipoID}")]
        public object mRaza(string sTipoID)
        {
            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mRaza(sTipoID);
                //object objRpta = mLogic.mBuscarCitas("", "", "", "");
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }


        [HttpGet]
        [Route("mObtenerImagenes_filtro/{sTipoID}/{sRazaID}")]
        public object mObtenerImagenes_filtro(string sTipoID, string sRazaID)
        {
            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mObtenerImagenes_filtro(sTipoID, sRazaID);
                //object objRpta = mLogic.mBuscarCitas("", "", "", "");
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }



        [HttpGet]
        [Route("mObtenerMascotasExtraviadas")]
        public object mObtenerMascotasExtraviadas()
        {
            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mObtenerMascotasExtraviadas();
                //object objRpta = mLogic.mBuscarCitas("", "", "", "");
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }



        [HttpGet]
        [Route("mEliminarMascota/{sUsuarioID}")]
        public object mEliminarMascota(string sUsuarioID)
        {
            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mEliminarMascota(sUsuarioID);
                //object objRpta = mLogic.mBuscarCitas("", "", "", "");
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }


        [HttpGet]
        [Route("mSolicitudes/{sMascotaId}/{sUsuarioId}/{iOpcionTipo}")]
        public object mSolicitudes(string sMascotaId, string sUsuarioId, int iOpcionTipo)
        {
            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mSolicitudes(sMascotaId, sUsuarioId, iOpcionTipo);
                //object objRpta = mLogic.mBuscarCitas("", "", "", "");
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }



        [HttpGet]
        [Route("mCrearMascota/{sNombre}/{sApellido}/{sSexo}/{sColor}/{sBiografia}/{sFecha}/{sRazaId}/{sUsuarioId}/{sExtensionImg}")]
        public object mCrearMascota(string sNombre, string sApellido, string sSexo, string sColor, string sBiografia
                            , string sFecha, string sRazaId, string sUsuarioId, string sExtensionImg)
        {
            sBiografia = sBiografia.Replace(",", ".");
          

            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mCrearMascota(sNombre,  sApellido,  sSexo,  sColor,  sBiografia
                                                ,sFecha,  sRazaId,  sUsuarioId,  sExtensionImg);
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }

        public object mCrearMascota([FromBody] string valueJson)
        {

            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            try
            {

                CrearMascota objValue = JsonConvert.DeserializeObject<CrearMascota>(valueJson);

                object objRpta = mLogic.mCrearMascota(objValue);

                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = null;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }







        [HttpGet]
        [Route("mObtenerDetalleEditarMascota/{sMascotaId}")]
        public object mObtenerDetalleEditarMascota(string sMascotaId)
        {

            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mObtenerDetalleEditarMascota( sMascotaId);
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }



        [HttpGet]
        [Route("mEditarMascota/{sNombre}/{sApellido}/{sSexo}/{sColor}/{sBiografia}/{sFecha}/{sMascotaId}")]
        public object mEditarMascota(string sNombre, string sApellido, string sSexo, string sColor, string sBiografia
                         , string sFecha,  string sMascotaId)
        {
            sBiografia = sBiografia.Replace(",", ".");


            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mEditarMascota(sNombre, sApellido, sSexo, sColor, sBiografia
                                                , sFecha, sMascotaId);
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }





        public object mReportarMascotaPerdida([FromBody] string valueJson)
        {
          
            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();
            
            try
            {

               ReportarMascotaPerdida objValue = JsonConvert.DeserializeObject<ReportarMascotaPerdida>(valueJson);

                object objRpta = mLogic.mReportarMascotaPerdida(objValue);

                modeloRpta = (Model)objRpta;
                
                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = null;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }

        [HttpGet]
        [Route("mMascotaFallecio/{sMascotaId}")]
        public object mMascotaFallecio(string sMascotaId)
        {

            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mMascotaFallecio(sMascotaId);
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }

        [HttpGet]
        [Route("mMascotaEnAdopcion/{sMascotaId}")]
        public object mMascotaEnAdopcion(string sMascotaId)
        {

            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mMascotaEnAdopcion(sMascotaId);
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }

        [HttpGet]
        [Route("mMascotaQuitarEnAdopcion/{sMascotaId}")]
        public object mMascotaQuitarEnAdopcion(string sMascotaId)
        {

            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mMascotaQuitarEnAdopcion(sMascotaId);
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }




        [HttpGet]
        [Route("mBuscadorMascota/{sDNI}")]
        public object mBuscadorMascota(string sDNI)
        {

            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mBuscadorMascota(sDNI);
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }



        [HttpGet]
        [Route("mDepartamento")]
        public object mDepartamento()
        {

            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mDepartamento();
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }

        [HttpGet]
        [Route("mProvincia/{sDepartamento}")]
        public object mProvincia(string sDepartamento)
        {
            sDepartamento = sDepartamento.Replace("_"," ");
            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mProvincia(sDepartamento);
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }

        [HttpGet]
        [Route("mDistrito/{sDepartamento}/{sProvincia}")]
        public object mDistrito(string sDepartamento, string sProvincia)
        {
            sDepartamento = sDepartamento.Replace("_", " ");
            sProvincia = sProvincia.Replace("_", " ");

            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mDistrito(sDepartamento, sProvincia);
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }



        [HttpGet]
        [Route("mClinica")]
        public object mClinica()
        {

            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mClinica();
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }

        [HttpGet]
        [Route("mMedico")]
        public object mMedico()
        {

            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mMedico();
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }




        public object mGenerarCitaMedica([FromBody] string valueJson)
        {

            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            try
            {

                CitaMedica objValue = JsonConvert.DeserializeObject<CitaMedica>(valueJson);

                object objRpta = mLogic.mGenerarCitaMedica(objValue);

                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = null;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }


        [HttpGet]
        [Route("mAgregarImagenesMascota/{sMascotaId}")]
        public object mAgregarImagenesMascota(string sMascotaId)
        {

            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mAgregarImagenesMascota(sMascotaId);
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }


        public object mCrearUsuario([FromBody] string valueJson)
        {

            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            try
            {

                UsuarioCrear objValue = JsonConvert.DeserializeObject<UsuarioCrear>(valueJson);

                object objRpta = mLogic.mCrearUsuario(objValue);

                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = null;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }


        [HttpGet]
        [Route("mObtenerMascotasEnAdopcion/{sTamanio}/{sRaza}/{sTipo}/{sSexo}/{sCalificacion}")]
        public object mObtenerMascotasEnAdopcion(string sTamanio, string sRaza, string sTipo,
                                                string sSexo, string sCalificacion)
        {

            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mObtenerMascotasEnAdopcion(sTamanio, sRaza, sTipo, sSexo, sCalificacion);
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }


        public object mEditarMascota([FromBody] string valueJson)
        {

            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            try
            {

                EditarMascota objValue = JsonConvert.DeserializeObject<EditarMascota>(valueJson);

                object objRpta = mLogic.mEditarMascota(objValue);

                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = null;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }



        public object mAgregarClinica([FromBody] string valueJson)
        {

            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            try
            {

                AgregarClinica objValue = JsonConvert.DeserializeObject<AgregarClinica>(valueJson);

                object objRpta = mLogic.mAgregarClinica(objValue);

                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = null;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }


        public object mAgregarMedico([FromBody] string valueJson)
        {

            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            try
            {

                AgregarMedico objValue = JsonConvert.DeserializeObject<AgregarMedico>(valueJson);

                object objRpta = mLogic.mAgregarMedico(objValue);

                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = null;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }


        [HttpGet]
        [Route("mEliminarFotoGaleria/{sGaleriaFotoId}")]
        public object mEliminarFotoGaleria(string sGaleriaFotoId)
        {

            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mEliminarFotoGaleria(sGaleriaFotoId);
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }


        [HttpGet]
        [Route("mObtenerHistorial/{sMascotaId}")]
        public object mObtenerHistorial(string sMascotaId)
        {

            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mObtenerHistorial(sMascotaId);
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }


        //GET RETROFIT 2

        [HttpGet]
        [Route("mEvento_Cronograma")]
        public object mEvento_Cronograma(string sUsuarioId)
        {
            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mEvento_Cronograma(sUsuarioId);
                //object objRpta = mLogic.mBuscarCitas("", "", "", "");
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }


        [HttpGet]
        [Route("mObtener_Info_Dialog_Cronograma")]
        public object mObtener_Info_Dialog_Cronograma(string sUsuarioId)
        {
            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mObtener_Info_Dialog_Cronograma(sUsuarioId);
                //object objRpta = mLogic.mBuscarCitas("", "", "", "");
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }
        

        public object mGuardarCronograma([FromBody] string valueJson)
        {

            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            try
            {

                EventoCrear objValue = JsonConvert.DeserializeObject<EventoCrear>(valueJson);

                object objRpta = mLogic.mGuardarCronograma(objValue);

                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = null;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }

        [HttpGet]
        [Route("mEvento_Cronograma_usuario_fecha")]
        public object mEvento_Cronograma_usuario_fecha(string sUsuarioId, string sFecha)
        {
            object objResult = null;

            Model modeloRpta = new Model();
            Logic mLogic = new Logic();

            DataTable dt = new DataTable("DATA");
            object obj = new object();

            try
            {
                object objRpta = mLogic.mEvento_Cronograma_usuario_fecha(sUsuarioId, sFecha);
                //object objRpta = mLogic.mBuscarCitas("", "", "", "");
                modeloRpta = (Model)objRpta;

                objResult = modeloRpta;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.Message.ToString();
                modeloRpta.obj = obj;
                objResult = modeloRpta;
            }

            return Json(objResult);
        }


    }
}
