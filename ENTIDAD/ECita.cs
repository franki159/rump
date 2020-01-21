using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENTIDAD
{
    public class ECita:EGeneral
    {
        public decimal ID { get; set; }
        public string ID_ENCRIP { get; set; }
        public Nullable<DateTime> FECHA_ATENCION_MEDICA { get; set; }
        public decimal MASCOTA_ID { get; set; }
        public decimal CLINICA_ID { get; set; }
        public decimal MEDICO_ID { get; set; }
        public string MOTIVO { get; set; }
        public string PESO { get; set; }
        public string TEMPERATURA { get; set; }
        public string SINTOMAS { get; set; }
        public string DIAGNOSTICO { get; set; }
        public string TRATAMIENTO { get; set; }
        public string OBSERVACIONES { get; set; }
        public string ANTECEDENTES { get; set; }
        public string FORMULA { get; set; }
        public decimal USUARIO { get; set; }
    }
}
