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
    public class DMedico
    {
        public static int ActualizarMedicoCitaWM(EMedico objE) {
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_Medico", cn);
                cmd.Parameters.AddWithValue("@nombre", objE.NOMBRE);
                cmd.Parameters.AddWithValue("@apellido", objE.APELLIDO);
                cmd.Parameters.AddWithValue("@telefono", objE.TELEFONO);
                cmd.Parameters.AddWithValue("@cod_medico", objE.COD_MEDICO);
                cmd.Parameters.AddWithValue("@usuario_id", objE.USUARIO_ID);
                cmd.Parameters.AddWithValue("@opcion", 1);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                return cmd.ExecuteNonQuery();
            }
        }
    }
}
