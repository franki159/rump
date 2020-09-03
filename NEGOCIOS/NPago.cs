using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDAD;
using DATOS;

namespace NEGOCIOS
{
    public static class NPago
    {
        public static int ActualizarPago(EPago ent)
        {
            return DPago.ActualizarPago(ent);
        }
    }
}
