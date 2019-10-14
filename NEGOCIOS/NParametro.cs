using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDAD;
using DATOS;

namespace NEGOCIOS
{
    public class NParametro
    {
        public static List<EGeneral> listarParametro(EGeneral objE)
        {
            return DParametro.listarParametro(objE);
        }
    }
}
