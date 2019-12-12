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
        public static decimal ActualizarClinicaCitaWM(EClinica ent)
        {
            return DClinica.ActualizarClinicaCitaWM(ent);
        }

        public static int actualizarConvenio(EClinica ent)
        {
            return DClinica.actualizarConvenio(ent);
        }

        public static List<EClinica> listarClinica(EClinica ent)
        {
            return DClinica.listarClinica(ent);
        }

        public static EClinica ObtenerClinica(EClinica ent)
        {
            return DClinica.ObtenerClinica(ent);
        }
    }
}
