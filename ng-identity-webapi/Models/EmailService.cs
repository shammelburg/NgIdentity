using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Principal;
using System.Text;
using System.Web;

namespace ng_identity_webapi.Models
{
    public class EmailService
    {
        public static void ReportException(Exception ex)
        {
            if (AppSettingsHelper.SmtpEnabled)
            {
                string CurrentUser = HttpContext.Current.User.Identity.Name;
                string UserId = string.Empty;

                IPHostEntry ip = Dns.GetHostEntry(Dns.GetHostName());
                IPAddress[] IPaddr = ip.AddressList;

                string[] myIp = new string[IPaddr.Length];
                for (int i = 0; i < IPaddr.Length; i++)
                    myIp[i] = IPaddr[i].ToString();

                //Get the current date and time
                string dateTime = DateTime.Now.ToLongDateString() + ", at " + DateTime.Now.ToShortTimeString();
                //Obtain the page that generated the error
                System.Web.HttpContext context = System.Web.HttpContext.Current;

                var sb = new StringBuilder();

                sb.Append("<table style='width: 700px;' border='1'>");
                sb.AppendLine("<tr><th colspan='2'>********** Exception Information **********</th></tr>");
                sb.AppendFormat("<tr><td>Exception Date</td><td>{0}</td></tr>", dateTime);
                sb.AppendFormat("<tr><td>User</td><td>{0} ({1})</td></tr>", WindowsIdentity.GetCurrent().Name, CurrentUser);
                foreach (string s in myIp)
                    sb.AppendFormat("<tr><td>IP</td><td>{0}</td></tr>", s);
                sb.AppendFormat("<tr><td>Page (URL)</td><td>{0}</td></tr>", context.Request.RawUrl);
                sb.AppendLine("<tr><th colspan='2'>********** Exception Details **********</th></tr>");
                sb.AppendFormat("<tr><td>Message</td><td>{0}</td></tr>", ex.Message);
                sb.AppendFormat("<tr><td>Inner Exception</td><td>{0}</td></tr>", ex.InnerException);
                sb.AppendFormat("<tr><td>Source</td><td>{0}</td></tr>", ex.Source);
                sb.AppendFormat("<tr><td>Method</td><td>{0}</td></tr>", ex.TargetSite);
                sb.AppendFormat("<tr><td>Stack Trace</td><td>{0}</td></tr>", ex.StackTrace);
                sb.Append("<table>");

                //Send error email in case the option is activated in web.config
                if (AppSettingsHelper.ErrorEmailEnabled)
                {
                    string subject = "Exception Report: Supplier Portal";
                    string body = sb.ToString();
                    SendEmail(AppSettingsHelper.MailFromException, AppSettingsHelper.MailToException, subject, body, true);
                }
            }
        }

        public static void SendEmail(string from, string to, string subject, string body, bool isHtml)
        {
            if (AppSettingsHelper.SmtpEnabled)
            {
                // Create Mail Client
                SmtpClient smtp = new SmtpClient();
                //Create the mail message
                MailMessage mail = new MailMessage(from, to, subject, body);
                // Does page contain html
                mail.IsBodyHtml = isHtml;
                //Send mail
                smtp.Send(mail);
            }
        }
    }
}