using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Cache;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Web;

namespace PRESENTACION.Areas.WebApi
{
    public class Logic
    {
         
        public object mObtenerImagenes()
        {
            object objRpta = null;

            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC SP_OBTENER_GALERIA_IMG ";

                object response = mDatoBD.mExceBD_SQL(sCMD);
                //string sJson = response.ToString();

                //object obj = JsonConvert.DeserializeObject<Model>(sJson);

                modeloRpta = (Model)response;

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
        
        public object mObtenerMascotas()
        {
            object objRpta = null;

            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();


            string sCMDX = "insert [log] (s) values('mObtenerMascotas - ini ') ";
            mDatoBD.mExceBD_SQL(sCMDX);

            try
            {
                
                string sCMD = "EXEC SP_OBTENER_MASCOTA_EXTRAVIADA ";
                
                object obj = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)obj;

               /* if (modeloRpta.bEstado)
                {
                    object objInfo = modeloRpta.obj;
                    string sJsonObj = JsonConvert.SerializeObject(objInfo);
                    DataTable dt = (DataTable)JsonConvert.DeserializeObject(sJsonObj, (typeof(DataTable)));

                    foreach (DataRow r in dt.Rows ) {
                        r["IMG"]= DownloadFileFTP(r["IMG"].ToString());
                    }

                    modeloRpta.obj = dt;
                }*/

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


                sCMDX = "insert [log] (s) values('mObtenerMascotas error: "+ ex.ToString()+" ') ";
                mDatoBD.mExceBD_SQL(sCMDX);
            }


             sCMDX = "insert [log] (s) values('mObtenerMascotas - fin ') ";
            mDatoBD.mExceBD_SQL(sCMDX);

            return objRpta;
        }
        

        public object mMascotaExtraviada(MascotaExtraviada mod)
        {
            object objRpta = null;

            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            string sCMD = "";


            sCMD = "insert [log] (s) values('mMascotaExtraviada Ini') ";
            mDatoBD.mExceBD_SQL(sCMD);


            try
            {
                string sTAG = mod.sTag;
                byte[] IMG_B = mod.IMG_B;


                sCMD = "insert [log] (s) values('mod.sTag: " + sTAG + "') ";
                mDatoBD.mExceBD_SQL(sCMD);                

                  sCMD = "insert [log] (s) values('byteArrayToImage "+ IMG_B.Length.ToString()+ "') ";
                mDatoBD.mExceBD_SQL(sCMD);
                
               /* Stream streamImg = ToStream(img, ImageFormat.Png);

                StreamReader rdr = new StreamReader(streamImg);
                byte[] fileData = Encoding.UTF8.GetBytes(rdr.ReadToEnd());*/

                //byte[] bytes = Encoding.UTF8.GetBytes(mod.byteArray_Img);
                //sCMD = "insert [log] (s) values('bytes.Length: " + bytes.Length + "') ";
                //mDatoBD.mExceBD_SQL(sCMD);

                /*
                string sCadCon = ConfigurationManager.ConnectionStrings["BD_PET"].ConnectionString.ToString();

                SqlConnection connection = new SqlConnection(sCadCon);                

                string sql = "Insert into TB_MASCOTA_EXTRAVIADA (TAG,IMG_BYTE) VALUES(@TAG, @IMG_BYTE); ";

                SqlCommand command = new SqlCommand(sql, connection);
                command.Parameters.AddWithValue("TAG", 3);
                command.Parameters.AddWithValue("IMG_BYTE", fileData);                
                connection.Open();
                command.ExecuteNonQuery();
                connection.Close();


                sql = "UPDATE TB_MASCOTA_EXTRAVIADA SET ID_NAME=@ID_NAME ";

                command = new SqlCommand(sql, connection);
                command.Parameters.AddWithValue("ID_NAME", "01");
                connection.Open();
                command.ExecuteNonQuery();
                connection.Close();


                connection.Open();
                SqlCommand cmd = new SqlCommand("Select top 1 IMG_BYTE from [TB_MASCOTA_EXTRAVIADA] where ID_NAME='01'", connection);
                byte[] datosImagen = (byte[])cmd.ExecuteScalar();
                MemoryStream ms = new MemoryStream(datosImagen);
                connection.Close();
                */

                SendFTP(DateTime.Now.ToString("yyyyMMdd_HHmmss")+"_img.png", IMG_B);

                objRpta = modeloRpta;

            }
            catch (Exception ex)
            {

                string sCMDx = "insert [log] (s) values('Error: " + ex.ToString() + "') ";
                mDatoBD.mExceBD_SQL(sCMDx);

                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;

                objRpta = modeloRpta;
            }


            sCMD = "insert [log] (s) values('mMascotaExtraviada fin') ";
            mDatoBD.mExceBD_SQL(sCMD);

            return objRpta;
        }

        
        public object mReportarMascota(string sTipo, string sDescripcion, string sLatitud, string sLongitud,
                                        string area, string cityName, string stateName, string countryName,
                                        string sUsuarioID, string sUsuarioNombre)
        {
           
            object objRpta = null;

            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            string sCMD = "";

            try
            {
                sCMD = "insert [log] (s) values('mReportarMascota Ini') ";
                mDatoBD.mExceBD_SQL(sCMD);

                sDescripcion = sDescripcion.Replace("_", " ");
                sLatitud = sLatitud.Replace("_", ".");
                sLongitud = sLongitud.Replace("_", ".");
                area = area.Replace("_", ".").Replace(";", " ");
                cityName = cityName.Replace("_", ".").Replace(";", " ");
                stateName = stateName.Replace("_", ".").Replace(";", " ");
                countryName = countryName.Replace("_", ".").Replace(";", " ");
                sUsuarioNombre = sUsuarioNombre.Replace("_", ".").Replace(";", " ");


                sCMD = "insert [log] (s) values('mReportarMascota prev iinsert') ";

                mDatoBD.mExceBD_SQL(sCMD);
                sCMD = "EXEC [SP_MASCOTA_EXTRAVIADA_INSERT] '" + sTipo + "','" + sDescripcion + "','" + sLatitud + "','" + sLongitud + "', "+
                                                            "'" + area + "','" + cityName + "','" + stateName + "','" + countryName + "', "+
                                                            "'" + sUsuarioID + "','" + sUsuarioNombre + "' ";                
                object obj = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)obj;

                /*if (modeloRpta.bEstado)
                {
                    object objInfo = modeloRpta.obj;
                    string sJsonObj = JsonConvert.SerializeObject(objInfo);
                    DataTable dt = (DataTable)JsonConvert.DeserializeObject(sJsonObj, (typeof(DataTable)));
                    
                }*/

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

            sCMD = "insert [log] (s) values('mReportarMascota fin') ";
            mDatoBD.mExceBD_SQL(sCMD);


            return objRpta;
        }





        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::.
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::.
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::.
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::.
        

        #region WEB_FUNCTIONS

        public object mTipo()
        {
            object objRpta = null;

            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                //https://worldpetsperu.com/storage/mascotas/00001000-FB_IMG_1556421773177.jpg

                string sCMD =
                            "EXEC SP_TIPO ";

                object obj = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)obj;

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
            Dato mDatoBD = new Dato();

            try
            {
                //https://worldpetsperu.com/storage/mascotas/00001000-FB_IMG_1556421773177.jpg

                string sCMD =
                            "EXEC SP_RAZA_TIPO '" + sTipoID + "' ";

                object obj = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)obj;

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
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC SP_OBTENER_GALERIA_IMG_FILTRO '"+ sTipoID + "','"+ sRazaID + "' ";

                object response = mDatoBD.mExceBD_SQL(sCMD);
                //string sJson = response.ToString();

                //object obj = JsonConvert.DeserializeObject<Model>(sJson);

                modeloRpta = (Model)response;

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


        public object mMascota_Info_Detalle_Dni(string sDNI)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC [SP_MASCOTA_INFO_DETALLE_DNI] '" + sDNI + "'  ";

                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }


        #endregion



        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::



        public object mAutenticationGoogle(AutenticationGoogle mod)
        {
            object objRpta = null;

            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC SP_MOBILE_LOGIN_AUT '" + mod.sEmailGoogle + "','"+ mod.iProceso+ "' ";

                object response = mDatoBD.mExceBD_SQL(sCMD);
                //string sJson = response.ToString();

                //object obj = JsonConvert.DeserializeObject<Model>(sJson);

                modeloRpta = (Model)response;

                object objInfo = modeloRpta.obj;
                string sJsonObj = JsonConvert.SerializeObject(objInfo);
                DataTable dt = (DataTable)JsonConvert.DeserializeObject(sJsonObj, (typeof(DataTable)));

                List<Usuario> list =new  List<Usuario>();
                foreach (DataRow row in dt.Rows )
                {
                    Usuario Usuario_ = new Usuario();
                    Usuario_.ID = row["ID"].ToString();
                    Usuario_.NOMBRE = row["NOMBRE"].ToString();
                    Usuario_.APELLIDO = row["APELLIDO"].ToString();
                    Usuario_.FECHA_NACIMIENTO = row["FECHA_NACIMIENTO"].ToString();
                    Usuario_.TELEFONO = row["TELEFONO"].ToString();
                    Usuario_.CELULAR = row["CELULAR"].ToString();
                    Usuario_.PASSWORD = row["PASSWORD"].ToString();

                    list.Add(Usuario_);
                }



                string sJsonData = JsonConvert.SerializeObject(modeloRpta.obj);
                modeloRpta.obj = sJsonData;// list;

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


        public object mLogin(Login mod)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC SP_MOBILE_LOGIN '" + mod.sUsuario + "','" + mod.sPassword + "'  ";

                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }
        
        //obtener mascotas por Id usuario
        public object mObtener_Mascotas_Usuario(string sUsuarioId)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC SP_MOBILE_MASCOTAS_USUARIO '" + sUsuarioId + "' ";

                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;                
            }

            return modeloRpta;
        }

        //obtener mascotas galeria por Id usuario, Id Macota
        public object mObtener_Mascotas_Galeria_Id(string sUsuarioId, string sMascotaId)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC SP_MOBILE_MASCOTAS_GALERIA_ID '" + sUsuarioId + "','" + sMascotaId + "'  ";

                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }


        public object mObtenerMascotasExtraviadas()
        {
            object objRpta = null;

            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
               
                string sCMD =
                            "EXEC SP_MOBILE_MASCOTAS_EXTRAVIADAS ";

                object obj = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)obj;

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

        public object mEliminarMascota(string sUsuarioID)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC SP_MOBILE_ELIMINAR_MASCOTA '" + sUsuarioID + "' ";

                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }


        public object mMascotaQuitarEnAdopcion(string sUsuarioID)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC [SP_MOBILE_MASCOTA_ADOPCION_ELIMINAR] '" + sUsuarioID + "' ";

                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }


        //public object mObtenerMisMascotas(string sUsuarioId)
        //{
        //    object objRpta = null;

        //    Model modeloRpta = new Model();
        //    Dato mDatoBD = new Dato();

        //    try
        //    {
        //        //https://worldpetsperu.com/storage/mascotas/00001000-FB_IMG_1556421773177.jpg

        //        string sCMD =
        //                    "SELECT " +
        //                    "t0.email,t0.nombre 'Nombre_Usuario',t0.apellido 'Apellido_Usuario' " +
        //                    ",t1.nombre 'Nombre_Mascota',t1.apellido 'Apellido_Mascota',t1.color ,t1.sexo " +
        //                    ",CONCAT('https://worldpetsperu.com/storage/mascotas/', t2.foto) 'foto_Mascota' " +
        //                    "FROM usuario as t0 " +
        //                    "left join mascota as t1 on t0.id = t1.usuario_id " +
        //                    "left join mascota_galeria as t2 on t1.id = t2.mascota_id " +
        //                    "where t0.id='" + sUsuarioId + "' ";

        //        object obj = mDatoBD.mExceBD_MySql(sCMD);

        //        modeloRpta = (Model)obj;

        //        objRpta = modeloRpta;
        //    }
        //    catch (Exception ex)
        //    {
        //        modeloRpta.bEstado = false;
        //        modeloRpta.iCodigo = 1;
        //        modeloRpta.sRpta = ex.ToString();
        //        //modeloRpta.dt = dt;
        //        modeloRpta.obj = null;

        //        objRpta = modeloRpta;


        //    }

        //    return objRpta;
        //}


        public object mSolicitudes(string sMascotaId, string sUsuarioId, int iOpcionTipo)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC [usp_solicitar_servicio] '" + sMascotaId + "','" + sUsuarioId + "','"+ iOpcionTipo + "'  ";

                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }

     

        public object mCrearMascota(string sNombre, string sApellido, string sSexo, string sColor, string sBiografia
                            , string sFecha, string sRazaId, string sUsuarioId, string sExtensionImg)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC [SP_MOBILE_CREAR_MASCOTA] " +
                                "'" + sNombre + "',"+
                                "'" + sApellido + "'," +
                                "'" + sSexo + "'," +
                                "'" + sColor + "'," +
                                "'" + sBiografia + "'," +
                                "'" + sFecha + "'," +
                                "'" + sRazaId + "'," +
                                "'" + sUsuarioId + "'," +
                                "'" + sExtensionImg + "'  ";

                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }

        public object mCrearMascota(CrearMascota value)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC [SP_MOBILE_CREAR_MASCOTA] " +
                "'" + value.sNombre + "'," +
                "'" + value.sApellido + "'," +
                "'" + value.sRazaId + "'," +
                "'" + value.sColor + "'," +
                "'" + value.sCalificacion + "'," +
                "'" + value.sNombrePadreHumano + "'," +
                "'" + value.sNombreMadreHumano + "'," +
                "'" + value.sDireccion + "'," +
                "'" + value.sReferencia + "'," +
                "'" + value.sDepartamento + "'," +
                "'" + value.sProvincia + "'," +
                "'" + value.sDistrito + "'," +
                "'" + value.sSexo + "'," +
                "'" + value.sBiografia + "'," +
                "'" + value.sFecha + "'," +
                "'" + value.sUsuarioId + "'," +
                "'" + value.sExtensionImg + "'  ";

                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }




        public object mObtenerDetalleEditarMascota( string sMascotaId)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC [SP_MOBILE_EDITAR_SELECT_MASCOTA] " +
                                "'" + sMascotaId + "'  ";

                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }
        
        public object mEditarMascota(string sNombre, string sApellido, string sSexo, string sColor, string sBiografia
                         , string sFecha, string sMascotaId)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC [SP_MOBILE_EDITAR_MASCOTA] " +
                                "'" + sNombre + "'," +
                                "'" + sApellido + "'," +
                                "'" + sSexo + "'," +
                                "'" + sColor + "'," +
                                "'" + sBiografia + "'," +
                                "'" + sFecha + "'," +
                                "'" + sMascotaId + "'  ";

                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }




        public object mReportarMascotaPerdida(ReportarMascotaPerdida value)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC [SP_MOBILE_REPORTAR_MASCOTA_PERDIDA] '" + value.sObservacion + "','" + value.sMascotaId + "','" + value.sFecha + "'  ";

                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }


        public object mMascotaFallecio(string sMascotaId)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC [SP_MOBILE_MASCOTA_FALLECIO] '" + sMascotaId + "' ";

                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }

        public object mMascotaEnAdopcion(string sMascotaId)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC [SP_MOBILE_MASCOTA_EN_ADOPCION] '" + sMascotaId + "' ";

                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }


        public object mBuscadorMascota(string sDNI)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC [SP_MOBILE_BUSCADOR_MASCOTA] '" + sDNI + "' ";

                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }


        public object mDepartamento()
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC [SP_MOBILE_DEPARTAMENTO]  ";

                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }

        public object mProvincia(string sDepartamento)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC [SP_MOBILE_PROVINCIA] '" + sDepartamento + "' ";

                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }

        public object mDistrito(string sDepartamento, string sProvincia)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC [SP_MOBILE_DISTRITO] '" + sDepartamento + "','" + sProvincia + "' ";

                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }


        public object mClinica()
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC [SP_MOBILE_CONVENIO_TIPO] '1'  ";

                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }

        public object mMedico()
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC [SP_MOBILE_MEDICO]  ";

                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }


        public object mGenerarCitaMedica(CitaMedica value)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                
                string sCMD = "EXEC [SP_MOBILE_CITA_MEDICA] " +

                "'" + value.sMascotaId + "'," +
                "'" + value.sUsuario + "'," +
                "'" + value.sMedicoId + "'," +
                "'" + value.sClinicaId + "'," +
                "'" + value.sTipoCita + "'," +
                "'" + value.sFechaCita + "'," +

                "'" + value.sMotivo + "'," +
                "'" + value.sPeso + "'," +
                "'" + value.sTemperatura + "'," +
                "'" + value.sSintomas + "'," +
                "'" + value.sDiagnostico + "'," +
                "'" + value.sTratamiento + "'," +
                "'" + value.sObservaciones + "'," +
                "'" + value.sAntecedente + "'," +
                "'" + value.sFormnula + "'";
                
                /*
                string sCMD = "EXEC [usp_mnt_cita_medica] " +
                "" +0 + "," +
                "'" + value.sFechaCita + "'," +
                "" + value.sMascotaId + "," +
                "" + value.sClinicaId + "," +
                "" + value.sMedicoId + "," +
                "'" + value.sTipoCita + "'," +
                "'" + value.sMotivo + "'," +
                "'" + value.sPeso + "'," +
                "'" + value.sTemperatura + "'," +
                "'" + value.sSintomas + "'," +
                "'" + value.sDiagnostico + "'," +
                "'" + value.sTratamiento + "'," +
                "'" + value.sObservaciones + "'," +
                "'" + value.sAntecedente + "'," +
                "'" + value.sFormnula + "'," +
                "'" + value.sUsuario + "'," +
                "'" + 1 + "'";
                */

                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }


        public object mAgregarImagenesMascota(string sMascotaId)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC [SP_MOBILE_AGREGAR_IMAGEN_MASCOTA] '" + sMascotaId + "'  ";

                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }


        public object mCrearUsuario(UsuarioCrear mod)
        {
            object objRpta = null;

            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC [SP_MOBILE_CREAR_USUARIO] "+
                                "'" + mod.sNombre + "', "+
                                "'" + mod.sApellidos + "', " +
                                "'" + mod.sEmail + "', " +
                                "'" + mod.sNumeroTlf + "', " +
                                "'" + mod.sNumDoc + "', " +
                                "'" + mod.sSEXO + "' ";

                object response = mDatoBD.mExceBD_SQL(sCMD);
                //string sJson = response.ToString();

                //object obj = JsonConvert.DeserializeObject<Model>(sJson);

                modeloRpta = (Model)response;

                object objInfo = modeloRpta.obj;
                string sJsonObj = JsonConvert.SerializeObject(objInfo);
                DataTable dt = (DataTable)JsonConvert.DeserializeObject(sJsonObj, (typeof(DataTable)));

                if (dt.Rows.Count <= 0)
                {
                    modeloRpta.iCodigo = 400;
                }

                string sJsonData = JsonConvert.SerializeObject(modeloRpta.obj);
                modeloRpta.obj = sJsonData;// list;

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

        public object mObtenerMascotasEnAdopcion(string sTamanio, string sRaza, string sTipo,
                                                string sSexo, string sCalificacion)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC [SP_MOBILE_EN_ADOPCION_LISTA] '"+ sTamanio + "','" + sRaza + "','" + sTipo + "','" + sSexo + "','" + sCalificacion + "'  ";

                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }



        public object mEditarMascota(EditarMascota Value)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
//public string sPadreHumano = "";
//public string sPadreHumanoDni = "";
//public string sPadreHumanoTlf = "";
//public string sMadreHumano = "";
//public string sMadreHumanoDni = "";
//public string sMadreHumanoTlf = "";
//public string sDepartamento = "";
//public string sProvincia = "";
//public string sDistrito = "";
//public string sDireccion = "";
//public string sPiso = "";
//public string sReferencia = "";

        string sCMD = "EXEC [SP_MOBILE_EDITAR_MASCOTA] " +
                                "'" + Value.sNombre + "'," +
                                "'" + Value.sApellido + "'," +
                                "'" + Value.sSexo + "'," +
                                "'" + Value.sColor + "'," +
                                "'" + Value.sBiografia + "'," +
                                "'" + Value.sFechaNacimiento + "'," +
                                "'" + Value.sMascotaId + "'," +
                                 
                                "'" + Value.sPadreHumano + "'," +
                                "'" + Value.sPadreHumanoDni + "'," +
                                "'" + Value.sPadreHumanoTlf + "'," +
                                "'" + Value.sMadreHumano + "'," +
                                "'" + Value.sMadreHumanoDni + "'," +
                                "'" + Value.sMadreHumanoTlf + "'," +

                                "'" + Value.sDepartamento + "'," +
                                "'" + Value.sProvincia + "'," +
                                "'" + Value.sDistrito + "'," +
                                "'" + Value.sDireccion + "'," +
                                "'" + Value.sPiso + "'," +
                                "'" + Value.sReferencia + "'," +


                                 "'" + Value.Castrado + "'," +

                                "'" + Value.Visita + "'," +
                                "'" + Value.AlergiaMedicamento + "'," +
                                "'" + Value.Vacunacion + "'," +
                                "'" + Value.Antirrabica + "'," +
                                "'" + Value.Alergia + "'," +
                                "'" + Value.Enfermedad + "'," +
                                "'" + Value.Quintuple + "'," +
                                "'" + Value.Sextuple + "'," +
                                "'" + Value.Triplefel + "'," +
                                "'" + Value.Leuccemia + "'," +
                                "'" + Value.LimpDental + "'," +

                                "'" + Value.sEnfermedadDesc + "'," +
                                "'" + Value.sAlergiaDesc + "'," +

                                 "'" + Value.sFechaDeparacitacion + "'," +

                                    // "'" + Value.sFechaDeparacitacion + "'";

                                "'" + Value.sFechaQuintuple + "'," +
                                "'" + Value.sFechaSextuple + "'," +
                                "'" + Value.sFechaTripleFel + "'," +
                                "'" + Value.sFechaLeucemia + "'," +

                                "'" + Value.sFechaAntirrabica + "' ";

                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }


        public object mAgregarClinica(AgregarClinica Value)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC [SP_MOBILE_CLINICA_AGREGAR] " +
                                    "'" + Value.sNombre + "'," +
                                    "'" + Value.sTelefono + "'," +
                                    "'" + Value.sUsuarioId + "'," +

                                    "'" + Value.sDepartamento + "'," +
                                    "'" + Value.sProvincia + "'," +
                                    "'" + Value.sDistrito + "'," +
                                    "'" + Value.sDireccion + "' ";


                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }


        public object mAgregarMedico(AgregarMedico Value)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                

                string sCMD = "EXEC [SP_MOBILE_MEDICO_AGREGAR] " +
                                        "'" + Value.sNombre + "'," +
                                        "'" + Value.sApellido + "'," +
                                        "'" + Value.sTelefono + "'," +
                                         "'" + Value.sUsuarioId + "'," +
                                        "'" + Value.sCodigo + "' ";

                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }


        public object mEliminarFotoGaleria(string sMascotaId)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC [SP_MOBILE_ELIMINAR_FOTO_GALERIA] '" + sMascotaId + "'  ";

                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }



        public object mObtenerHistorial(string sMascotaId)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC [SP_MOBILE_HISTORIAL_MEDICO] '" + sMascotaId + "'  ";

                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }



        public object mEvento_Cronograma(string sUsuarioId)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC [SP_MOBILE_EVENTO_CRONOGRAMA_USUARIO] '" + sUsuarioId + "'  ";

                object response = mDatoBD.mExceBD_SQL_MT(sCMD);
               
                modeloRpta = (Model)response;

                if (modeloRpta.bEstado == false)
                    return modeloRpta;

                DataSet ds = (DataSet)modeloRpta.obj;
                
                List<Evento> Evento_ = ds.Tables[0].AsEnumerable().Select(m => new Evento()
                {
                    ID = m.Field<decimal>("ID").ToString(),
                    EVENTO_TIPO_ID = m.Field<decimal>("EVENTO_TIPO_ID").ToString(),
                    MASCOTA_ID = m.Field<decimal>("MASCOTA_ID").ToString(),
                    EVENTO_PERIODO_ID = m.Field<decimal>("EVENTO_PERIODO_ID").ToString(),
                    FECHA_INICIO = m.Field<DateTime>("FECHA_INICIO").ToString(),
                    FECHA_FIN = m.Field<DateTime>("FECHA_FIN").ToString(),
                    TITULO = m.Field<string>("TITULO"),
                    DETALLE = m.Field<string>("DETALLE"),
                    ESTADO = m.Field<int>("ESTADO")
                }).ToList();
                

                List<Evento_Detalle> Evento_Detalle_ = ds.Tables[1].AsEnumerable().Select(m => new Evento_Detalle()
                {
                    EVENTO_ID = m.Field<decimal>("EVENTO_ID").ToString(),
                    FECHA_INICIO = m.Field<string>("FECHA_INICIO"),
                    FECHA_FIN = m.Field<DateTime>("FECHA_FIN").ToString(),
                    ESTADO = m.Field<int>("ESTADO")
                }).ToList();

                Evento_Cronograma Evento_Cronograma_ = new Evento_Cronograma();
                Evento_Cronograma_.Evento_ = Evento_;
                Evento_Cronograma_.Evento_Detalle_ = Evento_Detalle_;

                string sJsonData = JsonConvert.SerializeObject(Evento_Cronograma_);
                modeloRpta.obj = sJsonData; //JsonConvert.DeserializeObject<List<Articulo>>(sJsonData);

            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }


        public object mObtener_Info_Dialog_Cronograma(string sUsuarioId)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC [SP_MOBILE_EVENTO_PERIODO]  ";

                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;

                if (modeloRpta.bEstado == false)
                    return modeloRpta;

                DataTable dtEP = (DataTable)modeloRpta.obj;

                sCMD = "EXEC [SP_MOBILE_EVENTO_TIPO]   ";

                response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;

                if (modeloRpta.bEstado == false)
                    return modeloRpta;

                DataTable dtET = (DataTable)modeloRpta.obj;


                sCMD = "EXEC [SP_MOBILE_MASCOTAS_USUARIO] '" + sUsuarioId + "'  ";

                response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;

                if (modeloRpta.bEstado == false)
                    return modeloRpta;

                DataTable dtMU = (DataTable)modeloRpta.obj;
                
                //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

                List<Evento_Periodo> Evento_Periodo_ = dtEP.AsEnumerable().Select(m => new Evento_Periodo()
                {
                    ID = m.Field<decimal>("ID").ToString(),
                    PERIODO = m.Field<string>("PERIODO").ToString()
                }).ToList();

                List<Evento_Tipo> Evento_Tipo_ = dtET.AsEnumerable().Select(m => new Evento_Tipo()
                {
                    ID = m.Field<decimal>("ID").ToString(),
                    TIPO = m.Field<string>("TIPO").ToString()
                }).ToList();

                List<Mascotas_Usuario> Mascotas_Usuario_ = dtMU.AsEnumerable().Select(m => new Mascotas_Usuario()
                {
                    ID = m.Field<decimal>("ID").ToString(),
                    NOMBRE = m.Field<string>("NOMBRE"),
                    APELLIDO = m.Field<string>("APELLIDO")
                }).ToList();
                
                Info_Dialog_Cronograma Info_Dialog_Cronograma_ = new Info_Dialog_Cronograma();
                Info_Dialog_Cronograma_.Evento_Periodo_ = Evento_Periodo_;
                Info_Dialog_Cronograma_.Evento_Tipo_ = Evento_Tipo_;
                Info_Dialog_Cronograma_.Mascotas_Usuario_ = Mascotas_Usuario_;
                
                string sJsonData = JsonConvert.SerializeObject(Info_Dialog_Cronograma_);
                modeloRpta.obj = sJsonData; //JsonConvert.DeserializeObject<List<Articulo>>(sJsonData);

            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }



        public object mGuardarCronograma(EventoCrear Value)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                
                string sCMD = "EXEC [usp_mnt_evento] " +
                "NULL," +
                "'" + Value.evento_tipo_id + "'," +
                "'" + Value.mascota_id + "'," +
                "'" + Value.evento_periodo_id + "'," +
                "'" + Value.titulo + "'," +
                "'" + Value.detalle + "'," +
                "'" + Value.fecha_inicio + "'," +
                "'" + Value.fecha_fin + "'," +
                "'" + Value.celular + "'," +
                "'" + Value.estado + "'," +
                "'" + Value.usuario_id + "'," +
                "3";

                object response = mDatoBD.mExceBD_SQL(sCMD);

                modeloRpta = (Model)response;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }


        public object mEvento_Cronograma_usuario_fecha(string sUsuarioId, string sFecha)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();

            try
            {
                string sCMD = "EXEC [SP_MOBILE_EVENTO_CRONOGRAMA_USUARIO_FECHA] '" + sUsuarioId + "','"+ sFecha + "'  ";

                object response = mDatoBD.mExceBD_SQL_MT(sCMD);

                modeloRpta = (Model)response;

                if (modeloRpta.bEstado == false)
                    return modeloRpta;

                DataSet ds = (DataSet)modeloRpta.obj;

                List<Evento> Evento_ = ds.Tables[0].AsEnumerable().Select(m => new Evento()
                {
                    ID = m.Field<decimal>("ID").ToString(),
                    EVENTO_TIPO_ID = m.Field<string>("EVENTO_TIPO_ID"),
                    MASCOTA_ID = m.Field<string>("MASCOTA_ID"),
                    EVENTO_PERIODO_ID = m.Field<string>("EVENTO_PERIODO_ID"),
                    FECHA_INICIO = m.Field<DateTime>("FECHA_INICIO").ToString(),
                    FECHA_FIN = m.Field<DateTime>("FECHA_FIN").ToString(),
                    TITULO = m.Field<string>("TITULO"),
                    DETALLE = m.Field<string>("DETALLE"),
                    ESTADO = m.Field<int>("ESTADO")
                }).ToList();


                List<Evento_Detalle> Evento_Detalle_ = ds.Tables[1].AsEnumerable().Select(m => new Evento_Detalle()
                {
                    EVENTO_ID = m.Field<decimal>("EVENTO_ID").ToString(),
                    FECHA_INICIO = m.Field<string>("FECHA_INICIO"),
                    FECHA_FIN = m.Field<DateTime>("FECHA_FIN").ToString(),
                    ESTADO = m.Field<int>("ESTADO")
                }).ToList();

                Evento_Cronograma Evento_Cronograma_ = new Evento_Cronograma();
                Evento_Cronograma_.Evento_ = Evento_;
                Evento_Cronograma_.Evento_Detalle_ = Evento_Detalle_;

                string sJsonData = JsonConvert.SerializeObject(Evento_Cronograma_);
                modeloRpta.obj = sJsonData; //JsonConvert.DeserializeObject<List<Articulo>>(sJsonData);

            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //modeloRpta.dt = dt;
                modeloRpta.obj = null;
            }

            return modeloRpta;
        }


        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


        byte[] ObjectToByteArray(object obj)
        {
            if (obj == null)
                return null;
            BinaryFormatter bf = new BinaryFormatter();
            using (MemoryStream ms = new MemoryStream())
            {
                bf.Serialize(ms, obj);
                return ms.ToArray();
            }
        }
        
        public Image Base64ToImage(string base64String)
        {
            // Convert base 64 string to byte[]
            byte[] imageBytes = Convert.FromBase64String(base64String);
            // Convert byte[] to Image
            using (var ms = new MemoryStream(imageBytes, 0, imageBytes.Length))
            {
                Image image = Image.FromStream(ms, true);
                return image;
            }
        }

        public string ImageToBase64(Image image, System.Drawing.Imaging.ImageFormat format)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                // Convert Image to byte[]
                image.Save(ms, format);
                byte[] imageBytes = ms.ToArray();

                // Convert byte[] to base 64 string
                string base64String = Convert.ToBase64String(imageBytes);
                return base64String;
            }
        }
        
        public Stream ToStream( Image image, ImageFormat format)
        {
            Stream stream = new System.IO.MemoryStream();
            image.Save(stream, format);
            stream.Position = 0;
            return stream;
        }
        
        public byte[] imageToByteArray(Image imageIn)
        {
            MemoryStream ms = new MemoryStream();
            imageIn.Save(ms, System.Drawing.Imaging.ImageFormat.Gif);
            return ms.ToArray();
        }

        public Image byteArrayToImage(byte[] byteArrayIn)
        {
            MemoryStream ms = new MemoryStream(byteArrayIn);
            Image returnImage = Image.FromStream(ms);
            return returnImage;
        }


       


        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        public  void PostDatatoFTP(byte[] file)
        {
            Model modeloRpta = new Model();
            Dato mDatoBD = new Dato();
            string sCMD = "";

            try
            {

                sCMD = "insert [log] (s) values('PostDatatoFTP - ini') ";
                mDatoBD.mExceBD_SQL(sCMD);

                FtpWebRequest request = (FtpWebRequest)WebRequest.Create("107.180.1.33");
                request.CachePolicy = new HttpRequestCachePolicy(HttpRequestCacheLevel.CacheIfAvailable);
                request.Method = WebRequestMethods.Ftp.UploadFile;
                request.Credentials = new NetworkCredential("ftp_recapi", "i1r00g#U");
                // Copy the contents of the file to the request stream.  
                // StreamReader sourceStream = new StreamReader(@"E:\yourlocation\SampleFile.txt");
                byte[] fileContents = file;
                // sourceStream.Close();
                request.ContentLength = fileContents.Length;
                Stream requestStream = request.GetRequestStream();
                requestStream.Write(fileContents, 0, fileContents.Length);
                requestStream.Close();
                FtpWebResponse response = (FtpWebResponse)request.GetResponse();
                //  Console.WriteLine("Upload File Complete, status {0}", response.StatusDescription);

                response.Close();
            }
            catch (WebException e)
            {

                sCMD = "insert [log] (s) values('WebException: " + e.Message.ToString() + "') ";
                mDatoBD.mExceBD_SQL(sCMD);

                //Console.WriteLine(e.Message.ToString());
                String status = ((FtpWebResponse)e.Response).StatusDescription;
                // Console.WriteLine(status);

                sCMD = "insert [log] (s) values('WebException - status: " + status + "') ";
                mDatoBD.mExceBD_SQL(sCMD);

            }
            catch (Exception ex)
            {
                sCMD = "insert [log] (s) values('Exception: " + ex.Message.ToString() + "') ";
                mDatoBD.mExceBD_SQL(sCMD);

               // Console.WriteLine(ex.Message.ToString());
            }
            

        }


        public  void SendFTP(string fileName, byte[] file)
        {
                Dato mDatoBD = new Dato();

            try
            {

                FtpWebRequest request = WebRequest.Create(new Uri(string.Format(@"ftp://{0}/{1}/{2}", "neojuridica.com", "img_request", fileName))) as FtpWebRequest;
                request.Method = WebRequestMethods.Ftp.UploadFile;
                request.UseBinary = true;
                request.UsePassive = true;
                request.KeepAlive = true;
                request.Credentials = new NetworkCredential("ftp_rec", "7uoV$n83");
                //request.ConnectionGroupName = "group";

                request.ContentLength = file.Length;

                string sCMD = "insert [log] (s) values('request.GetRequestStream() ini') ";
                mDatoBD.mExceBD_SQL(sCMD);

                var requestStream = request.GetRequestStream();
                requestStream.Write(file, 0, file.Length);
                requestStream.Close();

                 sCMD = "insert [log] (s) values('request.GetRequestStream() fin') ";
                mDatoBD.mExceBD_SQL(sCMD);

                var response = (FtpWebResponse)request.GetResponse();

                if (response != null)
                    response.Close();
            }
            catch (Exception ex)
            {
                string sCMD = "insert [log] (s) values('SendFTP - Exception: " + ex.Message.ToString() + "') ";
                mDatoBD.mExceBD_SQL(sCMD);
            }

        }

        
        private void mCrearImg(string sRutaCarpeta, string sImg)
        {


        }



        public byte[]  DownloadFileFTP(string sNombreImagen)
        {
            byte[] fileData = { 0 };

            //string inputfilepath = @"C:\IIS\PET_WEB\4_20190901_231504_img.PNG";
            string ftphost = "neojuridica.com";
            string ftpfilepath = "/img_request/"+ sNombreImagen;

            string ftpfullpath = "ftp://" + ftphost + ftpfilepath;

            using (WebClient request = new WebClient())
            {
                request.Credentials = new NetworkCredential("ftp_rec", "7uoV$n83");
                byte[] file = request.DownloadData(ftpfullpath);

                // ... Convert byte array to Base64 string.
                string result = Convert.ToBase64String(file);

                fileData = file;
               /* using (FileStream file = File.Create(inputfilepath))
                {
                    file.Write(fileData, 0, fileData.Length);
                    file.Close();
                }*/
              //  MessageBox.Show("Download Complete");
            }

           return fileData;
        }


    }
}