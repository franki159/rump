using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDAD;
using DATOS;

namespace NEGOCIOS
{
    public class NClinica
    {
        public static int ActualizarClinicaCitaWM(EClinica ent)
        {
            return DClinica.ActualizarClinicaCitaWM(ent);
        }
    }
}
