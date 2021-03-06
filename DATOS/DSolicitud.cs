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
        public static ESolicitud listarServicioxId(ESolicitud objE)
        {
            ESolicitud lista = new ESolicitud();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_listarServicioXmascota", cn);
                cmd.Parameters.AddWithValue("@id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                cmd.Parameters.AddWithValue("@id_mascota", EUtil.getDesencriptar(objE.ID_MSC_ENCRIP));
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
                        lista.TIPO = dr.IsDBNull(dr.GetOrdinal("TIPO")) ? string.Empty : dr.GetString(dr.GetOrdinal("TIPO"));
                        lista.FOTO = dr.IsDBNull(dr.GetOrdinal("FOTO")) ? string.Empty : dr.GetString(dr.GetOrdinal("FOTO"));
                        lista.ID_MSC_ENCRIP = objE.ID_MSC_ENCRIP;
                        lista.CANTIDAD = 1;
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
                cmd.Parameters.AddWithValue("@usuario", objE.USUARIO);
                cmd.Parameters.AddWithValue("@id", objE.ID);
                cmd.Parameters.AddWithValue("@fec_ini", objE.FEC_INI);
                cmd.Parameters.AddWithValue("@fec_fin", objE.FEC_FIN);
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
                        mItem.SOL_TOMADA = dr.IsDBNull(dr.GetOrdinal("sol_tomada")) ? 0 : dr.GetInt32(dr.GetOrdinal("sol_tomada"));
                        mItem.vPARAM1 = dr.IsDBNull(dr.GetOrdinal("fecha_solicitud")) ? string.Empty : dr.GetString(dr.GetOrdinal("fecha_solicitud"));
                        mItem.vPARAM2 = dr.IsDBNull(dr.GetOrdinal("responsable")) ? string.Empty : dr.GetString(dr.GetOrdinal("responsable"));

                        mItem.NOM_REP = dr.IsDBNull(dr.GetOrdinal("nom_rep")) ? string.Empty : dr.GetString(dr.GetOrdinal("nom_rep"));
                        mItem.APE_REP = dr.IsDBNull(dr.GetOrdinal("ape_rep")) ? string.Empty : dr.GetString(dr.GetOrdinal("ape_rep"));
                        mItem.TEL_REP = dr.IsDBNull(dr.GetOrdinal("tel_rep")) ? string.Empty : dr.GetString(dr.GetOrdinal("tel_rep"));
                        mItem.DNI_REP = dr.IsDBNull(dr.GetOrdinal("dni_rep")) ? string.Empty : dr.GetString(dr.GetOrdinal("dni_rep"));
                        mItem.DIRECCION = dr.IsDBNull(dr.GetOrdinal("direccion")) ? string.Empty : dr.GetString(dr.GetOrdinal("direccion"));
                        mItem.REFERENCIA = dr.IsDBNull(dr.GetOrdinal("referencia")) ? string.Empty : dr.GetString(dr.GetOrdinal("referencia"));
                        mItem.GEOGRAFIA_ID = dr.IsDBNull(dr.GetOrdinal("geografia_id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("geografia_id"));                        

                        mItem.DEPARTAMENTO = dr.IsDBNull(dr.GetOrdinal("departamento")) ? string.Empty : dr.GetString(dr.GetOrdinal("departamento"));
                        mItem.PROVINCIA = dr.IsDBNull(dr.GetOrdinal("provincia")) ? string.Empty : dr.GetString(dr.GetOrdinal("provincia"));
                        mItem.DISTRITO = dr.IsDBNull(dr.GetOrdinal("distrito")) ? string.Empty : dr.GetString(dr.GetOrdinal("distrito"));

                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }
        public static ESolicitud listarSolicitudxId(ESolicitud objE)
        {
            ESolicitud mItem= new ESolicitud();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_solicitud", cn);
                cmd.Parameters.AddWithValue("@id", objE.ID);
                cmd.Parameters.AddWithValue("@usuario", objE.USUARIO);
                cmd.Parameters.AddWithValue("@opcion", objE.OPCION);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        mItem = new ESolicitud();
                        //mItem.ID = dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"));
                        mItem.ID_ENCRIP = EUtil.getEncriptar((dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"))).ToString());
                        mItem.TIPO = dr.IsDBNull(dr.GetOrdinal("tipo")) ? string.Empty : dr.GetString(dr.GetOrdinal("tipo"));
                        mItem.DNI = dr.IsDBNull(dr.GetOrdinal("dni")) ? string.Empty : dr.GetString(dr.GetOrdinal("dni"));
                        mItem.MASCOTA = dr.IsDBNull(dr.GetOrdinal("mascota")) ? string.Empty : dr.GetString(dr.GetOrdinal("mascota"));
                        mItem.PROPIETARIO = dr.IsDBNull(dr.GetOrdinal("propietario")) ? string.Empty : dr.GetString(dr.GetOrdinal("propietario"));
                        mItem.EMAIL = dr.IsDBNull(dr.GetOrdinal("email")) ? string.Empty : dr.GetString(dr.GetOrdinal("email"));
                        mItem.TELEFONO = dr.IsDBNull(dr.GetOrdinal("telefono")) ? string.Empty : dr.GetString(dr.GetOrdinal("telefono"));
                        mItem.ESTADO = dr.IsDBNull(dr.GetOrdinal("estado")) ? 0 : dr.GetInt16(dr.GetOrdinal("estado"));
                        mItem.EST_DSC = dr.IsDBNull(dr.GetOrdinal("est_dsc")) ? string.Empty : dr.GetString(dr.GetOrdinal("est_dsc"));
                        mItem.vPARAM1 = dr.IsDBNull(dr.GetOrdinal("fecha_solicitud")) ? string.Empty : dr.GetString(dr.GetOrdinal("fecha_solicitud"));
                        mItem.vPARAM2 = dr.IsDBNull(dr.GetOrdinal("responsable")) ? string.Empty : dr.GetString(dr.GetOrdinal("responsable"));

                        mItem.NOM_REP = dr.IsDBNull(dr.GetOrdinal("nom_rep")) ? string.Empty : dr.GetString(dr.GetOrdinal("nom_rep"));
                        mItem.APE_REP = dr.IsDBNull(dr.GetOrdinal("ape_rep")) ? string.Empty : dr.GetString(dr.GetOrdinal("ape_rep"));
                        mItem.TEL_REP = dr.IsDBNull(dr.GetOrdinal("tel_rep")) ? string.Empty : dr.GetString(dr.GetOrdinal("tel_rep"));
                        mItem.DNI_REP = dr.IsDBNull(dr.GetOrdinal("dni_rep")) ? string.Empty : dr.GetString(dr.GetOrdinal("dni_rep"));
                        mItem.DIRECCION = dr.IsDBNull(dr.GetOrdinal("direccion")) ? string.Empty : dr.GetString(dr.GetOrdinal("direccion"));
                        mItem.REFERENCIA = dr.IsDBNull(dr.GetOrdinal("referencia")) ? string.Empty : dr.GetString(dr.GetOrdinal("referencia"));
                        mItem.GEOGRAFIA_ID = dr.IsDBNull(dr.GetOrdinal("geografia_id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("geografia_id"));
                        mItem.TOTAL = dr.IsDBNull(dr.GetOrdinal("total")) ? 0 : dr.GetDouble(dr.GetOrdinal("total"));
                        mItem.COMENTARIO = dr.IsDBNull(dr.GetOrdinal("comentario")) ? string.Empty  : dr.GetString(dr.GetOrdinal("comentario"));
                        mItem.FOTO = dr.IsDBNull(dr.GetOrdinal("foto")) ? string.Empty : dr.GetString(dr.GetOrdinal("foto"));

                        mItem.DEPARTAMENTO = dr.IsDBNull(dr.GetOrdinal("departamento")) ? string.Empty : dr.GetString(dr.GetOrdinal("departamento"));
                        mItem.PROVINCIA = dr.IsDBNull(dr.GetOrdinal("provincia")) ? string.Empty : dr.GetString(dr.GetOrdinal("provincia"));
                        mItem.DISTRITO = dr.IsDBNull(dr.GetOrdinal("distrito")) ? string.Empty : dr.GetString(dr.GetOrdinal("distrito"));
                    }
                }
            }
            return mItem;
        }
        public static ESolicitud listarPedidoxId(ESolicitud objE)
        {
            ESolicitud mItem = new ESolicitud();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_solicitud", cn);
                cmd.Parameters.AddWithValue("@id", objE.ID);
                cmd.Parameters.AddWithValue("@usuario", objE.USUARIO);
                cmd.Parameters.AddWithValue("@opcion", objE.OPCION);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        mItem = new ESolicitud();
                        //mItem.ID = dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"));
                        mItem.ID_ENCRIP = EUtil.getEncriptar((dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"))).ToString());
                        mItem.ID = dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"));
                        mItem.TOTAL = dr.IsDBNull(dr.GetOrdinal("total")) ? 0 : dr.GetDouble(dr.GetOrdinal("total"));
                        mItem.EMAIL = dr.IsDBNull(dr.GetOrdinal("email")) ? "" : dr.GetString(dr.GetOrdinal("email"));
                    }
                }
            }
            return mItem;
        }
        public static decimal getDelivery(ESolicitud objE)
        {
            decimal precio_delivery = 0;

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("SELECT dbo.fu_retorna_delivery(@geografia_id)", cn);
                cmd.Parameters.AddWithValue("@geografia_id", objE.GEOGRAFIA_ID);
                cn.Open();
                precio_delivery = (decimal)cmd.ExecuteScalar(); ;
            }
            return precio_delivery;
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
                cmd.Parameters.AddWithValue("@id", objE.ID);
                cmd.Parameters.AddWithValue("@usuario", objE.USUARIO);
                cmd.Parameters.AddWithValue("@comentario", objE.COMENTARIO);
                cmd.Parameters.AddWithValue("@opcion", 2);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                return cmd.ExecuteNonQuery();
            }
        }
        public static decimal guardarServicioWM(ESolicitud objE)
        {
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_guardar_pedido", cn);
                cmd.Parameters.AddWithValue("@usuario_id", objE.USUARIO_ID);
                cmd.Parameters.AddWithValue("@total", objE.TOTAL);
                cmd.Parameters.AddWithValue("@nom_rep", objE.NOM_REP);
                cmd.Parameters.AddWithValue("@ape_rep", objE.APE_REP);
                cmd.Parameters.AddWithValue("@tel_rep", objE.TEL_REP);
                cmd.Parameters.AddWithValue("@dni_rep", objE.DNI_REP);
                cmd.Parameters.AddWithValue("@direccion", objE.DIRECCION);
                cmd.Parameters.AddWithValue("@referencia", objE.REFERENCIA);
                cmd.Parameters.AddWithValue("@geografia_id", objE.GEOGRAFIA_ID);
                cmd.Parameters.AddWithValue("@detalle", objE.vPARAM1);
                cmd.Parameters.AddWithValue("@id_solicitud", objE.SOLICITUD_ID).Direction = ParameterDirection.Output;

                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();

                cmd.ExecuteNonQuery();

                if (cmd.Parameters["@id_solicitud"] != null)
                {
                    return (decimal)cmd.Parameters["@id_solicitud"].Value;
                }
                else {
                    return 0;
                }
            }
        }
        public static int AnularSolicitud(ESolicitud objE)
        {
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_solicitud", cn);
                cmd.Parameters.AddWithValue("@id", objE.ID);
                cmd.Parameters.AddWithValue("@usuario", objE.USUARIO);
                cmd.Parameters.AddWithValue("@comentario", objE.COMENTARIO);
                cmd.Parameters.AddWithValue("@opcion", 3);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                return cmd.ExecuteNonQuery();
            }
        }

        public static int ActualizarSolicitud(ESolicitud objE)
        {
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_solicitud", cn);
                cmd.Parameters.AddWithValue("@id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                cmd.Parameters.AddWithValue("@nom_rep", objE.NOM_REP);
                cmd.Parameters.AddWithValue("@ape_rep", objE.APE_REP);
                cmd.Parameters.AddWithValue("@tel_rep", objE.TEL_REP);
                cmd.Parameters.AddWithValue("@dni_rep", objE.DNI_REP);
                cmd.Parameters.AddWithValue("@direccion", objE.DIRECCION);
                cmd.Parameters.AddWithValue("@referencia", objE.REFERENCIA);
                cmd.Parameters.AddWithValue("@geografia_id", objE.GEOGRAFIA_ID);
                cmd.Parameters.AddWithValue("@comentario", objE.COMENTARIO);

                cmd.Parameters.AddWithValue("@usuario", objE.USUARIO);
                cmd.Parameters.AddWithValue("@opcion", 4);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                return cmd.ExecuteNonQuery();
            }
        }
        public static int LiberarSolicitud(ESolicitud objE)
        {
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_solicitud", cn);
                cmd.Parameters.AddWithValue("@id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                cmd.Parameters.AddWithValue("@usuario", objE.USUARIO);
                cmd.Parameters.AddWithValue("@opcion", 6);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                return cmd.ExecuteNonQuery();
            }
        }
    }
}
