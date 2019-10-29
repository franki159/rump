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

        public static List<EUsuario> listarUsuario(EUsuario objE)
        {
            List<EUsuario> lista = new List<EUsuario>();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {

                SqlCommand cmd = new SqlCommand("usp_mnt_usuario", cn);
                cmd.Parameters.AddWithValue("@email", objE.EMAIL);
                cmd.Parameters.AddWithValue("@opcion", 1);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        EUsuario mItem = new EUsuario();
                        //mItem.ID = dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"));
                        mItem.ID_ENCRIP = EUtil.getEncriptar((dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"))).ToString());
                        mItem.ACTIVO = dr.IsDBNull(dr.GetOrdinal("activo")) ? 0 : dr.GetInt16(dr.GetOrdinal("activo"));
                        mItem.EMAIL = dr.IsDBNull(dr.GetOrdinal("email")) ? string.Empty : dr.GetString(dr.GetOrdinal("email"));
                        mItem.PASSWORD = dr.IsDBNull(dr.GetOrdinal("password")) ? string.Empty : dr.GetString(dr.GetOrdinal("password"));
                        mItem.PERFIL_ID = dr.IsDBNull(dr.GetOrdinal("usuario_perfil_id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("usuario_perfil_id"));
                        mItem.NOMBRE = dr.IsDBNull(dr.GetOrdinal("nombre")) ? string.Empty : dr.GetString(dr.GetOrdinal("nombre"));
                        mItem.APELLIDO = dr.IsDBNull(dr.GetOrdinal("apellido")) ? string.Empty : dr.GetString(dr.GetOrdinal("apellido"));
                        mItem.SEXO = dr.IsDBNull(dr.GetOrdinal("sexo")) ? string.Empty : dr.GetString(dr.GetOrdinal("sexo"));
                        mItem.FOTO = dr.IsDBNull(dr.GetOrdinal("foto")) ? string.Empty : dr.GetString(dr.GetOrdinal("foto"));

                        mItem.USUARIO_PERFIL = new EUsuarioPerfil()
                        {
                            ID = dr.IsDBNull(dr.GetOrdinal("usuario_perfil_id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("usuario_perfil_id")),
                            PERFIL = dr.IsDBNull(dr.GetOrdinal("perfil")) ? string.Empty : dr.GetString(dr.GetOrdinal("perfil"))
                        };

                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }
        public static EUsuario ObtenerUsuario(EUsuario objE)
        {
            EUsuario mItem = new EUsuario();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {

                SqlCommand cmd = new SqlCommand("usp_mnt_usuario", cn);
                cmd.Parameters.AddWithValue("@id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                cmd.Parameters.AddWithValue("@opcion", 2);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        mItem = new EUsuario();
                        mItem.ID = dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"));
                        mItem.ACTIVO = dr.IsDBNull(dr.GetOrdinal("activo")) ? 0 : dr.GetInt16(dr.GetOrdinal("activo"));
                        mItem.EMAIL = dr.IsDBNull(dr.GetOrdinal("email")) ? string.Empty : dr.GetString(dr.GetOrdinal("email"));
                        mItem.PASSWORD = dr.IsDBNull(dr.GetOrdinal("password")) ? string.Empty : dr.GetString(dr.GetOrdinal("password"));
                        mItem.PERFIL_ID = dr.IsDBNull(dr.GetOrdinal("usuario_perfil_id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("usuario_perfil_id"));
                        mItem.NOMBRE = dr.IsDBNull(dr.GetOrdinal("nombre")) ? string.Empty : dr.GetString(dr.GetOrdinal("nombre"));
                        mItem.APELLIDO = dr.IsDBNull(dr.GetOrdinal("apellido")) ? string.Empty : dr.GetString(dr.GetOrdinal("apellido"));
                        mItem.FECHA_NAC = dr.IsDBNull(dr.GetOrdinal("fecha_nacimiento")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("fecha_nacimiento"));
                        mItem.TELEFONO = dr.IsDBNull(dr.GetOrdinal("telefono")) ? string.Empty : dr.GetString(dr.GetOrdinal("telefono"));
                        mItem.CELULAR = dr.IsDBNull(dr.GetOrdinal("celular")) ? string.Empty : dr.GetString(dr.GetOrdinal("celular"));
                        mItem.SEXO = dr.IsDBNull(dr.GetOrdinal("sexo")) ? string.Empty : dr.GetString(dr.GetOrdinal("sexo"));
                        mItem.FOTO = dr.IsDBNull(dr.GetOrdinal("foto")) ? string.Empty : dr.GetString(dr.GetOrdinal("foto"));

                        mItem.USUARIO_PERFIL = new EUsuarioPerfil()
                        {
                            ID = dr.IsDBNull(dr.GetOrdinal("usuario_perfil_id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("usuario_perfil_id")),
                            PERFIL = dr.IsDBNull(dr.GetOrdinal("perfil")) ? string.Empty : dr.GetString(dr.GetOrdinal("perfil"))
                        };
                    }
                }
            }
            return mItem;

        }
        public static int AnularUsuario(EUsuario objE)
        {
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_usuario", cn);
                cmd.Parameters.AddWithValue("@id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                cmd.Parameters.AddWithValue("@opcion", 3);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                return cmd.ExecuteNonQuery();
            }
        }
        public static int ActualizarUsuario(EUsuario objE)
        {
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_usuario", cn);

                cmd.Parameters.AddWithValue("@id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                cmd.Parameters.AddWithValue("@email", objE.EMAIL);
                cmd.Parameters.AddWithValue("@password", objE.PASSWORD);
                cmd.Parameters.AddWithValue("@nombre", objE.NOMBRE);
                cmd.Parameters.AddWithValue("@apellido", objE.APELLIDO);
                cmd.Parameters.AddWithValue("@fecha_nac", objE.FECHA_NAC);
                cmd.Parameters.AddWithValue("@telefono", objE.TELEFONO);
                cmd.Parameters.AddWithValue("@celular", objE.CELULAR);
                cmd.Parameters.AddWithValue("@sexo", objE.SEXO);
                cmd.Parameters.AddWithValue("@activo", objE.ACTIVO);
                cmd.Parameters.AddWithValue("@estado", objE.ESTADO);
                cmd.Parameters.AddWithValue("@perfil_id", objE.PERFIL_ID);
                cmd.Parameters.AddWithValue("@opcion", 4);
                cmd.CommandType = CommandType.StoredProcedure;
                /////////
                cn.Open();
                return cmd.ExecuteNonQuery();
            }
        }
        public static string ActualizarFotoUsuario(EUsuario objE)
        {
            string foto = "";
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_usuario", cn);
                cmd.Parameters.AddWithValue("@id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                cmd.Parameters.AddWithValue("@foto", objE.FOTO);
                cmd.Parameters.AddWithValue("@opcion", 5);
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
        public static string RegistrarUsuario(EUsuario objE)
        {
            decimal ID_USUARIO = 0;

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {

                SqlTransaction transaccRegistro;
                cn.Open();
                transaccRegistro = cn.BeginTransaction();

                try
                {
                    using (SqlCommand cmd = new SqlCommand("usp_mnt_usuario", cn, transaccRegistro))
                    {
                        cmd.Parameters.AddWithValue("@email", objE.EMAIL);
                        cmd.Parameters.AddWithValue("@password", objE.PASSWORD);
                        cmd.Parameters.AddWithValue("@nombre", objE.NOMBRE);
                        cmd.Parameters.AddWithValue("@apellido", objE.APELLIDO);
                        cmd.Parameters.AddWithValue("@fecha_nac", objE.FECHA_NAC);
                        cmd.Parameters.AddWithValue("@telefono", objE.TELEFONO);
                        cmd.Parameters.AddWithValue("@celular", objE.CELULAR);
                        cmd.Parameters.AddWithValue("@sexo", objE.SEXO);
                        cmd.Parameters.AddWithValue("@activo", objE.ACTIVO);
                        cmd.Parameters.AddWithValue("@estado", objE.ESTADO);
                        cmd.Parameters.AddWithValue("@perfil_id", objE.PERFIL_ID);
                        cmd.Parameters.AddWithValue("@opcion", 6);
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            if (dr.HasRows)
                            {
                                while (dr.Read())
                                {
                                    ID_USUARIO = dr.IsDBNull(dr.GetOrdinal("ID_usuario")) ? 0 : dr.GetDecimal(dr.GetOrdinal("ID_usuario"));
                                }
                            }
                        }
                    }

                    transaccRegistro.Commit();
                }
                catch (Exception ex)
                {
                    transaccRegistro.Rollback();
                    ID_USUARIO = 0;
                    throw (ex);
                }
                cn.Close();
            }

            return EUtil.getEncriptar(ID_USUARIO.ToString());
        }

        /*
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
        */
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
