using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENTIDAD
{
    public class EMascotaSalud
    {
        public int ID_MOVIMIENTO { get; set; }
        public int ID_TIPO_MOVIMIENTO { get; set; }
        public int ID_CLIENTE { get; set; }
        public string DESCRIPCION { get; set; }
        public DateTime FECHA_INI { get; set; }
        public DateTime FECHA_FIN { get; set; }
        public decimal MONTO { get; set; }
        public string OBSERVACION { get; set; }
        public int USU_MOD { get; set; }
        public int ID_LOCAL { get; set; }
        public string TIPO { get; set; }
        public decimal ADELANTO { get; set; }
        public int OPCION { get; set; }
        public int ID_ATENCION { get; set; }
        public int TIPO_MOV { get; set; }
        public Boolean CHK_PAGO { get; set; }
        public decimal DEUDA { get; set; }

        public string TIPO_COMPROBANTE { get; set; }
        public string NUM_DOCUMENTO { get; set; }
        public string CLIENTE { get; set; }
        public int TIPO_MOVIMIENTO { get; set; }
        public string TIPO_OPERACION { get; set; }
    }
}
