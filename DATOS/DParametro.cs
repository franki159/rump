using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using ENTIDAD;


namespace DATOS
{
    public class DParametro
    {
        public static List<EGeneral> listarParametro(EGeneral objE)
        {
            List<EGeneral> lista = new List<EGeneral>();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {
                SqlCommand cmd = new SqlCommand("usp_getParametros", cn);
                cmd.Parameters.AddWithValue("@parametro1", objE.vPARAM1);
                cmd.Parameters.AddWithValue("@parametro2", objE.vPARAM2);
                cmd.Parameters.AddWithValue("@tipo", objE.CODIGO);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        EGeneral mItem = new EGeneral();
                        mItem.CODIGO = dr.IsDBNull(dr.GetOrdinal("CODIGO")) ? string.Empty : dr.GetString(dr.GetOrdinal("CODIGO"));
                        mItem.DESCRIPCION = dr.IsDBNull(dr.GetOrdinal("DESCRIPCION")) ? string.Empty : dr.GetString(dr.GetOrdinal("DESCRIPCION"));
                        lista.Add(mItem);
                    }
                }
            }
            return lista;

        }
    }
}
