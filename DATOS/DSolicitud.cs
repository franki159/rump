﻿using System;
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
        public static List<ESolicitud> listarSolicitud(ESolicitud objE)
        {
            List<ESolicitud> lista = new List<ESolicitud>();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_solicitud", cn);
                cmd.Parameters.AddWithValue("@dni", objE.DNI);
                cmd.Parameters.AddWithValue("@email", objE.EMAIL);
                cmd.Parameters.AddWithValue("@estado", objE.ESTADO);
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
