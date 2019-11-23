using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENTIDAD
{
    public class EEvento
    {
        public decimal ID { get; set; }
        public string ID_ENCRIP { get; set; }
        public decimal EVENTO_TIPO_ID { get; set; }
        public string TIPO { get; set; }
        public decimal MASCOTA_ID { get; set; }
        public string MASCOTA_ID_ENCRIP { get; set; }
        public string MASCOTA { get; set; }
        public string TITULO { get; set; }
        public string DETALLE { get; set; }
        public Nullable<DateTime> FECHA_INICIO { get; set; }
        public Nullable<DateTime> FECHA_FIN { get; set; }

        public int ESTADO { get; set; }
        public decimal USUARIO_ID { get; set; }
    }
}
