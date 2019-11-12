using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENTIDAD
{
    public class EMascota
    {
        //REPORTAR MASCOTA
        public string CORREO { get; set; }
        public string OBSERVACION { get; set; }
        public string TELEFONO { get; set; }
        public decimal ID { get; set; }
        public string ID_ENCRIP { get; set; }
        public string DNI { get; set; }
        public decimal USUARIO_ID { get; set; }
        public string NOMBRE { get; set; }
        public string APELLIDO { get; set; }
        public string SEXO { get; set; }
        public string COD_MICROCHIP { get; set; }
        public string TAMANO { get; set; }
        public string TIPO { get; set; }
        public string RAZA { get; set; }
        public decimal MASCOTA_TIPO_ID { get; set; }
        public decimal MASCOTA_RAZA_ID { get; set; }
        public string CALIFICACION { get; set; }
        public string COLOR { get; set; }
        public string TIPO_DSC { get; set; }
        public string RAZA_DSC { get; set; }
        public string BIOGRAFIA { get; set; }
        public Nullable<DateTime> FEC_NAC { get; set; }
        public Nullable<DateTime> FEC_CREA { get; set; }
        //FAMILIA PADRE
        public string FAMILIARP { get; set; }
        public string DNIP { get; set; }
        public string TELEFONOP { get; set; }
        //FAMILIA MADRE
        public string FAMILIARM { get; set; }
        public string DNIM { get; set; }
        public string TELEFONOM { get; set; }
        //DOMICILIO
        public decimal GEOGRAFIA_ID { get; set; }
        public string DEPARTAMENTO { get; set; }
        public string PROVINCIA { get; set; }
        public string DISTRITO { get; set; }
        public string DIRECCION { get; set; }
        public string PISO { get; set; }
        public string REFERENCIA { get; set; }
        //Foto
        public decimal GALERIA_ID { get; set; }
        public string FOTO { get; set; }
        public string EXTENSION { get; set; }
        //Mascota Salud
        public int CASTRADO { get; set; }
        public int VISITA { get; set; }
        public int ALERGIA_MEDICAMENTO { get; set; }
        public int VACUNACION { get; set; }
        public int ANTIRRABICA { get; set; }
        public Nullable<DateTime> FEC_ANTIRRABICA { get; set; }
        public int ALERGIA { get; set; }
        public string ALERGIA_DSC { get; set; }
        public int ENFERMEDAD { get; set; }
        public string ENFERMEDAD_DSC { get; set; }
        public Nullable<DateTime> FEC_DESPARACITACION { get; set; }
        public int SEXTUPLE { get; set; }
        public Nullable<DateTime> FEC_SEXTUPLE { get; set; }
        public int TRIPLEFEL { get; set; }
        public Nullable<DateTime> FEC_TRIPLEFEL { get; set; }
        public int LEUCEMIA { get; set; }
        public Nullable<DateTime> FEC_LEUCEMIA { get; set; }
        public int LIMP_DENTAL { get; set; }
        public int OPCION { get; set; }
        public int ESTADO { get; set; }

        public List<EMascota> lMASCOTA { get; set; }
    }
}
