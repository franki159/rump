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
    public class DConvenio
    {
        public static EMapa listarMapa()
        {
            EMapa mItem = new EMapa();
            mItem.TIPOS = new List<EMapa.ETipoConvenio>();
            mItem.CONVENIOS = new List<EMapa.EConvenio>();

            using (SqlConnection cn = new SqlConnection(DConexion.Get_Connection(DConexion.DataBase.CnRumpSql)))
            {

                SqlCommand cmd = new SqlCommand("usp_lst_mapa", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        EMapa.ETipoConvenio mTipo = new EMapa.ETipoConvenio();
                        mTipo.ID = dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"));
                        mTipo.TIPO = dr.IsDBNull(dr.GetOrdinal("tipo")) ? string.Empty : dr.GetString(dr.GetOrdinal("tipo"));
                        mItem.TIPOS.Add(mTipo);
                    }

                    if (dr.NextResult())
                    {
                        while (dr.Read())
                        {
                            EMapa.EConvenio mConvenio = new EMapa.EConvenio();
                            mConvenio.ID = dr.IsDBNull(dr.GetOrdinal("id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("id"));
                            mConvenio.TIPO_ID = dr.IsDBNull(dr.GetOrdinal("convenio_tipo_id")) ? 0 : dr.GetDecimal(dr.GetOrdinal("convenio_tipo_id"));
                            mConvenio.NOMBRE = dr.IsDBNull(dr.GetOrdinal("nombre")) ? string.Empty : dr.GetString(dr.GetOrdinal("nombre"));
                            mConvenio.DIRECCION = dr.IsDBNull(dr.GetOrdinal("direccion")) ? string.Empty : dr.GetString(dr.GetOrdinal("direccion"));
                            mConvenio.TELEFONO = dr.IsDBNull(dr.GetOrdinal("telefono")) ? string.Empty : dr.GetString(dr.GetOrdinal("telefono"));
                            mConvenio.LATITUD = dr.IsDBNull(dr.GetOrdinal("latitud")) ? string.Empty : dr.GetString(dr.GetOrdinal("latitud"));
                            mConvenio.LONGITUD = dr.IsDBNull(dr.GetOrdinal("longitud")) ? string.Empty : dr.GetString(dr.GetOrdinal("longitud"));
                            mItem.CONVENIOS.Add(mConvenio);
                        }
                    }
                }
            }
            return mItem;
        }
    }
}
