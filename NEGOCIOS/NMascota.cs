﻿using System;
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

        public static List<EMascota> filtroMascotaWM(EMascota ent)
        {
            return DMascota.filtroMascotaWM(ent);
        }

        public static List<EMascota> listarMascotaAdopcion(EMascota ent)
        {
            return DMascota.listarMascotaAdopcion(ent);
        }

        public static EMascota ObtenerMascota(EMascota ent)
        {
            return DMascota.ObtenerMascota(ent);
        }

        public static EMascota ObtenerMascotaxDNI(EMascota ent)
        {
            return DMascota.ObtenerMascotaxDNI(ent);
        }
        public static EMascota ObtenerMascotaxId(EMascota ent)
        {
            return DMascota.ObtenerMascotaxId(ent);
        }

        public static EMascota ObtenerMascotaAdopcion(EMascota ent)
        {
            return DMascota.ObtenerMascotaAdopcion(ent);
        }

        public static int AnularMascotaWM(EMascota ent)
        {
            return DMascota.AnularMascotaWM(ent);
        }
        public static int AdopcionMascotaWM(EMascota ent)
        {
            return DMascota.AdopcionMascotaWM(ent);
        }
        public static int CuponMascotaWM(EMascota ent)
        {
            return DMascota.CuponMascotaWM(ent);
        }
        public static int EncontradaMascotaWM(EMascota ent)
        {
            return DMascota.EncontradaMascotaWM(ent);
        }        
        public static int NoAdopcionMascotaWM(EMascota ent)
        {
            return DMascota.NoAdopcionMascotaWM(ent);
        }
        public static string PerdidaMascotaWM(EMascota ent)
        {
            return DMascota.PerdidaMascotaWM(ent);
        }
        public static string MuerteMascotaWM(EMascota ent)
        {
            return DMascota.MuerteMascotaWM(ent);
        }
        public static string SolicitarServicioWM(ESolicitud ent)
        {
            return DMascota.SolicitarServicioWM(ent);
        }
        public static int ActualizarMascotaWM(EMascota ent)
        {
            return DMascota.ActualizarMascotaWM(ent);
        }
        public static string ActualizarFotoMascotaWM(EMascota ent)
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

        public static EMascota preRegistrarMascotaWM(EMascota ent)
        {
            return DMascota.preRegistrarMascotaWM(ent);
        }

        public static int ReportarMascotaWM(EMascota ent)
        {
            return DMascota.ReportarMascotaWM(ent);
        }

        public static int log_error(string p_error, string p_tipo)
        {
            return DMascota.log_error(p_error, p_tipo);
        }
    }
}
