using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENTIDAD
{
    public class EUsuario
    {
        public int ID { get; set; }
        public string IDENCRIPT { get; set; }
        public string EMAIL { get; set; }
        public string NOMBRE { get; set; }
        public string APELLIDO { get; set; }
        public string SEXO { get; set; }
        public int PERFIL_ID { get; set; }
    }
}
