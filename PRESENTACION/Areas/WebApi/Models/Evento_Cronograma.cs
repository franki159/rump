using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PRESENTACION.Areas.WebApi
{
    public class Evento_Cronograma
    {
        public List<Evento> Evento_ { get; set; }

        public List<Evento_Detalle> Evento_Detalle_ { get; set; }

    }
}