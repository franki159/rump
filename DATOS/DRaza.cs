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
        public static List<EEnciclopedia> listarEnciclopedia(EEnciclopedia objE)
        {
            List<EEnciclopedia> lista = new List<EEnciclopedia>();
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_lst_enciclopedia", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@mascota_tipo_id", objE.TIPO_MASCOTA_ID);
                cmd.Parameters.AddWithValue("@mascota_raza_id", objE.TIPO_RAZA_ID);
                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        EEnciclopedia mItem = new EEnciclopedia();
                        mItem.ID = (dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetInt32(dr.GetOrdinal("id")));
                        mItem.TIPO_MASCOTA_ID = (dr.IsDBNull(dr.GetOrdinal("mascota_tipo_id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("mascota_tipo_id")));
                        mItem.TIPO_MASCOTA = dr.IsDBNull(dr.GetOrdinal("tipo_mascota")) ? string.Empty : dr.GetString(dr.GetOrdinal("tipo_mascota"));
                        mItem.NOMBRE = dr.IsDBNull(dr.GetOrdinal("nombre")) ? string.Empty : dr.GetString(dr.GetOrdinal("nombre"));
                        mItem.TIPO_RAZA_ID = (dr.IsDBNull(dr.GetOrdinal("mascota_raza_id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("mascota_raza_id")));
                        mItem.TIPO_RAZA = dr.IsDBNull(dr.GetOrdinal("tipo_raza")) ? string.Empty : dr.GetString(dr.GetOrdinal("tipo_raza"));
                        mItem.TAMANO_MACHO = dr.IsDBNull(dr.GetOrdinal("tamano_macho")) ? string.Empty : dr.GetString(dr.GetOrdinal("tamano_macho"));
                        mItem.TAMANO_HEMBRA = dr.IsDBNull(dr.GetOrdinal("tamano_hembra")) ? string.Empty : dr.GetString(dr.GetOrdinal("tamano_hembra"));
                        mItem.GRADO_CUIDADO = dr.IsDBNull(dr.GetOrdinal("grado_cuidado")) ? string.Empty : dr.GetString(dr.GetOrdinal("grado_cuidado"));
                        mItem.PAIS_ORIGEN = dr.IsDBNull(dr.GetOrdinal("pais_origen")) ? string.Empty : dr.GetString(dr.GetOrdinal("pais_origen"));
                        mItem.GENERAL = dr.IsDBNull(dr.GetOrdinal("general")) ? string.Empty : dr.GetString(dr.GetOrdinal("general"));
                        mItem.CABEZA = dr.IsDBNull(dr.GetOrdinal("cabeza")) ? string.Empty : dr.GetString(dr.GetOrdinal("cabeza"));
                        mItem.CUERPO = dr.IsDBNull(dr.GetOrdinal("cuerpo")) ? string.Empty : dr.GetString(dr.GetOrdinal("cuerpo"));
                        mItem.PELAJE = dr.IsDBNull(dr.GetOrdinal("pelaje")) ? string.Empty : dr.GetString(dr.GetOrdinal("pelaje"));
                        mItem.OREJA = dr.IsDBNull(dr.GetOrdinal("oreja")) ? string.Empty : dr.GetString(dr.GetOrdinal("oreja"));
                        mItem.COLA = dr.IsDBNull(dr.GetOrdinal("cola")) ? string.Empty : dr.GetString(dr.GetOrdinal("cola"));
                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }

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
