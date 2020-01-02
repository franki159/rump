using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using ENTIDAD;
using NEGOCIOS;

namespace PRESENTACION
{
    public partial class servicios : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod()]
        public static object ListaMapa()
        {
            ERespuestaJson objRespuesta = new ERespuestaJson();
            try
            {
                EMapa objResultado = NConvenio.listarMapa();

                if (objResultado == null)
                {
                    objResultado = new EMapa();
                    objResultado.TIPOS = new List<EMapa.ETipoConvenio>();
                    objResultado.CONVENIOS = new List<EMapa.EConvenio>();
                }

                objRespuesta.Resultado = objResultado;
            }
            catch (Exception ex)
            {
                objRespuesta.Error(String.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objRespuesta;
        }

        [WebMethod()]
        public static object ActualizaMapa()
        {
            return "";
        }
    }
}