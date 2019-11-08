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
    public class DClinica
    {
        public static int ActualizarClinicaCitaWM(EClinica objE) {
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_clinica", cn);
                cmd.Parameters.AddWithValue("@nombre", objE.NOMBRE);
                cmd.Parameters.AddWithValue("@telefono", objE.TELEFONO);
                cmd.Parameters.AddWithValue("@direccion", objE.DIRECCION);
                cmd.Parameters.AddWithValue("@geografia_id", objE.GEOGRAFIA_ID);
                cmd.Parameters.AddWithValue("@usuario_id", objE.USUARIO_ID);
                cmd.Parameters.AddWithValue("@opcion", 1);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                return cmd.ExecuteNonQuery();
            }
        }
    }
}
