﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENTIDAD
{
    public class EUsuario
    {
        public decimal ID { get; set; }
        public string IDENCRIPT { get; set; }
        public string EMAIL { get; set; }
        public string PASSWORD { get; set; }
        public string NOMBRE { get; set; }
        public string APELLIDO { get; set; }
        public string FOTO { get; set; }
        public string SEXO { get; set; }
        public string TELEFONO { get; set; }
        public string CELULAR { get; set; }
        public Nullable<DateTime> FECHA_NAC { get; set; }
        public decimal PERFIL_ID { get; set; }
        public int ACTIVO{ get; set; }
        public int ESTADO { get; set; }
        public EUsuarioPerfil USUARIO_PERFIL { get; set; }
    }
}
