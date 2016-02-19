using ng_identity_webapi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ng_identity_webapi.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "NG-IDENTITY WEB API";

            var url = AppSettingsHelper.UrlForAppEmailRedirection;
            return Redirect(String.Format("http://{0}", url));
        }
    }
}
