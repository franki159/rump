using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Http;
using System.Web.Optimization;

namespace PRESENTACION
{
    public class Global : System.Web.HttpApplication
    {
        protected void RegisterRoutes(RouteCollection routes)
        {
            routes.MapPageRoute("Inicio", "Inicio", "~/index.aspx");
            routes.MapPageRoute("InicioSesion", "InicioSesion", "~/login.aspx");
            routes.MapPageRoute("Sistema", "Sistema", "~/default.aspx");
            routes.MapPageRoute("carritoRUMP", "carritoRUMP", "~/page/pagoSolicitud.aspx");
            routes.MapPageRoute("payment-mercadopago", "payment-mercadopago", "~/page/paymentGen.aspx");
            routes.MapPageRoute("payment-pending", "payment-pending", "~/pago_proceso.aspx");
            routes.MapPageRoute("Registro", "Registro", "~/register.aspx");
            routes.MapPageRoute("OlvidoClave", "OlvidoClave", "~/forgotPassword.aspx");
            routes.MapPageRoute("Servicios", "Servicios", "~/servicios.aspx");
            routes.MapPageRoute("MascotasExtraviadas", "MascotasExtraviadas", "~/mextraviadas.aspx");
            routes.MapPageRoute("Adopcion", "Adopcion", "~/adoptame.aspx");
            routes.MapPageRoute("QuienesSomos", "QuienesSomos", "~/quienessomos.aspx");
            routes.MapPageRoute("Contacto", "Contacto", "~/contacto.aspx");
            routes.MapPageRoute("Establecimientos", "Establecimientos", "~/convenios.aspx");
            routes.MapPageRoute("Genealogia", "Genealogia", "~/genealogia.aspx");
        }
        protected void Application_Start(object sender, EventArgs e)
        {
            RegisterRoutes(RouteTable.Routes);
            AreaRegistration.RegisterAllAreas();
            /*GlobalConfiguration.Configure(PRESENTACION.Areas.WebApi.WebApiConfig.Register);
            PRESENTACION.Areas.WebApi.FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            PRESENTACION.Areas.WebApi.RouteConfig.RegisterRoutes(RouteTable.Routes);
            PRESENTACION.Areas.WebApi.BundleConfig.RegisterBundles(BundleTable.Bundles);*/
        }

        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {
            Response.Redirect("~/Sistema#!/page/pageError");
        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
}