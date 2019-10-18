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
    public static class DUsuario
    {
        public static EUsuario Login(EUsuario ent)
        {
            EUsuario eUsuario = null;

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                using (SqlCommand cmd = new SqlCommand("usp_login", cn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@email", SqlDbType.VarChar).Value = ent.EMAIL;
                    cmd.Parameters.Add("@password", SqlDbType.VarChar).Value = ent.PASSWORD;

                    cn.Open();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        if (dr.HasRows)
                        {
                            while (dr.Read())
                            {
                                eUsuario = new EUsuario();
                                eUsuario.ID = dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"));
                                eUsuario.NOMBRE = dr.IsDBNull(dr.GetOrdinal("nombre")) ? string.Empty : dr.GetString(dr.GetOrdinal("nombre"));
                                eUsuario.APELLIDO = dr.IsDBNull(dr.GetOrdinal("apellido")) ? string.Empty : dr.GetString(dr.GetOrdinal("apellido"));
                                eUsuario.SEXO = dr.IsDBNull(dr.GetOrdinal("sexo")) ? string.Empty : dr.GetString(dr.GetOrdinal("sexo"));
                                eUsuario.FOTO = dr.IsDBNull(dr.GetOrdinal("foto")) ? string.Empty : dr.GetString(dr.GetOrdinal("foto"));
                                eUsuario.USUARIO_PERFIL = new EUsuarioPerfil();
                                eUsuario.USUARIO_PERFIL.ID = dr.IsDBNull(dr.GetOrdinal("usuario_perfil_id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("usuario_perfil_id"));
                                eUsuario.USUARIO_PERFIL.PERFIL = dr.IsDBNull(dr.GetOrdinal("perfil")) ? string.Empty : dr.GetString(dr.GetOrdinal("perfil"));
                            }
                        }
                    }
                }
            }

            return eUsuario;
        }
        public static EUsuario ListarUsuarios(EUsuario objE)
        {
            EUsuario lista = new EUsuario();

            using (MySqlConnection cn = new MySqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRump)))
            {

                MySqlCommand cmd = new MySqlCommand("SELECT email, nombre, apellido, sexo, usuario_perfil_id FROM usuario WHERE id = @id", cn);
                cmd.Parameters.AddWithValue("@id", objE.ID);
                cn.Open();
                MySqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        lista.EMAIL = dr.IsDBNull(dr.GetOrdinal("email")) ? string.Empty : dr.GetString(dr.GetOrdinal("email"));
                        lista.NOMBRE = dr.IsDBNull(dr.GetOrdinal("nombre")) ? string.Empty : dr.GetString(dr.GetOrdinal("nombre"));
                        lista.APELLIDO = dr.IsDBNull(dr.GetOrdinal("apellido")) ? string.Empty : dr.GetString(dr.GetOrdinal("apellido"));
                        lista.SEXO = dr.IsDBNull(dr.GetOrdinal("sexo")) ? string.Empty : dr.GetString(dr.GetOrdinal("sexo"));
                        lista.PERFIL_ID = dr.IsDBNull(dr.GetOrdinal("usuario_perfil_id")) ? 0 : dr.GetInt32(dr.GetOrdinal("usuario_perfil_id"));
                    }
                }
            }
            return lista;
        }

        public static EUsuario ObtenerPropietarioMascota(EUsuario objE)
        {
            EUsuario lista = new EUsuario();

            using (MySqlConnection cn = new MySqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRump)))
            {

                MySqlCommand cmd = new MySqlCommand("SELECT id, email, nombre, apellido, sexo, usuario_perfil_id FROM usuario WHERE email = @email", cn);
                cmd.Parameters.AddWithValue("@email", objE.EMAIL);
                cn.Open();
                MySqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        lista.ID = dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetInt32(dr.GetOrdinal("id"));
                        lista.EMAIL = dr.IsDBNull(dr.GetOrdinal("email")) ? string.Empty : dr.GetString(dr.GetOrdinal("email"));
                        lista.NOMBRE = dr.IsDBNull(dr.GetOrdinal("nombre")) ? string.Empty : dr.GetString(dr.GetOrdinal("nombre"));
                        lista.APELLIDO = dr.IsDBNull(dr.GetOrdinal("apellido")) ? string.Empty : dr.GetString(dr.GetOrdinal("apellido"));
                        lista.SEXO = dr.IsDBNull(dr.GetOrdinal("sexo")) ? string.Empty : dr.GetString(dr.GetOrdinal("sexo"));
                        lista.PERFIL_ID = dr.IsDBNull(dr.GetOrdinal("usuario_perfil_id")) ? 0 : dr.GetInt32(dr.GetOrdinal("usuario_perfil_id"));
                    }
                }
            }
            return lista;
        }
    }
}
