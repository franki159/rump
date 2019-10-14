using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDAD;
using System.Data;
using MySql.Data.MySqlClient;
using MySql.Data;

namespace DATOS
{
    public class DMascota
    {
        public static List<EMascota> listarMascota(EMascota objE)
        {
            List<EMascota> lista = new List<EMascota>();

            using (MySqlConnection cn = new MySqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRump)))
            {

                MySqlCommand cmd = new MySqlCommand(""+
                    "select T.id, T.nombre, T.sexo, T.tamano, T.color, T.TIPO_DSC, T.RAZA_DSC, mg.foto from (" +
                    "SELECT " +
                    "   m.id, m.nombre, m.sexo, m.tamano, m.color, mt.tipo TIPO_DSC, mr.tipo RAZA_DSC, (select max(mg.id) from mascota_galeria mg where m.id = mg.mascota_id and mg.estado = 1) galeria_id FROM mascota m " +
                    "left join mascota_salud ms on m.id = ms.mascota_id and ms.estado = 1 " +
                    "left join mascota_raza mr on m.mascota_raza_id = mr.id and mr.estado = 1 " +
                    "left join mascota_tipo mt on mt.id = mr.mascota_tipo_id and mt.estado = 1 " +
                    "where m.dni = if(@dni='',m.dni,@dni)  and m.usuario_id=if(@usuario_id=0, m.usuario_id, @usuario_id)" +
                    ") as T " +
                    "left join mascota_galeria mg on T.galeria_id = mg.id", cn);
                cmd.Parameters.AddWithValue("@dni", objE.DNI);
                cmd.Parameters.AddWithValue("@usuario_id", objE.USUARIO_ID);
                cn.Open();
                MySqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        EMascota mItem = new EMascota();
                        mItem.ID = dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetInt32(dr.GetOrdinal("id"));
                        mItem.NOMBRE = dr.IsDBNull(dr.GetOrdinal("nombre")) ? string.Empty : dr.GetString(dr.GetOrdinal("nombre"));
                        mItem.SEXO = dr.IsDBNull(dr.GetOrdinal("sexo")) ? string.Empty : dr.GetString(dr.GetOrdinal("sexo"));
                        mItem.TAMANO = dr.IsDBNull(dr.GetOrdinal("tamano")) ? string.Empty : dr.GetString(dr.GetOrdinal("tamano"));
                        mItem.COLOR = dr.IsDBNull(dr.GetOrdinal("color")) ? string.Empty : dr.GetString(dr.GetOrdinal("color"));
                        mItem.TIPO_DSC = dr.IsDBNull(dr.GetOrdinal("TIPO_DSC")) ? string.Empty : dr.GetString(dr.GetOrdinal("TIPO_DSC"));
                        mItem.RAZA_DSC = dr.IsDBNull(dr.GetOrdinal("RAZA_DSC")) ? string.Empty : dr.GetString(dr.GetOrdinal("RAZA_DSC"));
                        mItem.FOTO = dr.IsDBNull(dr.GetOrdinal("foto")) ? string.Empty : dr.GetString(dr.GetOrdinal("foto"));
                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }
        public static EMascota ObtenerMascota(EMascota objE)
        {
            EMascota mItem = new EMascota();

            using (MySqlConnection cn = new MySqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRump)))
            {

                MySqlCommand cmd = new MySqlCommand("" +
                    "select T.*, mg.foto from (" +
                    "SELECT m.id, m.dni, m.nombre, m.apellido, m.sexo, m.tamano, mr.mascota_tipo_id, m.mascota_raza_id, m.calificacion, m.color, m.fecha_nacimiento, m.biografia," +
                    " mfp.familiar familiarp, mfp.dni dnip, mfp.telefono telefonop," +
                    " mfm.familiar familiarm, mfm.dni dnim, mfm.telefono telefonom," +
                    " g.departamento, g.provincia, g.id distrito, md.direccion, md.piso, md.referencia," +
                    " m.castrado, ms.visita, ms.alergia_medicamento, ms.vacunacion, ms.antirrabica, ms.alergia, ms.fecha_desparacitacion, ms.enfermedad, ms.enfermedad_descripcion," +
                    " /*ms.sextuple, ms.fecha_sextuple, ms.triplefel, ms.fecha_triplefel," +
                    " ms.leucemia, ms.fecha_leucemia, ms.fecha_antirrabica," +
                    " ms.limp_dental, ms.alergia_descripcion,*/" +
                    " (select max(mg.id) from mascota_galeria mg where m.id = mg.mascota_id and mg.estado = 1) galeria_id" +
                    " FROM mascota m" +
                    " inner join mascota_raza mr on m.mascota_raza_id = mr.id"+
                    " left join mascota_familia mfp on m.id = mfp.mascota_id and mfp.tipo = 'padre' and mfp.estado <> 0" +
                    " left join mascota_familia mfm on m.id = mfm.mascota_id and mfm.tipo = 'madre' and mfm.estado <> 0" +
                    " left join mascota_domicilio md on m.id = md.mascota_id and md.estado <> 0" +
                    " left join geografia g on md.geografia_id = g.id and g.estado <> 0" +
                    " left join mascota_salud ms on m.id = ms.mascota_id and ms.estado <> 0" +
                    " where m.id = @id" +
                    ") as T " +
                    "left join mascota_galeria mg on T.galeria_id = mg.id", cn);
                cmd.Parameters.AddWithValue("@id", objE.ID);
                cn.Open();
                MySqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        mItem = new EMascota();
                        mItem.ID = dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetInt32(dr.GetOrdinal("id"));
                        mItem.DNI = dr.IsDBNull(dr.GetOrdinal("dni")) ? string.Empty : dr.GetString(dr.GetOrdinal("dni"));
                        mItem.NOMBRE = dr.IsDBNull(dr.GetOrdinal("nombre")) ? string.Empty : dr.GetString(dr.GetOrdinal("nombre"));
                        mItem.APELLIDO = dr.IsDBNull(dr.GetOrdinal("apellido")) ? string.Empty : dr.GetString(dr.GetOrdinal("apellido"));
                        mItem.SEXO = dr.IsDBNull(dr.GetOrdinal("sexo")) ? string.Empty : dr.GetString(dr.GetOrdinal("sexo"));
                        mItem.TAMANO = dr.IsDBNull(dr.GetOrdinal("tamano")) ? string.Empty : dr.GetString(dr.GetOrdinal("tamano"));
                        mItem.MASCOTA_TIPO_ID = dr.IsDBNull(dr.GetOrdinal("mascota_tipo_id")) ? 0 : dr.GetInt32(dr.GetOrdinal("mascota_tipo_id"));
                        mItem.MASCOTA_RAZA_ID = dr.IsDBNull(dr.GetOrdinal("mascota_raza_id")) ? 0 : dr.GetInt32(dr.GetOrdinal("mascota_raza_id"));
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
                        mItem.DIRECCION = dr.IsDBNull(dr.GetOrdinal("direccion")) ? string.Empty : dr.GetString(dr.GetOrdinal("direccion"));
                        mItem.PISO = dr.IsDBNull(dr.GetOrdinal("piso")) ? string.Empty : dr.GetString(dr.GetOrdinal("piso"));
                        mItem.REFERENCIA = dr.IsDBNull(dr.GetOrdinal("referencia")) ? string.Empty : dr.GetString(dr.GetOrdinal("referencia"));
                        //Foto
                        mItem.GALERIA_ID = dr.IsDBNull(dr.GetOrdinal("galeria_id")) ? 0 : dr.GetInt32(dr.GetOrdinal("galeria_id"));
                        mItem.FOTO = dr.IsDBNull(dr.GetOrdinal("foto")) ? string.Empty : dr.GetString(dr.GetOrdinal("foto"));
                        //Salud
                        mItem.CASTRADO = dr.IsDBNull(dr.GetOrdinal("castrado")) ? 0 : dr.GetInt32(dr.GetOrdinal("castrado"));
                        mItem.VISITA = dr.IsDBNull(dr.GetOrdinal("visita")) ? 0 : dr.GetInt32(dr.GetOrdinal("visita"));
                        mItem.ALERGIA_MEDICAMENTO = dr.IsDBNull(dr.GetOrdinal("alergia_medicamento")) ? 0 : dr.GetInt32(dr.GetOrdinal("alergia_medicamento"));
                        mItem.VACUNACION = dr.IsDBNull(dr.GetOrdinal("vacunacion")) ? 0 : dr.GetInt32(dr.GetOrdinal("vacunacion"));
                        mItem.ANTIRRABICA = dr.IsDBNull(dr.GetOrdinal("antirrabica")) ? 0 : dr.GetInt32(dr.GetOrdinal("antirrabica"));
                        mItem.ALERGIA = dr.IsDBNull(dr.GetOrdinal("alergia")) ? 0 : dr.GetInt32(dr.GetOrdinal("alergia"));
                        mItem.ENFERMEDAD = dr.IsDBNull(dr.GetOrdinal("enfermedad")) ? 0 : dr.GetInt32(dr.GetOrdinal("enfermedad"));
                        mItem.FEC_DESPARACITACION = dr.IsDBNull(dr.GetOrdinal("fecha_desparacitacion")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("fecha_desparacitacion"));
                        mItem.ENFERMEDAD_DSC = dr.IsDBNull(dr.GetOrdinal("enfermedad_descripcion")) ? string.Empty : dr.GetString(dr.GetOrdinal("enfermedad_descripcion"));
                        //----------- Nuevo
                        /*mItem.SEXTUPLE = dr.IsDBNull(dr.GetOrdinal("sextuple")) ? 0 : dr.GetInt32(dr.GetOrdinal("sextuple"));
                        mItem.FEC_SEXTUPLE = dr.IsDBNull(dr.GetOrdinal("fecha_sextuple")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("fecha_sextuple"));
                        mItem.TRIPLEFEL = dr.IsDBNull(dr.GetOrdinal("triplefel")) ? 0 : dr.GetInt32(dr.GetOrdinal("triplefel"));
                        mItem.FEC_TRIPLEFEL = dr.IsDBNull(dr.GetOrdinal("fecha_triplefel")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("fecha_triplefel"));
                        mItem.LEUCEMIA = dr.IsDBNull(dr.GetOrdinal("leucemia")) ? 0 : dr.GetInt32(dr.GetOrdinal("leucemia"));
                        mItem.FEC_LEUCEMIA = dr.IsDBNull(dr.GetOrdinal("fecha_leucemia")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("fecha_leucemia"));
                        mItem.FEC_ANTIRRABICA = dr.IsDBNull(dr.GetOrdinal("fecha_antirrabica")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("fecha_antirrabica"));
                        mItem.LIMP_DENTAL = dr.IsDBNull(dr.GetOrdinal("limp_dental")) ? 0 : dr.GetInt32(dr.GetOrdinal("limp_dental"));
                        mItem.ALERGIA_DSC = dr.IsDBNull(dr.GetOrdinal("alergia_descripcion")) ? string.Empty : dr.GetString(dr.GetOrdinal("alergia_descripcion"));*/
                    }
                }
            }
            return mItem;

        }
        public static int AnularMascotaWM(EMascota objE)
        {
            using (MySqlConnection cn = new MySqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRump)))
            {

                MySqlCommand cmd = new MySqlCommand("update mascota set estado = 0 where id = @id", cn);
                cmd.Parameters.AddWithValue("@id", objE.ID);
                cn.Open();
                return cmd.ExecuteNonQuery();
            }
        }
        public static int ActualizarMascotaWM(EMascota objE)
        {
            using (MySqlConnection cn = new MySqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRump)))
            {
                MySqlCommand cmd = new MySqlCommand("update mascota set tamano = @tamano, mascota_raza_id = @mascota_raza_id, calificacion = @calificacion, color = @color, biografia = @biografia, castrado = @castrado where id = @id; " +
                                                    "update mascota_familia set familiar=@familiarp, dni=@dnip, telefono=@telefonop where mascota_id =@id and tipo = 'padre' and estado <> 0; " +
                                                    "update mascota_familia set familiar=@familiarm, dni=@dnim, telefono=@telefonom where mascota_id =@id and tipo = 'madre' and estado <> 0; " +
                                                    "update mascota_domicilio set geografia_id = @geografia_id, direccion=@direccion, piso = @piso, referencia = @referencia where mascota_id =@id and estado <> 0; " +
                                                    "update mascota_salud set visita=@visita, alergia_medicamento=@alergia_medicamento, vacunacion=@vacunacion, antirrabica=@antirrabica, alergia=@alergia, " +
                                                    "       fecha_desparacitacion=@fecha_desparacitacion, enfermedad=@enfermedad, enfermedad_descripcion=@enfermedad_descripcion " +
                                                    "/*,sextuple=@sextuple, fecha_sextuple=@fecha_sextuple, triplefel=@triplefel, fecha_triplefel=@fecha_triplefel, leucemia=@leucemia, fecha_leucemia=@fecha_leucemia, " +
                                                    " fecha_antirrabica=@fecha_antirrabica, limp_dental=@limp_dental, alergia_descripcion=@alergia_descripcion*/ where mascota_id=@id and estado <> 0; ", cn);
                cmd.Parameters.AddWithValue("@id", objE.ID);
                cmd.Parameters.AddWithValue("@tamano", objE.TAMANO);
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
                //cmd.Parameters.AddWithValue("@sextuple", objE.SEXTUPLE);
                //cmd.Parameters.AddWithValue("@fecha_sextuple", objE.FEC_SEXTUPLE);
                //cmd.Parameters.AddWithValue("@triplefel", objE.TRIPLEFEL);
                //cmd.Parameters.AddWithValue("@fecha_triplefel", objE.FEC_TRIPLEFEL);
                //cmd.Parameters.AddWithValue("@leucemia", objE.LEUCEMIA);
                //cmd.Parameters.AddWithValue("@fecha_leucemia", objE.FEC_LEUCEMIA);
                //cmd.Parameters.AddWithValue("@fecha_antirrabica", objE.ANTIRRABICA);
                //cmd.Parameters.AddWithValue("@limp_dental", objE.LIMP_DENTAL);
                //cmd.Parameters.AddWithValue("@alergia_descripcion", objE.ALERGIA_DSC);
                /////////
                cn.Open();
                return cmd.ExecuteNonQuery();
            }
        }
        public static int ActualizarFotoMascotaWM(EMascota objE)
        {
            using (MySqlConnection cn = new MySqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRump)))
            {
                MySqlCommand cmd = new MySqlCommand("update mascota_galeria set foto = @foto where id = @galeria_id", cn);
                cmd.Parameters.AddWithValue("@galeria_id", objE.GALERIA_ID);
                cmd.Parameters.AddWithValue("@foto", objE.FOTO);
                cn.Open();
                return cmd.ExecuteNonQuery();
            }
        }
        public static int RegistrarMascotaWM(EMascota objE)
        {
            int ID_MASCOTA = 0;

            using (MySqlConnection cn = new MySqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRump)))
            {
                
                MySqlTransaction transaccRegistro;
                cn.Open();
                transaccRegistro = cn.BeginTransaction();

                try
                {
                    using (MySqlCommand cmd = new MySqlCommand("INSERT INTO mascota (`dni`, `nombre`, `apellido`, `sexo`, `tamano`, `color`, `fecha_nacimiento`, `biografia`, `calificacion`, `castrado`, `fallecido`, `estado`, `mascota_raza_id`, `usuario_id`, `created_at`) " +
                                                    "VALUES (generarDNI(), @nombre, @apellido, @sexo, @tamano, @color, @fecha_nac, @biografia, @calificacion, @castrado, 0, 1, @mascota_raza_id, @usuario_id, NOW()); " +
                                                    "SELECT MAX(ID) AS ID_MASCOTA FROM mascota;", cn, transaccRegistro))
                    {
                        cmd.Parameters.AddWithValue("@nombre", objE.NOMBRE);
                        cmd.Parameters.AddWithValue("@apellido", objE.APELLIDO);
                        cmd.Parameters.AddWithValue("@sexo", objE.SEXO);
                        cmd.Parameters.AddWithValue("@tamano", objE.TAMANO);
                        cmd.Parameters.AddWithValue("@color", objE.COLOR);
                        cmd.Parameters.AddWithValue("@fecha_nac", objE.FEC_NAC);
                        cmd.Parameters.AddWithValue("@biografia", objE.BIOGRAFIA);
                        cmd.Parameters.AddWithValue("@calificacion", objE.CALIFICACION);
                        cmd.Parameters.AddWithValue("@castrado", objE.CASTRADO);
                        cmd.Parameters.AddWithValue("@mascota_raza_id", objE.MASCOTA_RAZA_ID);
                        cmd.Parameters.AddWithValue("@usuario_id", objE.USUARIO_ID);


                        using (MySqlDataReader dr = cmd.ExecuteReader())
                        {
                            if (dr.HasRows)
                            {
                                while (dr.Read())
                                {
                                    ID_MASCOTA = dr.IsDBNull(dr.GetOrdinal("ID_MASCOTA")) ? 0 : dr.GetInt32(dr.GetOrdinal("ID_MASCOTA"));
                                }
                            }
                        }
                    }
                    //*********************** DATOS MASCOTA
                    using (MySqlCommand cmd = new MySqlCommand("INSERT INTO `mascota_familia`(`familiar`, `dni`, `telefono`, `tipo`, `estado`, `mascota_id`, `created_at`) VALUES " +
                                                    "(@familiarp, @dnip, @telefonop, 'padre', 1, @id, NOW()); " +
                                                    "INSERT INTO `mascota_familia`(`familiar`, `dni`, `telefono`, `tipo`, `estado`, `mascota_id`, `created_at`) VALUES " +
                                                    "(@familiarm, @dnim, @telefonom, 'madre', 1, @id, NOW()); " +
                                                    "INSERT INTO `mascota_domicilio`(`direccion`, `piso`, `referencia`, `estado`, `mascota_id`, `geografia_id`, `created_at`) VALUES " +
                                                    "(@direccion, @piso, @referencia, 1, @id, @geografia_id, NOW()); " +
                                                    "INSERT INTO `mascota_salud`(`visita`, `alergia_medicamento`, `vacunacion`, `antirrabica`, `alergia`, `enfermedad`, `fecha_desparacitacion`, `enfermedad_descripcion`, `estado`, `mascota_id`, `created_at` " +
                                                    "/*, `sextuple`,`fecha_sextuple`,`triplefel`,`fecha_triplefel`,`leucemia`,`fecha_leucemia`,`fecha_antirrabica`,`limp_dental`,`alergia_descripcion`*/) VALUES " +
                                                    "(@visita, @alergia_medicamento, @vacunacion, @antirrabica, @alergia, @enfermedad, @fecha_desparacitacion, @enfermedad_descripcion, 1, @id, NOW()/*, " +
                                                    "@sextuple, @fecha_sextuple, @triplefel, @fecha_triplefel, @leucemia, @fecha_leucemia, @fecha_antirrabica, @limp_dental, @alergia_descripcion*/); " +
                                                    "INSERT INTO `mascota_galeria`(`foto`, `estado`, `mascota_id`, `created_at`) VALUES " +
                                                    "(@foto, 1, @id, NOW());", cn, transaccRegistro))
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
                        //cmd.Parameters.AddWithValue("@sextuple", objE.SEXTUPLE);
                        //cmd.Parameters.AddWithValue("@fecha_sextuple", objE.FEC_SEXTUPLE);
                        //cmd.Parameters.AddWithValue("@triplefel", objE.TRIPLEFEL);
                        //cmd.Parameters.AddWithValue("@fecha_triplefel", objE.FEC_TRIPLEFEL);
                        //cmd.Parameters.AddWithValue("@leucemia", objE.LEUCEMIA);
                        //cmd.Parameters.AddWithValue("@fecha_leucemia", objE.FEC_LEUCEMIA);
                        //cmd.Parameters.AddWithValue("@fecha_antirrabica", objE.ANTIRRABICA);
                        //cmd.Parameters.AddWithValue("@limp_dental", objE.LIMP_DENTAL);
                        //cmd.Parameters.AddWithValue("@alergia_descripcion", objE.ALERGIA_DSC);
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

            return ID_MASCOTA;
        }
    }
}
