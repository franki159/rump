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
    }
}
