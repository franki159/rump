using System.Web.Mvc;

namespace PRESENTACION.Areas.WebRecognition
{
    public class WebRecognitionAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "WebRecognition";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "WebRecognition_default",
                "WebRecognition/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}