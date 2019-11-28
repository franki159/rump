using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using ENTIDAD;
using MySql.Data.MySqlClient;
using MySql.Data;

namespace DATOS
{
    public static class DEvento
    {
        public static List<EEvento> listarEvento(EEvento objE)
        {
            List<EEvento> lista = new List<EEvento>();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {

                SqlCommand cmd = new SqlCommand("usp_mnt_evento", cn);
                cmd.Parameters.AddWithValue("@evento_tipo_id", objE.EVENTO_TIPO_ID);
                cmd.Parameters.AddWithValue("@mascota_id", (objE.MASCOTA_ID_ENCRIP == "" ? 0 : Convert.ToInt32(EUtil.getDesencriptar(objE.MASCOTA_ID_ENCRIP))));
                cmd.Parameters.AddWithValue("@usuario_id", objE.USUARIO_ID);
                cmd.Parameters.AddWithValue("@opcion", 1);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        EEvento mItem = new EEvento();
                        //mItem.ID = dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"));
                        mItem.ID_ENCRIP = EUtil.getEncriptar((dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"))).ToString());
                        mItem.EVENTO_TIPO_ID = dr.IsDBNull(dr.GetOrdinal("EVENTO_TIPO_ID")) ? 0 : dr.GetDecimal(dr.GetOrdinal("EVENTO_TIPO_ID"));
                        mItem.TIPO = dr.IsDBNull(dr.GetOrdinal("TIPO")) ? string.Empty : dr.GetString(dr.GetOrdinal("TIPO"));
                        mItem.MASCOTA_ID = dr.IsDBNull(dr.GetOrdinal("MASCOTA_ID")) ? 0 : dr.GetDecimal(dr.GetOrdinal("MASCOTA_ID"));
                        mItem.MASCOTA_ID_ENCRIP = EUtil.getEncriptar(mItem.MASCOTA_ID.ToString());
                        mItem.MASCOTA = dr.IsDBNull(dr.GetOrdinal("MASCOTA")) ? string.Empty : dr.GetString(dr.GetOrdinal("MASCOTA"));
                        mItem.TITULO = dr.IsDBNull(dr.GetOrdinal("TITULO")) ? string.Empty : dr.GetString(dr.GetOrdinal("TITULO"));
                        mItem.FECHA_INICIO = dr.IsDBNull(dr.GetOrdinal("FECHA_INICIO")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("FECHA_INICIO"));
                        mItem.FECHA_FIN = dr.IsDBNull(dr.GetOrdinal("FECHA_FIN")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("FECHA_FIN"));
                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }
        public static List<EEvento> listarEventoNotificacion(EEvento objE)
        {
            List<EEvento> lista = new List<EEvento>();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {

                SqlCommand cmd = new SqlCommand("usp_mnt_evento", cn);
                cmd.Parameters.AddWithValue("@usuario_id", objE.USUARIO_ID);
                cmd.Parameters.AddWithValue("@opcion", 6);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        EEvento mItem = new EEvento();
                        //mItem.ID = dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"));
                        mItem.ID_ENCRIP = EUtil.getEncriptar((dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"))).ToString());
                        mItem.EVENTO_TIPO_ID = dr.IsDBNull(dr.GetOrdinal("EVENTO_TIPO_ID")) ? 0 : dr.GetDecimal(dr.GetOrdinal("EVENTO_TIPO_ID"));
                        mItem.TIPO = dr.IsDBNull(dr.GetOrdinal("TIPO")) ? string.Empty : dr.GetString(dr.GetOrdinal("TIPO"));
                        mItem.MASCOTA_ID = dr.IsDBNull(dr.GetOrdinal("MASCOTA_ID")) ? 0 : dr.GetDecimal(dr.GetOrdinal("MASCOTA_ID"));
                        mItem.MASCOTA_ID_ENCRIP = EUtil.getEncriptar(mItem.MASCOTA_ID.ToString());
                        mItem.MASCOTA = dr.IsDBNull(dr.GetOrdinal("MASCOTA")) ? string.Empty : dr.GetString(dr.GetOrdinal("MASCOTA"));
                        mItem.TITULO = dr.IsDBNull(dr.GetOrdinal("TITULO")) ? string.Empty : dr.GetString(dr.GetOrdinal("TITULO"));
                        mItem.FECHA_INICIO = dr.IsDBNull(dr.GetOrdinal("FECHA_INICIO")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("FECHA_INICIO"));
                        mItem.FECHA_FIN = dr.IsDBNull(dr.GetOrdinal("FECHA_FIN")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("FECHA_FIN"));
                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }
        public static EEvento ObtenerEvento(EEvento objE)
        {
            EEvento mItem = null;

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {

                SqlCommand cmd = new SqlCommand("usp_mnt_evento", cn);
                cmd.Parameters.AddWithValue("@id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                cmd.Parameters.AddWithValue("@opcion", 2);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        mItem = new EEvento();
                        mItem.ID_ENCRIP = EUtil.getEncriptar((dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"))).ToString());
                        mItem.EVENTO_TIPO_ID = dr.IsDBNull(dr.GetOrdinal("EVENTO_TIPO_ID")) ? 0 : dr.GetDecimal(dr.GetOrdinal("EVENTO_TIPO_ID"));
                        mItem.TIPO = dr.IsDBNull(dr.GetOrdinal("TIPO")) ? string.Empty : dr.GetString(dr.GetOrdinal("TIPO"));
                        mItem.MASCOTA_ID = dr.IsDBNull(dr.GetOrdinal("MASCOTA_ID")) ? 0 : dr.GetDecimal(dr.GetOrdinal("MASCOTA_ID"));
                        mItem.MASCOTA_ID_ENCRIP = EUtil.getEncriptar(mItem.MASCOTA_ID.ToString());
                        mItem.MASCOTA = dr.IsDBNull(dr.GetOrdinal("MASCOTA")) ? string.Empty : dr.GetString(dr.GetOrdinal("MASCOTA"));
                        mItem.EVENTO_PERIODO_ID = dr.IsDBNull(dr.GetOrdinal("EVENTO_PERIODO_ID")) ? 0 : dr.GetDecimal(dr.GetOrdinal("EVENTO_PERIODO_ID"));
                        mItem.TITULO = dr.IsDBNull(dr.GetOrdinal("TITULO")) ? string.Empty : dr.GetString(dr.GetOrdinal("TITULO"));
                        mItem.DETALLE = dr.IsDBNull(dr.GetOrdinal("DETALLE")) ? string.Empty : dr.GetString(dr.GetOrdinal("DETALLE"));
                        mItem.FECHA_INICIO = dr.IsDBNull(dr.GetOrdinal("FECHA_INICIO")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("FECHA_INICIO"));
                        mItem.FECHA_FIN = dr.IsDBNull(dr.GetOrdinal("FECHA_FIN")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("FECHA_FIN"));
                    }
                }
            }
            return mItem;

        }
        public static int AnularEvento(EEvento objE)
        {
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_evento", cn);
                cmd.Parameters.AddWithValue("@id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                cmd.Parameters.AddWithValue("@opcion", 5);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                return cmd.ExecuteNonQuery();
            }
        }
        public static int ActualizarEvento(EEvento objE)
        {
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_evento", cn);

                cmd.Parameters.AddWithValue("@id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                cmd.Parameters.AddWithValue("@evento_tipo_id", objE.EVENTO_TIPO_ID);
                cmd.Parameters.AddWithValue("@mascota_id", EUtil.getDesencriptar(objE.MASCOTA_ID_ENCRIP));
                cmd.Parameters.AddWithValue("@evento_periodo_id", objE.EVENTO_PERIODO_ID);
                cmd.Parameters.AddWithValue("@titulo", objE.TITULO);
                cmd.Parameters.AddWithValue("@detalle", objE.DETALLE);
                cmd.Parameters.AddWithValue("@fecha_inicio", objE.FECHA_INICIO);
                cmd.Parameters.AddWithValue("@fecha_fin", objE.FECHA_FIN);
                cmd.Parameters.AddWithValue("@estado", objE.ESTADO);

                cmd.Parameters.AddWithValue("@opcion", 4);
                cmd.CommandType = CommandType.StoredProcedure;
                /////////
                cn.Open();
                return cmd.ExecuteNonQuery();
            }
        }
        public static string RegistrarEvento(EEvento objE)
        {
            decimal ID_EVENTO = 0;

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {

                SqlTransaction transaccRegistro;
                cn.Open();
                transaccRegistro = cn.BeginTransaction();

                try
                {
                    using (SqlCommand cmd = new SqlCommand("usp_mnt_evento", cn, transaccRegistro))
                    {
                        cmd.Parameters.AddWithValue("@evento_tipo_id", objE.EVENTO_TIPO_ID);
                        cmd.Parameters.AddWithValue("@mascota_id", EUtil.getDesencriptar(objE.MASCOTA_ID_ENCRIP));
                        cmd.Parameters.AddWithValue("@evento_periodo_id", objE.EVENTO_PERIODO_ID);
                        cmd.Parameters.AddWithValue("@titulo", objE.TITULO);
                        cmd.Parameters.AddWithValue("@detalle", objE.DETALLE);
                        cmd.Parameters.AddWithValue("@fecha_inicio", objE.FECHA_INICIO);
                        cmd.Parameters.AddWithValue("@fecha_fin", objE.FECHA_FIN);
                        cmd.Parameters.AddWithValue("@estado", objE.ESTADO);
                        cmd.Parameters.AddWithValue("@opcion", 3);
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            if (dr.HasRows)
                            {
                                while (dr.Read())
                                {
                                    ID_EVENTO = dr.IsDBNull(dr.GetOrdinal("ID_evento")) ? 0 : dr.GetDecimal(dr.GetOrdinal("ID_evento"));
                                }
                            }
                        }
                    }

                    transaccRegistro.Commit();
                }
                catch (Exception ex)
                {
                    transaccRegistro.Rollback();
                    ID_EVENTO = 0;
                    throw (ex);
                }
                cn.Close();
            }

            return EUtil.getEncriptar(ID_EVENTO.ToString());
        }
        public static int ActualizarEventoNotificacion(EEvento objE)
        {
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_evento", cn);

                cmd.Parameters.AddWithValue("@id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                cmd.Parameters.AddWithValue("@fecha_inicio", objE.FECHA_INICIO);
                cmd.Parameters.AddWithValue("@estado", objE.ESTADO);

                cmd.Parameters.AddWithValue("@opcion", 7);
                cmd.CommandType = CommandType.StoredProcedure;
                /////////
                cn.Open();
                return cmd.ExecuteNonQuery();
            }
        }
    }
}
