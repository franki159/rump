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
        /*
        public static EUsuario ListarUsuarios(EUsuario objE)
        {
            return DUsuario.ListarUsuarios(objE);
        }
        */
        public static EUsuario ObtenerPropietarioMascota(EUsuario ent)
        {
            return DUsuario.ObtenerPropietarioMascota(ent);
        }


        public static EUsuario Login(EUsuario ent)
        {
            return DUsuario.Login(ent);
        }

        public static List<EUsuario> listarUsuario(EUsuario ent)
        {
            return DUsuario.listarUsuario(ent);
        }
        public static EUsuario ObtenerUsuario(EUsuario ent)
        {
            return DUsuario.ObtenerUsuario(ent);
        }
        public static int AnularUsuario(EUsuario ent)
        {
            return DUsuario.AnularUsuario(ent);
        }
        public static int ActualizarUsuario(EUsuario ent)
        {
            return DUsuario.ActualizarUsuario(ent);
        }
        public static string ActualizarFotoUsuario(EUsuario ent)
        {
            return DUsuario.ActualizarFotoUsuario(ent);
        }
        public static string RegistrarUsuario(EUsuario ent)
        {
            return DUsuario.RegistrarUsuario(ent);
        }
        public static int TokenActivoUsuario(EUsuario ent)
        {
            return DUsuario.TokenActivoUsuario(ent);
        }
        public static string ActivarUsuario(EUsuario ent)
        {
            return DUsuario.ActivarUsuario(ent);
        }
        public static int TokenClaveUsuario(EUsuario ent)
        {
            return DUsuario.TokenClaveUsuario(ent);
        }
        public static int CambiarClaveUsuario(EUsuario ent)
        {
            return DUsuario.CambiarClaveUsuario(ent);
        }
    }
}
