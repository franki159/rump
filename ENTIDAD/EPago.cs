using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENTIDAD
{
    public class EPago:EGeneral
    {
        public decimal ID { get; set; }
        public decimal SOLICITUD_ID { get; set; }
        public string ID_ENCRIP { get; set; }
        public string SOLICITUD_ID_ENCRIP { get; set; }
        public string NUM_TARJETA { get; set; }
        public Nullable<DateTime> FECHA_PAGO { get; set; }
        public double TOTAL { get; set; }
        public string OBSERVACION { get; set; }
        public int ESTADO { get; set; }
        public decimal USUARIO { get; set; }
    }
}
