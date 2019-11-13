using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENTIDAD
{
    public class ESolicitud
    {
        public decimal ID { get; set; }
        public string ID_ENCRIP { get; set; }
        public Nullable<DateTime> FECHA_SOL { get; set; }
        public decimal TOTAL { get; set; }
        public decimal USUARIO_ID { get; set; }
        public decimal USUARIO { get; set; }
        public decimal MASCOTA_ID { get; set; }
        public string MASCOTA { get; set; }
        public int OPCION { get; set; }
        public string DNI { get; set; }
        public string EMAIL { get; set; }
        public string TIPO { get; set; }
        public string PROPIETARIO { get; set; }
        public string TELEFONO { get; set; }
    }
}
