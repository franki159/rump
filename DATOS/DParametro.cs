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
    public class DParametro
    {
        public static List<EGeneral> listarParametro(EGeneral objE)
        {
            List<EGeneral> lista = new List<EGeneral>();

            using (MySqlConnection cn = new MySqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRump)))
            {
                string cad_sql = "";
                switch (objE.CODIGO)
                {
                    case "TIPO": cad_sql = "SELECT id CODIGO, tipo DESCRIPCION FROM mascota_tipo where estado = 1 order by 2"; break;
                    case "RAZA": cad_sql = "SELECT id CODIGO, tipo DESCRIPCION FROM mascota_raza where mascota_tipo_id = @parametro1 and estado = 1 order by 2"; break;
                    case "DEPARTAMENTO": cad_sql = "SELECT DISTINCT departamento CODIGO, departamento DESCRIPCION FROM geografia where estado = 1 order by 2"; break;
                    case "PROVINCIA": cad_sql = "SELECT DISTINCT provincia CODIGO, provincia DESCRIPCION FROM geografia where departamento = @parametro1 and estado = 1 order by 2"; break;
                    case "DISTRITO": cad_sql = "SELECT DISTINCT id CODIGO, distrito DESCRIPCION FROM geografia where departamento = @parametro1 and provincia = @parametro2 and distrito <> '' and estado = 1 order by 2"; break;

                    default:
                        break;
                }
                MySqlCommand cmd = new MySqlCommand(cad_sql, cn);
                cmd.Parameters.AddWithValue("@parametro1", objE.vPARAM1);
                cmd.Parameters.AddWithValue("@parametro2", objE.vPARAM2);
                cn.Open();
                MySqlDataReader dr = cmd.ExecuteReader();
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
