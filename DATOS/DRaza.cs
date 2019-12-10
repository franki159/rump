using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDAD;
using System.Data.SqlClient;
using System.Data;

namespace DATOS
{
    public class DRaza
    {
        public static List<ERaza> listarRaza(ERaza objE) {
            List<ERaza> lista = new List<ERaza>();
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_raza", cn);
                cmd.Parameters.AddWithValue("@mascota_tipo_id", objE.MASCOTA_TIPO_ID);
                cmd.Parameters.AddWithValue("@tipo", objE.TIPO);
                cmd.Parameters.AddWithValue("@opcion", 1);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        ERaza mItem = new ERaza();
                        mItem.ID_ENCRIP = EUtil.getEncriptar((dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"))).ToString());
                        mItem.DESCRIPCION = dr.IsDBNull(dr.GetOrdinal("tipo")) ? string.Empty : dr.GetString(dr.GetOrdinal("tipo"));
                        mItem.ESPECIE = dr.IsDBNull(dr.GetOrdinal("especie")) ? string.Empty : dr.GetString(dr.GetOrdinal("especie"));
                        mItem.MASCOTA_TIPO_ID = dr.IsDBNull(dr.GetOrdinal("mascota_tipo_id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("mascota_tipo_id"));
                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }

        public static List<ERaza> obtenerRaza(ERaza objE)
        {
            List<ERaza> lista = new List<ERaza>();
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_raza", cn);
                cmd.Parameters.AddWithValue("@id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                cmd.Parameters.AddWithValue("@opcion", 5);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        ERaza mItem = new ERaza();
                        mItem.ID_ENCRIP = EUtil.getEncriptar((dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"))).ToString());
                        mItem.DESCRIPCION = dr.IsDBNull(dr.GetOrdinal("tipo")) ? string.Empty : dr.GetString(dr.GetOrdinal("tipo"));
                        mItem.ESPECIE = dr.IsDBNull(dr.GetOrdinal("especie")) ? string.Empty : dr.GetString(dr.GetOrdinal("especie"));
                        mItem.MASCOTA_TIPO_ID = dr.IsDBNull(dr.GetOrdinal("mascota_tipo_id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("mascota_tipo_id"));
                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }

        public static int actualizarRaza(ERaza objE)
        {
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_raza", cn);
                if (objE.OPCION == 3 || objE.OPCION == 4)
                {
                    cmd.Parameters.AddWithValue("@id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                }                
                cmd.Parameters.AddWithValue("@tipo", objE.DESCRIPCION);
                cmd.Parameters.AddWithValue("@mascota_tipo_id", objE.MASCOTA_TIPO_ID);
                cmd.Parameters.AddWithValue("@usuario", objE.USUARIO);
                cmd.Parameters.AddWithValue("@opcion", objE.OPCION);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                return cmd.ExecuteNonQuery();
            }
        }
    }
}
