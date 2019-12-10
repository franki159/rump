using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDAD;
using DATOS;

namespace NEGOCIOS
{
    public class NRaza
    {
        public static int actualizarRaza(ERaza ent)
        {
            return DRaza.actualizarRaza(ent);
        }

        public static List<ERaza> listarRaza(ERaza ent)
        {
            return DRaza.listarRaza(ent);
        }

        public static List<ERaza> obtenerRaza(ERaza ent)
        {
            return DRaza.obtenerRaza(ent);
        }
    }
}
