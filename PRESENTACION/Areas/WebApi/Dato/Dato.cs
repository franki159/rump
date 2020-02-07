//using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace PRESENTACION.Areas.WebApi
{
    public class Dato
    { 

        public object mExceBD_SQL(string sCMD)
        {
            object objResult = "";

            Model modeloRpta = new Model();

            DataTable dt = new DataTable("TABLE_INFO");

            string sCadCon = ConfigurationManager.ConnectionStrings["CnnRumpSql"].ConnectionString.ToString();

            SqlConnection Conn = null;

            try
            {
                Conn = new SqlConnection(sCadCon);
                Conn.Open();
                SqlDataAdapter sda = new SqlDataAdapter(sCMD, Conn);
                sda.Fill(dt);

                modeloRpta.bEstado = true;
                modeloRpta.iCodigo = 0;
                modeloRpta.sRpta = "";
                modeloRpta.obj = dt;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //	modeloRpta.dt = dt;
                modeloRpta.obj = dt;
            }

            Conn.Close();

            objResult = modeloRpta;

           // objResult = JsonConvert.SerializeObject(modeloRpta);

            return objResult;
        }


        public object mExceBD_SQL_MT(string sCMD)
        {
            object objResult = "";

            Model modeloRpta = new Model();

            DataSet ds = new DataSet("TABLE_INFO");

            string sCadCon = ConfigurationManager.ConnectionStrings["CnnRumpSql"].ConnectionString.ToString();

            SqlConnection Conn = new SqlConnection(sCadCon);

            try
            {
                Conn.Open();
                SqlDataAdapter sda = new SqlDataAdapter(sCMD, Conn);
                sda.Fill(ds);

                modeloRpta.bEstado = true;
                modeloRpta.iCodigo = 0;
                modeloRpta.sRpta = "";
                modeloRpta.obj = ds;
            }
            catch (Exception ex)
            {
                modeloRpta.bEstado = false;
                modeloRpta.iCodigo = 1;
                modeloRpta.sRpta = ex.ToString();
                //	modeloRpta.dt = dt;
                modeloRpta.obj = ds;
            }

            Conn.Close();


            objResult = modeloRpta;

           // objResult = JsonConvert.SerializeObject(modeloRpta);

            return objResult;
        }



        //public object mExceBD_MySql(string sCmd)
        //{
        //    object objResult = "";

        //    Model modeloRpta = new Model();

        //    DataTable dt = new DataTable("TABLE_INFO");
        //    string sCadCon = "";
        //    MySqlConnection Conn=null;
        //    try
        //    {
        //         sCadCon = ConfigurationManager.ConnectionStrings["BD_MYSQL_PET"].ConnectionString.ToString();

        //        Conn = new MySqlConnection(sCadCon);
        //        Conn.Open();
        //        MySqlDataAdapter sda = new MySqlDataAdapter(sCmd, Conn);
        //        sda.Fill(dt);
        //        modeloRpta.bEstado = true;
        //        modeloRpta.iCodigo = 0;
        //        modeloRpta.sRpta = "";
        //        modeloRpta.obj = dt;
        //        //'190.236.202.84'
        //        //wwwworld_prueba'@'190.236.202.84'
        //    }
        //    catch (Exception ex)
        //    {
        //        modeloRpta.bEstado = false;
        //        modeloRpta.iCodigo = 1;
        //        modeloRpta.sRpta = ex.ToString();
        //        //	modeloRpta.dt = dt;
        //        modeloRpta.obj = dt;
        //    }
        //    finally {

        //        Conn.Close();
        //    }

        //    objResult = modeloRpta;
            
        //   // objResult = JsonConvert.SerializeObject(modeloRpta);

        //    return objResult;
        //}


        //public object mExceBD_MySql2(string sCmd)
        //{
        //    object objResult = "";

        //    Model modeloRpta = new Model();

        //    DataTable dt = new DataTable("TABLE_INFO");
        //    string sCadCon = "";
        //    MySqlConnection Conn = null;
        //    try
        //    {
        //        sCadCon = ConfigurationManager.ConnectionStrings["BD_MYSQL_PET_USU"].ConnectionString.ToString();

        //        Conn = new MySqlConnection(sCadCon);
        //        Conn.Open();
        //        MySqlDataAdapter sda = new MySqlDataAdapter(sCmd, Conn);
        //        sda.Fill(dt);
        //        modeloRpta.bEstado = true;
        //        modeloRpta.iCodigo = 0;
        //        modeloRpta.sRpta = "";
        //        modeloRpta.obj = dt;
        //        //'190.236.202.84'
        //        //wwwworld_prueba'@'190.236.202.84'
        //    }
        //    catch (Exception ex)
        //    {
        //        modeloRpta.bEstado = false;
        //        modeloRpta.iCodigo = 1;
        //        modeloRpta.sRpta = ex.ToString();
        //        //	modeloRpta.dt = dt;
        //        modeloRpta.obj = dt;
        //    }
        //    finally
        //    {

        //        Conn.Close();
        //    }

        //    objResult = modeloRpta;

        //    // objResult = JsonConvert.SerializeObject(modeloRpta);

        //    return objResult;
        //}

    }
}