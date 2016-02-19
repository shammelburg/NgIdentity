using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace ng_identity_webapi.Models
{
    public class AppSettingsHelper
    {
        public static string MailTo = ConfigurationManager.AppSettings["MailTo"];
        public static string MailFrom = ConfigurationManager.AppSettings["MailFrom"];
        public static string MailToException = ConfigurationManager.AppSettings["MailToException"];
        public static string MailFromException = ConfigurationManager.AppSettings["MailFromException"];

        public static bool SmtpEnabled = bool.Parse(ConfigurationManager.AppSettings["SmtpEnabled"]);
        public static bool ErrorEmailEnabled = bool.Parse(ConfigurationManager.AppSettings["ErrorEmailEnabled"]);

        public static string UrlForAppEmailRedirection = ConfigurationManager.AppSettings["UrlForAppEmailRedirection"];

        public static string SystemRoles = ConfigurationManager.AppSettings["SystemRoles"];
        public static string SystemAdmin = ConfigurationManager.AppSettings["SystemAdmin"];
    }
}