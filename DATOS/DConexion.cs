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
            CnLasVegas = 1,
            CnRump = 2
        }

        public static string Get_Connection(DataBase tipo)
        {
            switch (tipo)
            {
                case DataBase.CnLasVegas:
                    return ConfigurationManager.ConnectionStrings["CnnLasVegas"].ConnectionString;
                case DataBase.CnRump:
                    return ConfigurationManager.ConnectionStrings["CnnRump"].ConnectionString;
                default:
                    return String.Empty;
            }
        }
    }
}
