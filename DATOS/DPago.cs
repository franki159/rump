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
    public class DPago
    {
        public static int ActualizarPago(EPago objE)
        {
            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_mnt_pago", cn);
                cmd.Parameters.AddWithValue("@id", objE.ID);
                cmd.Parameters.AddWithValue("@num_card", objE.NUM_TARJETA);
                cmd.Parameters.AddWithValue("@total", objE.TOTAL);
                cmd.Parameters.AddWithValue("@estado", objE.ESTADO);
                cmd.Parameters.AddWithValue("@solicitud_id", objE.SOLICITUD_ID);
                cmd.Parameters.AddWithValue("@observacion", objE.OBSERVACION);
                cmd.Parameters.AddWithValue("@usuario", objE.USUARIO);
                cmd.Parameters.AddWithValue("@opcion", objE.OPCION);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                return cmd.ExecuteNonQuery();
            }
        }
    }
}
