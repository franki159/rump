using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using ENTIDAD;
using System.Data;
using MySql.Data.MySqlClient;
using MySql.Data;

namespace DATOS
{
    public static class DUsuario
    {
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
