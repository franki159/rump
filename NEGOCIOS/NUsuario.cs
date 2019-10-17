using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDAD;
using DATOS;

namespace NEGOCIOS
{
    public static class NUsuario
    {
        public static EUsuario ListarUsuarios(EUsuario objE)
        {
            return DUsuario.ListarUsuarios(objE);
        }
        public static EUsuario ObtenerPropietarioMascota(EUsuario ent)
        {
            return DUsuario.ObtenerPropietarioMascota(ent);
        }
        public static EUsuario Login(EUsuario ent)
        {
            return DUsuario.Login(ent);
        }
    }
}
