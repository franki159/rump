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
    public class DSolicitud
    {
        public static ESolicitud listarSolicitudxId(ESolicitud objE)
        {
            ESolicitud lista = new ESolicitud();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_listarServicioXmascota", cn);
                cmd.Parameters.AddWithValue("@id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                cmd.Parameters.AddWithValue("@opcion", 2);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        lista.ID_ENCRIP = EUtil.getEncriptar((dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"))).ToString());
                        lista.ID = dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"));
                        lista.DESCRIPCION = dr.IsDBNull(dr.GetOrdinal("descripcion")) ? string.Empty : dr.GetString(dr.GetOrdinal("descripcion"));
                        lista.PRECIO = dr.IsDBNull(dr.GetOrdinal("precio")) ? 0 : dr.GetDecimal(dr.GetOrdinal("precio"));
                        lista.ID_MSC_ENCRIP = objE.ID_MSC_ENCRIP;
                    }
                }
            }
            return lista;
        }
        public static List<ESolicitud> listarServicio()
        {
            List<ESolicitud> lista = new List<ESolicitud>();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_listarServicioXmascota", cn);
                cmd.Parameters.AddWithValue("@opcion", 3);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        ESolicitud mItem = new ESolicitud();
                        mItem.ID_ENCRIP = EUtil.getEncriptar((dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"))).ToString());
                        mItem.ID = dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"));
                        mItem.DESCRIPCION = dr.IsDBNull(dr.GetOrdinal("descripcion")) ? string.Empty : dr.GetString(dr.GetOrdinal("descripcion"));
                        mItem.PRECIO = dr.IsDBNull(dr.GetOrdinal("precio")) ? 0 : dr.GetDecimal(dr.GetOrdinal("precio"));
                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }
        public static List<ESolicitud> listarSolicitud(ESolicitud objE)
        {
            List<ESolicitud> lista = new List<ESolicitud>();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_solicitud", cn);
                cmd.Parameters.AddWithValue("@dni", objE.DNI);
                cmd.Parameters.AddWithValue("@email", objE.EMAIL);
                cmd.Parameters.AddWithValue("@estado", objE.ESTADO);
                cmd.Parameters.AddWithValue("@id", objE.ID);
                cmd.Parameters.AddWithValue("@opcion", 1);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        ESolicitud mItem = new ESolicitud();
                        //mItem.ID = dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"));
                        mItem.ID_ENCRIP = EUtil.getEncriptar((dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"))).ToString());
                        mItem.TIPO = dr.IsDBNull(dr.GetOrdinal("tipo")) ? string.Empty : dr.GetString(dr.GetOrdinal("tipo"));
                        mItem.DNI = dr.IsDBNull(dr.GetOrdinal("dni")) ? string.Empty : dr.GetString(dr.GetOrdinal("dni"));
                        mItem.MASCOTA = dr.IsDBNull(dr.GetOrdinal("mascota")) ? string.Empty : dr.GetString(dr.GetOrdinal("mascota"));
                        mItem.PROPIETARIO = dr.IsDBNull(dr.GetOrdinal("propietario")) ? string.Empty : dr.GetString(dr.GetOrdinal("propietario"));
                        mItem.EMAIL = dr.IsDBNull(dr.GetOrdinal("email")) ? string.Empty : dr.GetString(dr.GetOrdinal("email"));
                        mItem.TELEFONO = dr.IsDBNull(dr.GetOrdinal("telefono")) ? string.Empty : dr.GetString(dr.GetOrdinal("telefono"));
                        mItem.ESTADO = dr.IsDBNull(dr.GetOrdinal("estado")) ? 0 : dr.GetInt16(dr.GetOrdinal("estado"));
                        mItem.vPARAM1 = dr.IsDBNull(dr.GetOrdinal("fecha_solicitud")) ? string.Empty : dr.GetString(dr.GetOrdinal("fecha_solicitud"));
                        mItem.vPARAM2 = dr.IsDBNull(dr.GetOrdinal("responsable")) ? string.Empty : dr.GetString(dr.GetOrdinal("responsable"));

                        mItem.NOM_REP = dr.IsDBNull(dr.GetOrdinal("nom_rep")) ? string.Empty : dr.GetString(dr.GetOrdinal("nom_rep"));
                        mItem.APE_REP = dr.IsDBNull(dr.GetOrdinal("ape_rep")) ? string.Empty : dr.GetString(dr.GetOrdinal("ape_rep"));
                        mItem.TEL_REP = dr.IsDBNull(dr.GetOrdinal("tel_rep")) ? string.Empty : dr.GetString(dr.GetOrdinal("tel_rep"));
                        mItem.EMAIL_REP = dr.IsDBNull(dr.GetOrdinal("email_rep")) ? string.Empty : dr.GetString(dr.GetOrdinal("email_rep"));
                        mItem.DIRECCION = dr.IsDBNull(dr.GetOrdinal("direccion")) ? string.Empty : dr.GetString(dr.GetOrdinal("direccion"));
                        mItem.REFERENCIA = dr.IsDBNull(dr.GetOrdinal("referencia")) ? string.Empty : dr.GetString(dr.GetOrdinal("referencia"));

                        mItem.DEPARTAMENTO = dr.IsDBNull(dr.GetOrdinal("departamento")) ? string.Empty : dr.GetString(dr.GetOrdinal("departamento"));
                        mItem.PROVINCIA = dr.IsDBNull(dr.GetOrdinal("provincia")) ? string.Empty : dr.GetString(dr.GetOrdinal("provincia"));
                        mItem.DISTRITO = dr.IsDBNull(dr.GetOrdinal("distrito")) ? string.Empty : dr.GetString(dr.GetOrdinal("distrito"));

                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }
        public static List<ESolicitud> listarServicioXmascota(ESolicitud objE)
        {
            List<ESolicitud> lista = new List<ESolicitud>();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_listarServicioXmascota", cn);
                cmd.Parameters.AddWithValue("@id_mascota", EUtil.getDesencriptar(objE.ID_ENCRIP));
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        ESolicitud mItem = new ESolicitud();
                        mItem.ID_ENCRIP = EUtil.getEncriptar((dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"))).ToString());
                        mItem.ID = dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"));
                        mItem.DESCRIPCION = dr.IsDBNull(dr.GetOrdinal("descripcion")) ? string.Empty : dr.GetString(dr.GetOrdinal("descripcion"));
                        mItem.PRECIO = dr.IsDBNull(dr.GetOrdinal("precio")) ? 0 : dr.GetDecimal(dr.GetOrdinal("precio"));
                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }

        public static int AtenderSolicitud(ESolicitud objE)
        {
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_solicitud", cn);
                cmd.Parameters.AddWithValue("@id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                cmd.Parameters.AddWithValue("@usuario", objE.USUARIO);
                cmd.Parameters.AddWithValue("@opcion", 2);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                return cmd.ExecuteNonQuery();
            }
        }
        public static int AnularSolicitud(ESolicitud objE)
        {
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_solicitud", cn);
                cmd.Parameters.AddWithValue("@id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                cmd.Parameters.AddWithValue("@usuario", objE.USUARIO);
                cmd.Parameters.AddWithValue("@opcion", 3);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                return cmd.ExecuteNonQuery();
            }
        }
    }
}
