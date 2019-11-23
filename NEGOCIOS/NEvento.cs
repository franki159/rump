using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDAD;
using DATOS;

namespace NEGOCIOS
{
    public static class NEvento
    {
        public static List<EEvento> listarEvento(EEvento ent)
        {
            return DEvento.listarEvento(ent);
        }
        public static EEvento ObtenerEvento(EEvento ent)
        {
            return DEvento.ObtenerEvento(ent);
        }
        public static int AnularEvento(EEvento ent)
        {
            return DEvento.AnularEvento(ent);
        }
        public static int ActualizarEvento(EEvento ent)
        {
            return DEvento.ActualizarEvento(ent);
        }
        public static string RegistrarEvento(EEvento ent)
        {
            return DEvento.RegistrarEvento(ent);
        }
    }
}
