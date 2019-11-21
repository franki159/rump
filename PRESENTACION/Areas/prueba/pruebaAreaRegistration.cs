using System.Web.Mvc;

namespace PRESENTACION.Areas.prueba
{
    public class pruebaAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "prueba";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "prueba_default",
                "prueba/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}