using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PRESENTACION.Areas.WebApi
{
    public class Info_Dialog_Cronograma
    {
        public List<Evento_Tipo> Evento_Tipo_ { get; set; }
        public List<Evento_Periodo> Evento_Periodo_ { get; set; }
        public List<Mascotas_Usuario> Mascotas_Usuario_ { get; set; }

    }
}