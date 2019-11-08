using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDAD;
using DATOS;

namespace NEGOCIOS
{
    public class NMedico
    {
        public static int ActualizarMedicoCitaWM(EMedico ent)
        {
            return DMedico.ActualizarMedicoCitaWM(ent);
        }
    }
}
