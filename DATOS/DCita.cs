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
    public class DCita
    {
        public static int ActualizarCitaWM(ECita objE) {
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_cita_medica", cn);
                cmd.Parameters.AddWithValue("@fecha_atencion_medica", objE.FECHA_ATENCION_MEDICA);
                cmd.Parameters.AddWithValue("@mascota_id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                cmd.Parameters.AddWithValue("@clinica_id", objE.CLINICA_ID);
                cmd.Parameters.AddWithValue("@medico_id", objE.MEDICO_ID);
                cmd.Parameters.AddWithValue("@tipo", objE.TIPO);
                cmd.Parameters.AddWithValue("@motivo", objE.MOTIVO);
                cmd.Parameters.AddWithValue("@peso", objE.PESO);
                cmd.Parameters.AddWithValue("@temperatura", objE.TEMPERATURA);
                cmd.Parameters.AddWithValue("@sintomas", objE.SINTOMAS);
                cmd.Parameters.AddWithValue("@diagnostico", objE.DIAGNOSTICO);
                cmd.Parameters.AddWithValue("@tratamiento", objE.TRATAMIENTO);
                cmd.Parameters.AddWithValue("@observaciones", objE.OBSERVACIONES);
                cmd.Parameters.AddWithValue("@antecedentes", objE.ANTECEDENTES);
                cmd.Parameters.AddWithValue("@formula", objE.FORMULA);
                cmd.Parameters.AddWithValue("@usuario", objE.USUARIO);
                cmd.Parameters.AddWithValue("@opcion", 1);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                return cmd.ExecuteNonQuery();
            }
        }
        public static List<ECita> listarCita(ECita objE)
        {
            List<ECita> lista = new List<ECita>();
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_cita_medica", cn);
                cmd.Parameters.AddWithValue("@mascota_id", EUtil.getDesencriptar(objE.ID_ENCRIP));
                cmd.Parameters.AddWithValue("@opcion", 2);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        ECita mItem = new ECita();
                        mItem.ID_ENCRIP = EUtil.getEncriptar((dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"))).ToString());
                        mItem.TIPO = dr.IsDBNull(dr.GetOrdinal("tipo")) ? string.Empty : dr.GetString(dr.GetOrdinal("tipo"));
                        mItem.FECHA_ATENCION_MEDICA = dr.IsDBNull(dr.GetOrdinal("fecha_atencion_medica")) ? DateTime.MinValue : dr.GetDateTime(dr.GetOrdinal("fecha_atencion_medica"));
                        mItem.MOTIVO = dr.IsDBNull(dr.GetOrdinal("motivo")) ? string.Empty : dr.GetString(dr.GetOrdinal("motivo"));
                        mItem.PESO = dr.IsDBNull(dr.GetOrdinal("peso")) ? string.Empty : dr.GetString(dr.GetOrdinal("peso"));
                        mItem.TEMPERATURA = dr.IsDBNull(dr.GetOrdinal("temperatura")) ? string.Empty : dr.GetString(dr.GetOrdinal("temperatura"));
                        mItem.SINTOMAS = dr.IsDBNull(dr.GetOrdinal("sintomas")) ? string.Empty : dr.GetString(dr.GetOrdinal("sintomas"));
                        mItem.DIAGNOSTICO = dr.IsDBNull(dr.GetOrdinal("diagnostico")) ? string.Empty : dr.GetString(dr.GetOrdinal("diagnostico"));
                        mItem.TRATAMIENTO = dr.IsDBNull(dr.GetOrdinal("tratamiento")) ? string.Empty : dr.GetString(dr.GetOrdinal("tratamiento"));
                        mItem.ANTECEDENTES = dr.IsDBNull(dr.GetOrdinal("antecedentes")) ? string.Empty : dr.GetString(dr.GetOrdinal("antecedentes"));
                        mItem.FORMULA = dr.IsDBNull(dr.GetOrdinal("formula")) ? string.Empty : dr.GetString(dr.GetOrdinal("formula"));
                        mItem.OBSERVACIONES = dr.IsDBNull(dr.GetOrdinal("observaciones")) ? string.Empty : dr.GetString(dr.GetOrdinal("observaciones"));
                        lista.Add(mItem);
                    }
                }
            }
            return lista;
        }
    }
}
