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
    }
}
