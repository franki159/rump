using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;

namespace DATOS
{
    public static class DConexion
    {
        public enum DataBase
        {
            CnRumpSql = 1,
            CnRump = 2
        }

        public static string Get_Connection(DataBase tipo)
        {
            switch (tipo)
            {
                case DataBase.CnRumpSql:
                    return ConfigurationManager.ConnectionStrings["CnnRumpSql"].ConnectionString;
                case DataBase.CnRump:
                    return ConfigurationManager.ConnectionStrings["CnnRump"].ConnectionString;
                default:
                    return String.Empty;
            }
        }
    }
}
