using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENTIDAD
{
    public class ERaza:EGeneral
    {
        public decimal ID { get; set; }
        public string ID_ENCRIP { get; set; }
        public string ESPECIE { get; set; }
        public decimal USUARIO { get; set; }
        public decimal MASCOTA_TIPO_ID { get; set; }
    }
}
