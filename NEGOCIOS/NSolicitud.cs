﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDAD;
using DATOS;

namespace NEGOCIOS
{
    public static class NSolicitud
    {
        public static List<ESolicitud> listarSolicitud(ESolicitud ent)
        {
            return DSolicitud.listarSolicitud(ent);
        }
        public static ESolicitud listarSolicitudxId(ESolicitud ent)
        {
            return DSolicitud.listarSolicitudxId(ent);
        }
        public static ESolicitud listarPedidoxId(ESolicitud ent)
        {
            return DSolicitud.listarPedidoxId(ent);
        }
        public static List<ESolicitud> listarServicio()
        {
            return DSolicitud.listarServicio();
        }
        
        public static List<ESolicitud> listarServicioXmascota(ESolicitud ent)
        {
            return DSolicitud.listarServicioXmascota(ent);
        }
        public static ESolicitud listarServicioxId(ESolicitud ent)
        {
            return DSolicitud.listarServicioxId(ent);
        }
        public static int AtenderSolicitud(ESolicitud ent)
        {
            return DSolicitud.AtenderSolicitud(ent);
        }
        public static decimal guardarServicioWM(ESolicitud ent)
        {
            return DSolicitud.guardarServicioWM(ent);
        }
        public static int AnularSolicitud(ESolicitud ent)
        {
            return DSolicitud.AnularSolicitud(ent);
        }

        public static decimal getDelivery(ESolicitud ent)
        {
            return DSolicitud.getDelivery(ent);
        }

        public static int ActualizarSolicitud(ESolicitud ent)
        {
            return DSolicitud.ActualizarSolicitud(ent);
        }
        public static int LiberarSolicitud(ESolicitud ent)
        {
            return DSolicitud.LiberarSolicitud(ent);
        }
    }
}
