using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDAD;
using DATOS;

namespace NEGOCIOS
{
    public class NCita
    {
        public static int ActualizarCitaWM(ECita ent)
        {
            return DCita.ActualizarCitaWM(ent);
        }

        public static List<ECita> listarCita(ECita ent)
        {
            return DCita.listarCita(ent);
        }

        public static ECita obtenerCita(ECita ent)
        {
            return DCita.obtenerCita(ent);
        }
        
    }
}
