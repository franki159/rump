﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENTIDAD
{
    public class ESolicitud:EGeneral
    {
        public decimal ID { get; set; }
        public decimal SOLICITUD_ID { get; set; }
        public string ID_ENCRIP { get; set; }
        public string SOLICITUD_ID_ENCRIP { get; set; }
        public string ID_MSC_ENCRIP { get; set; }

        public Nullable<DateTime> FECHA_SOL { get; set; }
        public double TOTAL { get; set; }
        public decimal PRECIO { get; set; }
        public int CANTIDAD { get; set; }
        public decimal USUARIO_ID { get; set; }
        public decimal USUARIO { get; set; }
        public decimal MASCOTA_ID { get; set; }
        public string MASCOTA { get; set; }
        public string DNI { get; set; }
        public string EMAIL { get; set; }
        public string PROPIETARIO { get; set; }
        public string TELEFONO { get; set; }
        public int ESTADO { get; set; }
        public int SOL_TOMADA { get; set; }
        public string EST_DSC { get; set; }

        public string NOM_REP { get; set; }
        public string APE_REP { get; set; }
        public string TEL_REP { get; set; }
        public string DNI_REP { get; set; }
        public string DIRECCION { get; set; }
        public string REFERENCIA { get; set; }
        public Nullable<decimal> GEOGRAFIA_ID { get; set; }

        public string DEPARTAMENTO { get; set; }
        public string PROVINCIA { get; set; }
        public string DISTRITO { get; set; }

        public string COMENTARIO { get; set; }
        public string FOTO { get; set; }
        public decimal ENVIO { get; set; }

        public Nullable<DateTime> FEC_INI { get; set; }
        public Nullable<DateTime> FEC_FIN { get; set; }
    }
}
