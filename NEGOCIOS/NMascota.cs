using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDAD;
using DATOS;

namespace NEGOCIOS
{
    public class NMascota
    {
        //public static int ActualizarProductos(EProducto ent)
        //{
        //    return DProducto.ActualizarProductos(ent);
        //}

        public static List<EMascota> listarMascota(EMascota ent)
        {
            return DMascota.listarMascota(ent);
        }

        public static EMascota ObtenerMascota(EMascota ent)
        {
            return DMascota.ObtenerMascota(ent);
        }

        public static EMascota ObtenerMascotaxDNI(EMascota ent)
        {
            return DMascota.ObtenerMascotaxDNI(ent);
        }
        
        public static int AnularMascotaWM(EMascota ent)
        {
            return DMascota.AnularMascotaWM(ent);
        }
        public static int ActualizarMascotaWM(EMascota ent)
        {
            return DMascota.ActualizarMascotaWM(ent);
        }
        public static int ActualizarFotoMascotaWM(EMascota ent)
        {
            return DMascota.ActualizarFotoMascotaWM(ent);
        }
        public static string InsertarFotoMascotaWM(EMascota ent)
        {
            return DMascota.InsertarFotoMascotaWM(ent);
        }
        
        public static string RegistrarMascotaWM(EMascota ent)
        {
            return DMascota.RegistrarMascotaWM(ent);
        }

        public static int ReportarMascotaWM(EMascota ent)
        {
            return DMascota.ReportarMascotaWM(ent);
        }
    }
}
