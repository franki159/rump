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
    public class DMascota
    {
        public static List<EMascota> listarMascota(EMascota objE)
        {
            List<EMascota> lista = new List<EMascota>();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {

                SqlCommand cmd = new SqlCommand("usp_mnt_mascota", cn);
                cmd.Parameters.AddWithValue("@dni", objE.DNI);
                cmd.Parameters.AddWithValue("@usuario_id", objE.USUARIO_ID);
                cmd.Parameters.AddWithValue("@opcion", 1);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        EMascota mItem = new EMascota();
                        mItem.ID_ENCRIP = EUtil.getEncriptar((dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"))).ToString());
                        mItem.ESTADO = dr.IsDBNull(dr.GetOrdinal("estado")) ? 0 : dr.GetInt16(dr.GetOrdinal("estado"));
                        mItem.NOMBRE = dr.IsDBNull(dr.GetOrdinal("nombre")) ? string.Empty : dr.GetString(dr.GetOrdinal("nombre"));
                        mItem.SEXO = dr.IsDBNull(dr.GetOrdinal("sexo")) ? string.Empty : dr.GetString(dr.GetOrdinal("sexo"));
                        mItem.TAMANO = dr.IsDBNull(dr.GetOrdinal("tamano")) ? string.Empty : dr.GetString(dr.GetOrdinal("tamano"));
                        mItem.COLOR = dr.IsDBNull(dr.GetOrdinal("color")) ? string.Empty : dr.GetString(dr.GetOrdinal("color"));
                        mItem.TIPO_DSC = dr.IsDBNull(dr.GetOrdinal("TIPO_DSC")) ? string.Empty : dr.GetString(dr.GetOrdinal("TIPO_DSC"));
                        mItem.RAZA_DSC = dr.IsDBNull(dr.GetOrdinal("RAZA_DSC")) ? string.Empty : dr.GetString(dr.GetOrdinal("RAZA_DSC"));
                        mItem.FOTO = dr.IsDBNull(dr.GetOrdinal("foto")) ? string.Empty : dr.GetString(dr.GetOrdinal("foto"));
                        mItem.DNI = dr.IsDBNull(dr.GetOrdinal("dni")) ? string.Empty : dr.GetString(dr.GetOrdinal("dni"));
                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }
        public static EMascota ObtenerMascota(EMascota objE)
        {
            EMascota mItem = new EMascota();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {

                SqlCommand cmd = new SqlCommand("usp_mnt_mascota", cn);
                cmd.Parameters.AddWithValue("@id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                cmd.Parameters.AddWithValue("@opcion", 2);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                using (SqlDataReader dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        mItem = new EMascota();
                        mItem.ID = dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"));
                        mItem.DNI = dr.IsDBNull(dr.GetOrdinal("dni")) ? string.Empty : dr.GetString(dr.GetOrdinal("dni"));
                        mItem.NOMBRE = dr.IsDBNull(dr.GetOrdinal("nombre")) ? string.Empty : dr.GetString(dr.GetOrdinal("nombre"));
                        mItem.APELLIDO = dr.IsDBNull(dr.GetOrdinal("apellido")) ? string.Empty : dr.GetString(dr.GetOrdinal("apellido"));
                        mItem.COD_MICROCHIP = dr.IsDBNull(dr.GetOrdinal("cod_microchip")) ? string.Empty : dr.GetString(dr.GetOrdinal("cod_microchip"));
                        mItem.SEXO = dr.IsDBNull(dr.GetOrdinal("sexo")) ? string.Empty : dr.GetString(dr.GetOrdinal("sexo"));
                        mItem.TAMANO = dr.IsDBNull(dr.GetOrdinal("tamano")) ? string.Empty : dr.GetString(dr.GetOrdinal("tamano"));
                        mItem.MASCOTA_TIPO_ID = dr.IsDBNull(dr.GetOrdinal("mascota_tipo_id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("mascota_tipo_id"));
                        mItem.MASCOTA_RAZA_ID = dr.IsDBNull(dr.GetOrdinal("mascota_raza_id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("mascota_raza_id"));
                        mItem.CALIFICACION = dr.IsDBNull(dr.GetOrdinal("calificacion")) ? string.Empty : dr.GetString(dr.GetOrdinal("calificacion"));
                        mItem.COLOR = dr.IsDBNull(dr.GetOrdinal("color")) ? string.Empty : dr.GetString(dr.GetOrdinal("color"));
                        mItem.FEC_NAC = dr.IsDBNull(dr.GetOrdinal("fecha_nacimiento")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("fecha_nacimiento"));
                        mItem.BIOGRAFIA = dr.IsDBNull(dr.GetOrdinal("biografia")) ? string.Empty : dr.GetString(dr.GetOrdinal("biografia"));
                        mItem.FAMILIARP = dr.IsDBNull(dr.GetOrdinal("familiarp")) ? string.Empty : dr.GetString(dr.GetOrdinal("familiarp"));
                        mItem.DNIP = dr.IsDBNull(dr.GetOrdinal("dnip")) ? string.Empty : dr.GetString(dr.GetOrdinal("dnip"));
                        mItem.TELEFONOP = dr.IsDBNull(dr.GetOrdinal("telefonop")) ? string.Empty : dr.GetString(dr.GetOrdinal("telefonop"));
                        mItem.FAMILIARM = dr.IsDBNull(dr.GetOrdinal("familiarm")) ? string.Empty : dr.GetString(dr.GetOrdinal("familiarm"));
                        mItem.DNIM = dr.IsDBNull(dr.GetOrdinal("dnim")) ? string.Empty : dr.GetString(dr.GetOrdinal("dnim"));
                        mItem.TELEFONOM = dr.IsDBNull(dr.GetOrdinal("telefonom")) ? string.Empty : dr.GetString(dr.GetOrdinal("telefonom"));
                        mItem.DEPARTAMENTO = dr.IsDBNull(dr.GetOrdinal("departamento")) ? string.Empty : dr.GetString(dr.GetOrdinal("departamento"));
                        mItem.PROVINCIA = dr.IsDBNull(dr.GetOrdinal("provincia")) ? string.Empty : dr.GetString(dr.GetOrdinal("provincia"));
                        mItem.GEOGRAFIA_ID = dr.IsDBNull(dr.GetOrdinal("geografia_id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("geografia_id"));
                        mItem.DIRECCION = dr.IsDBNull(dr.GetOrdinal("direccion")) ? string.Empty : dr.GetString(dr.GetOrdinal("direccion"));
                        mItem.PISO = dr.IsDBNull(dr.GetOrdinal("piso")) ? string.Empty : dr.GetString(dr.GetOrdinal("piso"));
                        mItem.REFERENCIA = dr.IsDBNull(dr.GetOrdinal("referencia")) ? string.Empty : dr.GetString(dr.GetOrdinal("referencia"));
                        //Salud
                        mItem.CASTRADO = dr.IsDBNull(dr.GetOrdinal("castrado")) ? 0 : dr.GetInt16(dr.GetOrdinal("castrado"));
                        mItem.VISITA = dr.IsDBNull(dr.GetOrdinal("visita")) ? 0 : dr.GetInt16(dr.GetOrdinal("visita"));
                        mItem.ALERGIA_MEDICAMENTO = dr.IsDBNull(dr.GetOrdinal("alergia_medicamento")) ? 0 : dr.GetInt16(dr.GetOrdinal("alergia_medicamento"));
                        mItem.VACUNACION = dr.IsDBNull(dr.GetOrdinal("vacunacion")) ? 0 : dr.GetInt16(dr.GetOrdinal("vacunacion"));
                        mItem.ANTIRRABICA = dr.IsDBNull(dr.GetOrdinal("antirrabica")) ? 0 : dr.GetInt16(dr.GetOrdinal("antirrabica"));
                        mItem.ALERGIA = dr.IsDBNull(dr.GetOrdinal("alergia")) ? 0 : dr.GetInt16(dr.GetOrdinal("alergia"));
                        mItem.ENFERMEDAD = dr.IsDBNull(dr.GetOrdinal("enfermedad")) ? 0 : dr.GetInt16(dr.GetOrdinal("enfermedad"));
                        mItem.FEC_DESPARACITACION = dr.IsDBNull(dr.GetOrdinal("fecha_desparacitacion")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("fecha_desparacitacion"));
                        mItem.ENFERMEDAD_DSC = dr.IsDBNull(dr.GetOrdinal("enfermedad_descripcion")) ? string.Empty : dr.GetString(dr.GetOrdinal("enfermedad_descripcion"));
                        //----------- Nuevo
                        mItem.SEXTUPLE = dr.IsDBNull(dr.GetOrdinal("sextuple")) ? 0 : dr.GetInt16(dr.GetOrdinal("sextuple"));
                        mItem.FEC_SEXTUPLE = dr.IsDBNull(dr.GetOrdinal("fecha_sextuple")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("fecha_sextuple"));
                        mItem.TRIPLEFEL = dr.IsDBNull(dr.GetOrdinal("triplefel")) ? 0 : dr.GetInt16(dr.GetOrdinal("triplefel"));
                        mItem.FEC_TRIPLEFEL = dr.IsDBNull(dr.GetOrdinal("fecha_triplefel")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("fecha_triplefel"));
                        mItem.LEUCEMIA = dr.IsDBNull(dr.GetOrdinal("leucemia")) ? 0 : dr.GetInt16(dr.GetOrdinal("leucemia"));
                        mItem.FEC_LEUCEMIA = dr.IsDBNull(dr.GetOrdinal("fecha_leucemia")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("fecha_leucemia"));
                        mItem.FEC_ANTIRRABICA = dr.IsDBNull(dr.GetOrdinal("fecha_antirrabica")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("fecha_antirrabica"));
                        mItem.LIMP_DENTAL = dr.IsDBNull(dr.GetOrdinal("limp_dental")) ? 0 : dr.GetInt16(dr.GetOrdinal("limp_dental"));
                        mItem.ALERGIA_DSC = dr.IsDBNull(dr.GetOrdinal("alergia_descripcion")) ? string.Empty : dr.GetString(dr.GetOrdinal("alergia_descripcion"));
                    }

                    if (dr.NextResult())
                    {
                        mItem.lMASCOTA = new List<EMascota>();
                        while (dr.Read())
                        {                            
                            EMascota itemTemp = new EMascota();
                            //Foto
                            itemTemp.GALERIA_ID = dr.IsDBNull(dr.GetOrdinal("galeria_id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("galeria_id"));
                            itemTemp.FOTO = dr.IsDBNull(dr.GetOrdinal("foto")) ? string.Empty : dr.GetString(dr.GetOrdinal("foto"));

                            mItem.lMASCOTA.Add(itemTemp);
                        }
                    }
                }
            }
            return mItem;

        }

        public static EMascota ObtenerMascotaxDNI(EMascota objE)
        {
            EMascota mItem = new EMascota();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {

                SqlCommand cmd = new SqlCommand("usp_mnt_mascota", cn);
                cmd.Parameters.AddWithValue("@dni", objE.DNI);
                cmd.Parameters.AddWithValue("@opcion", 9);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                using (SqlDataReader dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        mItem = new EMascota();
                        mItem.ID = dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"));
                        mItem.DNI = dr.IsDBNull(dr.GetOrdinal("dni")) ? string.Empty : dr.GetString(dr.GetOrdinal("dni"));
                        mItem.NOMBRE = dr.IsDBNull(dr.GetOrdinal("nombre")) ? string.Empty : dr.GetString(dr.GetOrdinal("nombre"));
                        mItem.APELLIDO = dr.IsDBNull(dr.GetOrdinal("apellido")) ? string.Empty : dr.GetString(dr.GetOrdinal("apellido"));
                        mItem.COD_MICROCHIP = dr.IsDBNull(dr.GetOrdinal("cod_microchip")) ? string.Empty : dr.GetString(dr.GetOrdinal("cod_microchip"));
                        mItem.SEXO = dr.IsDBNull(dr.GetOrdinal("sexo")) ? string.Empty : dr.GetString(dr.GetOrdinal("sexo"));
                        mItem.TAMANO = dr.IsDBNull(dr.GetOrdinal("tamano")) ? string.Empty : dr.GetString(dr.GetOrdinal("tamano"));
                        mItem.MASCOTA_TIPO_ID = dr.IsDBNull(dr.GetOrdinal("mascota_tipo_id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("mascota_tipo_id"));
                        mItem.MASCOTA_RAZA_ID = dr.IsDBNull(dr.GetOrdinal("mascota_raza_id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("mascota_raza_id"));
                        mItem.CALIFICACION = dr.IsDBNull(dr.GetOrdinal("calificacion")) ? string.Empty : dr.GetString(dr.GetOrdinal("calificacion"));
                        mItem.COLOR = dr.IsDBNull(dr.GetOrdinal("color")) ? string.Empty : dr.GetString(dr.GetOrdinal("color"));
                        mItem.FEC_NAC = dr.IsDBNull(dr.GetOrdinal("fecha_nacimiento")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("fecha_nacimiento"));
                        mItem.BIOGRAFIA = dr.IsDBNull(dr.GetOrdinal("biografia")) ? string.Empty : dr.GetString(dr.GetOrdinal("biografia"));
                        mItem.FAMILIARP = dr.IsDBNull(dr.GetOrdinal("familiarp")) ? string.Empty : dr.GetString(dr.GetOrdinal("familiarp"));
                        mItem.DNIP = dr.IsDBNull(dr.GetOrdinal("dnip")) ? string.Empty : dr.GetString(dr.GetOrdinal("dnip"));
                        mItem.TELEFONOP = dr.IsDBNull(dr.GetOrdinal("telefonop")) ? string.Empty : dr.GetString(dr.GetOrdinal("telefonop"));
                        mItem.FAMILIARM = dr.IsDBNull(dr.GetOrdinal("familiarm")) ? string.Empty : dr.GetString(dr.GetOrdinal("familiarm"));
                        mItem.DNIM = dr.IsDBNull(dr.GetOrdinal("dnim")) ? string.Empty : dr.GetString(dr.GetOrdinal("dnim"));
                        mItem.TELEFONOM = dr.IsDBNull(dr.GetOrdinal("telefonom")) ? string.Empty : dr.GetString(dr.GetOrdinal("telefonom"));
                        mItem.DEPARTAMENTO = dr.IsDBNull(dr.GetOrdinal("departamento")) ? string.Empty : dr.GetString(dr.GetOrdinal("departamento"));
                        mItem.PROVINCIA = dr.IsDBNull(dr.GetOrdinal("provincia")) ? string.Empty : dr.GetString(dr.GetOrdinal("provincia"));
                        mItem.DISTRITO = dr.IsDBNull(dr.GetOrdinal("distrito")) ? string.Empty : dr.GetString(dr.GetOrdinal("distrito"));
                        mItem.GEOGRAFIA_ID = dr.IsDBNull(dr.GetOrdinal("geografia_id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("geografia_id"));
                        mItem.DIRECCION = dr.IsDBNull(dr.GetOrdinal("direccion")) ? string.Empty : dr.GetString(dr.GetOrdinal("direccion"));
                        mItem.PISO = dr.IsDBNull(dr.GetOrdinal("piso")) ? string.Empty : dr.GetString(dr.GetOrdinal("piso"));
                        mItem.REFERENCIA = dr.IsDBNull(dr.GetOrdinal("referencia")) ? string.Empty : dr.GetString(dr.GetOrdinal("referencia"));
                        mItem.TIPO = dr.IsDBNull(dr.GetOrdinal("tipo")) ? string.Empty : dr.GetString(dr.GetOrdinal("tipo"));
                        mItem.RAZA = dr.IsDBNull(dr.GetOrdinal("raza")) ? string.Empty : dr.GetString(dr.GetOrdinal("raza"));
                        mItem.FEC_CREA = dr.IsDBNull(dr.GetOrdinal("created_at")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("created_at"));
                        //Salud
                        mItem.CASTRADO = dr.IsDBNull(dr.GetOrdinal("castrado")) ? 0 : dr.GetInt16(dr.GetOrdinal("castrado"));
                        mItem.VISITA = dr.IsDBNull(dr.GetOrdinal("visita")) ? 0 : dr.GetInt16(dr.GetOrdinal("visita"));
                        mItem.ALERGIA_MEDICAMENTO = dr.IsDBNull(dr.GetOrdinal("alergia_medicamento")) ? 0 : dr.GetInt16(dr.GetOrdinal("alergia_medicamento"));
                        mItem.VACUNACION = dr.IsDBNull(dr.GetOrdinal("vacunacion")) ? 0 : dr.GetInt16(dr.GetOrdinal("vacunacion"));
                        mItem.ANTIRRABICA = dr.IsDBNull(dr.GetOrdinal("antirrabica")) ? 0 : dr.GetInt16(dr.GetOrdinal("antirrabica"));
                        mItem.ALERGIA = dr.IsDBNull(dr.GetOrdinal("alergia")) ? 0 : dr.GetInt16(dr.GetOrdinal("alergia"));
                        mItem.ENFERMEDAD = dr.IsDBNull(dr.GetOrdinal("enfermedad")) ? 0 : dr.GetInt16(dr.GetOrdinal("enfermedad"));
                        mItem.FEC_DESPARACITACION = dr.IsDBNull(dr.GetOrdinal("fecha_desparacitacion")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("fecha_desparacitacion"));
                        mItem.ENFERMEDAD_DSC = dr.IsDBNull(dr.GetOrdinal("enfermedad_descripcion")) ? string.Empty : dr.GetString(dr.GetOrdinal("enfermedad_descripcion"));
                        //----------- Nuevo
                        mItem.SEXTUPLE = dr.IsDBNull(dr.GetOrdinal("sextuple")) ? 0 : dr.GetInt16(dr.GetOrdinal("sextuple"));
                        mItem.FEC_SEXTUPLE = dr.IsDBNull(dr.GetOrdinal("fecha_sextuple")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("fecha_sextuple"));
                        mItem.TRIPLEFEL = dr.IsDBNull(dr.GetOrdinal("triplefel")) ? 0 : dr.GetInt16(dr.GetOrdinal("triplefel"));
                        mItem.FEC_TRIPLEFEL = dr.IsDBNull(dr.GetOrdinal("fecha_triplefel")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("fecha_triplefel"));
                        mItem.LEUCEMIA = dr.IsDBNull(dr.GetOrdinal("leucemia")) ? 0 : dr.GetInt16(dr.GetOrdinal("leucemia"));
                        mItem.FEC_LEUCEMIA = dr.IsDBNull(dr.GetOrdinal("fecha_leucemia")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("fecha_leucemia"));
                        mItem.FEC_ANTIRRABICA = dr.IsDBNull(dr.GetOrdinal("fecha_antirrabica")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("fecha_antirrabica"));
                        mItem.LIMP_DENTAL = dr.IsDBNull(dr.GetOrdinal("limp_dental")) ? 0 : dr.GetInt16(dr.GetOrdinal("limp_dental"));
                        mItem.ALERGIA_DSC = dr.IsDBNull(dr.GetOrdinal("alergia_descripcion")) ? string.Empty : dr.GetString(dr.GetOrdinal("alergia_descripcion"));
                    }

                    if (dr.NextResult())
                    {
                        mItem.lMASCOTA = new List<EMascota>();
                        while (dr.Read())
                        {
                            EMascota itemTemp = new EMascota();
                            //Foto
                            itemTemp.GALERIA_ID = dr.IsDBNull(dr.GetOrdinal("galeria_id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("galeria_id"));
                            itemTemp.FOTO = dr.IsDBNull(dr.GetOrdinal("foto")) ? string.Empty : dr.GetString(dr.GetOrdinal("foto"));

                            mItem.lMASCOTA.Add(itemTemp);
                        }
                    }
                }
            }
            return mItem;

        }
        
        public static int AnularMascotaWM(EMascota objE)
        {
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_mascota", cn);
                cmd.Parameters.AddWithValue("@id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                cmd.Parameters.AddWithValue("@usuario_id", objE.USUARIO_ID);
                cmd.Parameters.AddWithValue("@opcion", 3);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                return cmd.ExecuteNonQuery();
            }
        }
        public static int AdopcionMascotaWM(EMascota objE)
        {
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_mascota", cn);
                cmd.Parameters.AddWithValue("@id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                cmd.Parameters.AddWithValue("@usuario_id", objE.USUARIO_ID);
                cmd.Parameters.AddWithValue("@opcion", 10);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                return cmd.ExecuteNonQuery();
            }
        }
        public static int EncontradaMascotaWM(EMascota objE)
        {
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_mascota", cn);
                cmd.Parameters.AddWithValue("@id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                cmd.Parameters.AddWithValue("@usuario_id", objE.USUARIO_ID);
                cmd.Parameters.AddWithValue("@opcion", 13);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                return cmd.ExecuteNonQuery();
            }
        }
        
        public static int NoAdopcionMascotaWM(EMascota objE)
        {
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_mascota", cn);
                cmd.Parameters.AddWithValue("@id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                cmd.Parameters.AddWithValue("@usuario_id", objE.USUARIO_ID);
                cmd.Parameters.AddWithValue("@opcion", 11);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                return cmd.ExecuteNonQuery();
            }
        }
        public static string PerdidaMascotaWM(EMascota objE)
        {
            string email = "";
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_mascota", cn);
                cmd.Parameters.AddWithValue("@id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                cmd.Parameters.AddWithValue("@referencia", objE.OBSERVACION);
                cmd.Parameters.AddWithValue("@fecha_nac", objE.FEC_NAC);
                cmd.Parameters.AddWithValue("@usuario_id", objE.USUARIO_ID);
                cmd.Parameters.AddWithValue("@opcion", 12);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                using (SqlDataReader dr = cmd.ExecuteReader())
                {
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            email = dr.IsDBNull(dr.GetOrdinal("email")) ? string.Empty : dr.GetString(dr.GetOrdinal("email"));
                        }
                    }
                }

                return email;
            }
        }
        public static string MuerteMascotaWM(EMascota objE)
        {
            string email = "";
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_mascota", cn);
                cmd.Parameters.AddWithValue("@id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                cmd.Parameters.AddWithValue("@referencia", objE.OBSERVACION);
                cmd.Parameters.AddWithValue("@fecha_nac", objE.FEC_NAC);
                cmd.Parameters.AddWithValue("@usuario_id", objE.USUARIO_ID);
                cmd.Parameters.AddWithValue("@opcion", 14);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                using (SqlDataReader dr = cmd.ExecuteReader())
                {
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            email = dr.IsDBNull(dr.GetOrdinal("email")) ? string.Empty : dr.GetString(dr.GetOrdinal("email"));
                        }
                    }
                }

                return email;
            }
        }
        public static string SolicitarServicioWM(EMascota objE)
        {
            string email = "";
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_solicitar_servicio", cn);
                cmd.Parameters.AddWithValue("@id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                cmd.Parameters.AddWithValue("@usuario_id", objE.USUARIO_ID);
                cmd.Parameters.AddWithValue("@opcion", objE.OPCION);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                using (SqlDataReader dr = cmd.ExecuteReader())
                {
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            email = dr.IsDBNull(dr.GetOrdinal("email")) ? string.Empty : dr.GetString(dr.GetOrdinal("email"));
                        }
                    }
                }

                return email;
            }
        }
        public static int ActualizarMascotaWM(EMascota objE)
        {
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_mascota", cn);
                
                cmd.Parameters.AddWithValue("@id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                cmd.Parameters.AddWithValue("@tamano", objE.TAMANO);

                cmd.Parameters.AddWithValue("@cod_microchip", objE.COD_MICROCHIP);
                cmd.Parameters.AddWithValue("@mascota_raza_id", objE.MASCOTA_RAZA_ID);
                cmd.Parameters.AddWithValue("@calificacion", objE.CALIFICACION);
                cmd.Parameters.AddWithValue("@color", objE.COLOR);
                cmd.Parameters.AddWithValue("@biografia", objE.BIOGRAFIA);
                cmd.Parameters.AddWithValue("@castrado", objE.CASTRADO);
                cmd.Parameters.AddWithValue("@familiarp", objE.FAMILIARP);
                cmd.Parameters.AddWithValue("@dnip", objE.DNIP);
                cmd.Parameters.AddWithValue("@telefonop", objE.TELEFONOP);
                cmd.Parameters.AddWithValue("@familiarm", objE.FAMILIARM);
                cmd.Parameters.AddWithValue("@dnim", objE.DNIM);
                cmd.Parameters.AddWithValue("@telefonom", objE.TELEFONOM);
                cmd.Parameters.AddWithValue("@geografia_id", objE.DISTRITO);
                cmd.Parameters.AddWithValue("@direccion", objE.DIRECCION);
                cmd.Parameters.AddWithValue("@piso", objE.PISO);
                cmd.Parameters.AddWithValue("@referencia", objE.REFERENCIA);
                cmd.Parameters.AddWithValue("@visita", objE.VISITA);
                cmd.Parameters.AddWithValue("@alergia_medicamento", objE.ALERGIA_MEDICAMENTO);
                cmd.Parameters.AddWithValue("@vacunacion", objE.VACUNACION);
                cmd.Parameters.AddWithValue("@antirrabica", objE.ANTIRRABICA);
                cmd.Parameters.AddWithValue("@alergia", objE.ALERGIA);
                cmd.Parameters.AddWithValue("@fecha_desparacitacion", objE.FEC_DESPARACITACION);
                cmd.Parameters.AddWithValue("@enfermedad", objE.ENFERMEDAD);
                cmd.Parameters.AddWithValue("@enfermedad_descripcion", objE.ENFERMEDAD_DSC);
                /////////
                cmd.Parameters.AddWithValue("@sextuple", objE.SEXTUPLE);
                cmd.Parameters.AddWithValue("@fecha_sextuple", objE.FEC_SEXTUPLE);
                cmd.Parameters.AddWithValue("@triplefel", objE.TRIPLEFEL);
                cmd.Parameters.AddWithValue("@fecha_triplefel", objE.FEC_TRIPLEFEL);
                cmd.Parameters.AddWithValue("@leucemia", objE.LEUCEMIA);
                cmd.Parameters.AddWithValue("@fecha_leucemia", objE.FEC_LEUCEMIA);
                cmd.Parameters.AddWithValue("@fecha_antirrabica", objE.FEC_ANTIRRABICA);
                cmd.Parameters.AddWithValue("@limp_dental", objE.LIMP_DENTAL);
                cmd.Parameters.AddWithValue("@alergia_descripcion", objE.ALERGIA_DSC);
                cmd.Parameters.AddWithValue("@opcion", 4);
                cmd.CommandType = CommandType.StoredProcedure;
                /////////
                cn.Open();
                return cmd.ExecuteNonQuery();
            }
        }
        public static int ActualizarFotoMascotaWM(EMascota objE)
        {
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_mascota", cn);
                cmd.Parameters.AddWithValue("@galeria_id", objE.GALERIA_ID);
                cmd.Parameters.AddWithValue("@foto", objE.FOTO);
                cmd.Parameters.AddWithValue("@opcion", 5);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                return cmd.ExecuteNonQuery();
            }
        }
        public static string InsertarFotoMascotaWM(EMascota objE)
        {
            string foto = "";
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_mascota", cn);
                cmd.Parameters.AddWithValue("@id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                cmd.Parameters.AddWithValue("@foto", objE.FOTO);
                cmd.Parameters.AddWithValue("@opcion", 8);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                using (SqlDataReader dr = cmd.ExecuteReader())
                {
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            foto = dr.IsDBNull(dr.GetOrdinal("FOTO")) ? string.Empty : dr.GetString(dr.GetOrdinal("FOTO"));
                        }
                    }
                }

                return foto;
            }
        }
        
        public static int ReportarMascotaWM(EMascota objE) {
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_reportar_mascota", cn);
                cmd.Parameters.AddWithValue("@dni", objE.DNI);
                cmd.Parameters.AddWithValue("@fecha", objE.FEC_CREA);
                cmd.Parameters.AddWithValue("@nombre", objE.NOMBRE);
                cmd.Parameters.AddWithValue("@correo", objE.CORREO);
                cmd.Parameters.AddWithValue("@telefono", objE.TELEFONO);
                cmd.Parameters.AddWithValue("@observacion", objE.OBSERVACION);
                cmd.Parameters.AddWithValue("@opcion", 1);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                return cmd.ExecuteNonQuery();
            }
        }
        public static string RegistrarMascotaWM(EMascota objE)
        {
            decimal ID_MASCOTA = 0;

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                
                SqlTransaction transaccRegistro;
                cn.Open();
                transaccRegistro = cn.BeginTransaction();

                try
                {
                    using (SqlCommand cmd = new SqlCommand("usp_mnt_mascota", cn, transaccRegistro))
                    {
                        cmd.Parameters.AddWithValue("@nombre", objE.NOMBRE);
                        cmd.Parameters.AddWithValue("@apellido", objE.APELLIDO);
                        cmd.Parameters.AddWithValue("@sexo", objE.SEXO);
                        cmd.Parameters.AddWithValue("@cod_microchip", objE.COD_MICROCHIP);
                        cmd.Parameters.AddWithValue("@tamano", objE.TAMANO);
                        cmd.Parameters.AddWithValue("@color", objE.COLOR);
                        cmd.Parameters.AddWithValue("@fecha_nac", objE.FEC_NAC);
                        cmd.Parameters.AddWithValue("@biografia", objE.BIOGRAFIA);
                        cmd.Parameters.AddWithValue("@calificacion", objE.CALIFICACION);
                        cmd.Parameters.AddWithValue("@castrado", objE.CASTRADO);
                        cmd.Parameters.AddWithValue("@mascota_raza_id", objE.MASCOTA_RAZA_ID);
                        cmd.Parameters.AddWithValue("@usuario_id", objE.USUARIO_ID);
                        cmd.Parameters.AddWithValue("@opcion", 6);
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            if (dr.HasRows)
                            {
                                while (dr.Read())
                                {
                                    ID_MASCOTA = dr.IsDBNull(dr.GetOrdinal("ID_MASCOTA")) ? 0 : dr.GetDecimal(dr.GetOrdinal("ID_MASCOTA"));
                                }
                            }
                        }
                    }
                    //*********************** DATOS MASCOTA
                    using (SqlCommand cmd = new SqlCommand("usp_mnt_mascota", cn, transaccRegistro))
                    {
                        cmd.Parameters.AddWithValue("@id", ID_MASCOTA);
                        cmd.Parameters.AddWithValue("@foto", EUtil.getEncriptar(ID_MASCOTA.ToString()) + "." + objE.EXTENSION);

                        cmd.Parameters.AddWithValue("@familiarp", objE.FAMILIARP);
                        cmd.Parameters.AddWithValue("@dnip", objE.DNIP);
                        cmd.Parameters.AddWithValue("@telefonop", objE.TELEFONOP);
                        cmd.Parameters.AddWithValue("@familiarm", objE.FAMILIARM);
                        cmd.Parameters.AddWithValue("@dnim", objE.DNIM);
                        cmd.Parameters.AddWithValue("@telefonom", objE.TELEFONOM);

                        cmd.Parameters.AddWithValue("@geografia_id", objE.DISTRITO);
                        cmd.Parameters.AddWithValue("@direccion", objE.DIRECCION);
                        cmd.Parameters.AddWithValue("@piso", objE.PISO);
                        cmd.Parameters.AddWithValue("@referencia", objE.REFERENCIA);

                        cmd.Parameters.AddWithValue("@visita", objE.VISITA);
                        cmd.Parameters.AddWithValue("@alergia_medicamento", objE.ALERGIA_MEDICAMENTO);
                        cmd.Parameters.AddWithValue("@vacunacion", objE.VACUNACION);
                        cmd.Parameters.AddWithValue("@antirrabica", objE.ANTIRRABICA);
                        cmd.Parameters.AddWithValue("@alergia", objE.ALERGIA);
                        cmd.Parameters.AddWithValue("@enfermedad", objE.ENFERMEDAD);
                        cmd.Parameters.AddWithValue("@fecha_desparacitacion", objE.FEC_DESPARACITACION);
                        cmd.Parameters.AddWithValue("@enfermedad_descripcion", objE.ENFERMEDAD_DSC);
                        /////////
                        cmd.Parameters.AddWithValue("@sextuple", objE.SEXTUPLE);
                        cmd.Parameters.AddWithValue("@fecha_sextuple", objE.FEC_SEXTUPLE);
                        cmd.Parameters.AddWithValue("@triplefel", objE.TRIPLEFEL);
                        cmd.Parameters.AddWithValue("@fecha_triplefel", objE.FEC_TRIPLEFEL);
                        cmd.Parameters.AddWithValue("@leucemia", objE.LEUCEMIA);
                        cmd.Parameters.AddWithValue("@fecha_leucemia", objE.FEC_LEUCEMIA);
                        cmd.Parameters.AddWithValue("@fecha_antirrabica", objE.FEC_ANTIRRABICA);
                        cmd.Parameters.AddWithValue("@limp_dental", objE.LIMP_DENTAL);
                        cmd.Parameters.AddWithValue("@alergia_descripcion", objE.ALERGIA_DSC);
                        cmd.Parameters.AddWithValue("@opcion", 7);
                        cmd.CommandType = CommandType.StoredProcedure;
                        /////////
                        cmd.ExecuteNonQuery();
                    }     
                    
                    transaccRegistro.Commit();
                }
                catch (Exception ex)
                {
                    transaccRegistro.Rollback();
                    ID_MASCOTA = 0;
                    throw (ex);
                }
                cn.Close();
            }

            return EUtil.getEncriptar(ID_MASCOTA.ToString());
        }
    }
}
