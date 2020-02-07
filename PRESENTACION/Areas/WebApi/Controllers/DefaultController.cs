using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PRESENTACION.Areas.WebApi.Controllers
{
    public class DefaultController : Controller
    {
        // GET: WebRecognition/Default
        public ActionResult Index()
        {
            return View();
        }
    }
}