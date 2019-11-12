using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENTIDAD
{
    public class EMapa
    {
        public class ETipoConvenio
        {
            public decimal ID { get; set; }
            public string TIPO { get; set; }
        }

        public class EConvenio
        {
            public decimal ID { get; set; }
            public decimal TIPO_ID { get; set; }
            public string NOMBRE { get; set; }
            public string BENEFICIO { get; set; }
            public Int16 PUNTO_AUTORIZADO { get; set; }
            public string TELEFONO { get; set; }
            public string DIRECCION { get; set; }
            public string LATITUD { get; set; }
            public string LONGITUD { get; set; }
        }

        public List<ETipoConvenio> TIPOS { get; set; }
        public List<EConvenio> CONVENIOS { get; set; }
    }
}
