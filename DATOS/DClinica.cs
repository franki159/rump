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
    public class DClinica
    {
        public static decimal ActualizarClinicaCitaWM(EClinica objE) {
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                decimal id = 0;
                SqlCommand cmd = new SqlCommand("usp_mnt_clinica", cn);
                cmd.Parameters.AddWithValue("@nombre", objE.NOMBRE);
                cmd.Parameters.AddWithValue("@telefono", objE.TELEFONO);
                cmd.Parameters.AddWithValue("@direccion", objE.DIRECCION);
                cmd.Parameters.AddWithValue("@geografia_id", objE.GEOGRAFIA_ID);
                cmd.Parameters.AddWithValue("@usuario_id", objE.USUARIO_ID);
                cmd.Parameters.AddWithValue("@opcion", 1);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                using (SqlDataReader dr = cmd.ExecuteReader())
                {
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            id = dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"));
                        }
                    }
                }

                return id;
            }
        }

        public static int actualizarConvenio(EClinica objE)
        {
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_clinica", cn);
                if (objE.ID_ENCRIP != "")
                {
                    cmd.Parameters.AddWithValue("@id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                }
                cmd.Parameters.AddWithValue("@nombre", objE.NOMBRE);
                cmd.Parameters.AddWithValue("@telefono", objE.TELEFONO);
                cmd.Parameters.AddWithValue("@beneficio", objE.BENEFICIO);
                cmd.Parameters.AddWithValue("@punto_autorizado", objE.PUNTO_AUTORIZADO);
                cmd.Parameters.AddWithValue("@usuario_id", objE.USUARIO_ID);
                cmd.Parameters.AddWithValue("@convenio_tipo_id", objE.CONVENIO_TIPO_ID);
                cmd.Parameters.AddWithValue("@direccion", objE.DIRECCION);
                cmd.Parameters.AddWithValue("@latitud", objE.LATITUD);
                cmd.Parameters.AddWithValue("@longitud", objE.LONGITUD);
                cmd.Parameters.AddWithValue("@geografia_id", objE.GEOGRAFIA_ID);
                cmd.Parameters.AddWithValue("@opcion", objE.OPCION);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                return cmd.ExecuteNonQuery();
            }
        }

        public static List<EClinica> listarClinica(EClinica objE)
        {
            List<EClinica> lista = new List<EClinica>();
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_clinica", cn);
                cmd.Parameters.AddWithValue("@convenio_tipo_id", objE.CONVENIO_TIPO_ID);
                cmd.Parameters.AddWithValue("@nombre", objE.NOMBRE);
                cmd.Parameters.AddWithValue("@opcion", 2);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        EClinica mItem = new EClinica();
                        mItem.ID_ENCRIP = EUtil.getEncriptar((dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"))).ToString());
                        mItem.PUNTO_AUTORIZADO =(dr.IsDBNull(dr.GetOrdinal("punto_autorizado")) ? 0 : dr.GetInt16(dr.GetOrdinal("punto_autorizado")));
                        mItem.NOMBRE = dr.IsDBNull(dr.GetOrdinal("nombre")) ? string.Empty : dr.GetString(dr.GetOrdinal("nombre"));
                        mItem.TELEFONO = dr.IsDBNull(dr.GetOrdinal("telefono")) ? string.Empty : dr.GetString(dr.GetOrdinal("telefono"));
                        mItem.BENEFICIO = dr.IsDBNull(dr.GetOrdinal("beneficio")) ? string.Empty : dr.GetString(dr.GetOrdinal("beneficio"));
                        mItem.DIRECCION = dr.IsDBNull(dr.GetOrdinal("direccion")) ? string.Empty : dr.GetString(dr.GetOrdinal("direccion"));
                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }
        public static EClinica ObtenerClinica(EClinica objE)
        {
            EClinica mItem = new EClinica();
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_clinica", cn);
                cmd.Parameters.AddWithValue("@id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                cmd.Parameters.AddWithValue("@opcion", 6);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        mItem = new EClinica();
                        mItem.ID_ENCRIP = EUtil.getEncriptar((dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"))).ToString());
                        mItem.CONVENIO_TIPO_ID = (dr.IsDBNull(dr.GetOrdinal("convenio_tipo_id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("convenio_tipo_id")));
                        mItem.PUNTO_AUTORIZADO = (dr.IsDBNull(dr.GetOrdinal("punto_autorizado")) ? 0 : dr.GetInt16(dr.GetOrdinal("punto_autorizado")));
                        mItem.NOMBRE = dr.IsDBNull(dr.GetOrdinal("nombre")) ? string.Empty : dr.GetString(dr.GetOrdinal("nombre"));
                        mItem.TELEFONO = dr.IsDBNull(dr.GetOrdinal("telefono")) ? string.Empty : dr.GetString(dr.GetOrdinal("telefono"));
                        mItem.BENEFICIO = dr.IsDBNull(dr.GetOrdinal("beneficio")) ? string.Empty : dr.GetString(dr.GetOrdinal("beneficio"));
                        mItem.DEPARTAMENTO = dr.IsDBNull(dr.GetOrdinal("departamento")) ? string.Empty : dr.GetString(dr.GetOrdinal("departamento"));
                        mItem.PROVINCIA = dr.IsDBNull(dr.GetOrdinal("provincia")) ? string.Empty : dr.GetString(dr.GetOrdinal("provincia"));
                        mItem.GEOGRAFIA_ID = (dr.IsDBNull(dr.GetOrdinal("geografia_id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("geografia_id")));
                        mItem.DIRECCION = dr.IsDBNull(dr.GetOrdinal("direccion")) ? string.Empty : dr.GetString(dr.GetOrdinal("direccion"));
                        mItem.LATITUD = dr.IsDBNull(dr.GetOrdinal("latitud")) ? string.Empty : dr.GetString(dr.GetOrdinal("latitud"));
                        mItem.LONGITUD = dr.IsDBNull(dr.GetOrdinal("longitud")) ? string.Empty : dr.GetString(dr.GetOrdinal("longitud"));
                    }
                }
            }
            return mItem;
        }
    }
}
