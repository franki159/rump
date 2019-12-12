using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENTIDAD
{
    public class EClinica:EGeneral
    {
        public string ID_ENCRIP { get; set; }
        public string BENEFICIO { get; set; }
        public int PUNTO_AUTORIZADO { get; set; }
        public string NOMBRE { get; set; }
        public string TELEFONO { get; set; }
        public string DIRECCION { get; set; }
        public string DEPARTAMENTO { get; set; }
        public string PROVINCIA { get; set; }
        public string LATITUD { get; set; }
        public string LONGITUD { get; set; }
        public decimal CONVENIO_TIPO_ID { get; set; }
        public decimal GEOGRAFIA_ID { get; set; }
        public decimal USUARIO_ID { get; set; }
    }
}
