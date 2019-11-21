using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PRESENTACION.Areas.prueba.Controllers
{
    public class DefaultController : Controller
    {
        // GET: prueba/Default
        public ActionResult Index()
        {
            return View();
        }
    }
}