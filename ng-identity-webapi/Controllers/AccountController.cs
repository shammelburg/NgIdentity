using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using ng_identity_webapi.Models;
using ng_identity_webapi.Providers;
using ng_identity_webapi.Results;
using System.Text;

namespace ng_identity_webapi.Controllers
{
    [Authorize]
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        private const string LocalLoginProvider = "Local";
        private ApplicationUserManager _userManager;

        public AccountController()
        {
        }

        public AccountController(ApplicationUserManager userManager,
            ISecureDataFormat<AuthenticationTicket> accessTokenFormat)
        {
            UserManager = userManager;
            AccessTokenFormat = accessTokenFormat;
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        public ISecureDataFormat<AuthenticationTicket> AccessTokenFormat { get; private set; }

        [HttpGet]
        [AllowAnonymous]
        // GET api/Account/Test
        [Route("Test")]
        public IHttpActionResult Test()
        {
            var obj = new { Name = "Sander", Id = 1 };

            
            //return BadRequest("Error!!!!!!!");
            return Ok(obj);
        }


        // GET api/Account/GetUserInfo
        [Route("GetUserInfo")]
        public async Task<ApplicationUser> GetUserInfo()
        {
            // returns all data from db about the user inc. PasswordHash
            var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());

            return user;
        }

        // POST api/Account/UpdateUserInfo
        [Route("UpdateUserInfo")]
        public async Task<IHttpActionResult> UpdateUserInfo(UserInfoViewModel vm)
        {
            try
            {
                var user = UserManager.FindById(User.Identity.GetUserId());

                user.Email = vm.Email;
                user.UserName = vm.Email;

                await UserManager.UpdateAsync(user);

                return Ok("Successfully updated.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        // POST api/Account/ChangePassword
        [Route("ChangePassword")]
        public async Task<IHttpActionResult> ChangePassword(ChangePasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result = await UserManager.ChangePasswordAsync(User.Identity.GetUserId(), model.OldPassword,
                model.NewPassword);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok("Successfully changed your password.");
        }

        // POST api/Account/ForgotPassword
        [AllowAnonymous]
        [HttpPost]
        [Route("ForgotPassword")]
        public async Task<IHttpActionResult> ForgotPassword(ForgotViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await UserManager.FindByEmailAsync(model.Email);
            var code = await UserManager.GeneratePasswordResetTokenAsync(user.Id);

            //var callbackUrl = Url.Route("ConfirmEmail", new { UserId = user.Id, code = code });
            var callbackUrl = String.Format("Please reset your password by clicking here: <a href=\"{0}://{1}reset-password?u={2}&c={3}\">link</a>", HttpContext.Current.Request.Url.Scheme, AppSettingsHelper.UrlForAppEmailRedirection, user.Id, HttpUtility.UrlEncode(code));

            EmailService.SendEmail(AppSettingsHelper.MailFrom, model.Email, "Forgot Password Link", callbackUrl, true);

            return Ok("A link has been sent to your email.");
        }

        // POST api/Account/ResetPassword
        [AllowAnonymous]
        [HttpPost]
        [Route("ResetPassword")]
        public async Task<IHttpActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            var result = await UserManager.ResetPasswordAsync(model.Id, model.Code, model.Password);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok("Your password has been successfully reset.");
        }

        // POST api/Account/Register
        [AllowAnonymous]
        [Route("Register")]
        public async Task<IHttpActionResult> Register(RegisterBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new ApplicationUser() { UserName = model.Email, Email = model.Email };

            IdentityResult result = await UserManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }
            else
            {
                var _context = new ApplicationDbContext();

                CheckAddUserToRoles(user, _context);

                if (model.Email.ToLower() == AppSettingsHelper.SystemAdmin.ToLower())
                {
                    UserManager.RemoveFromRole(user.Id, "Customer");
                    UserManager.AddToRole(user.Id, "Admin");
                }
            }

            await SendConfirmationEmail(user);

            return Ok();
        }

        private void CheckAddUserToRoles(ApplicationUser user, ApplicationDbContext _context)
        {
            var exists = false;
            foreach (var role in _context.Roles)
            {
                if (role.Name.Equals("Customer"))
                {
                    exists = true;
                }
            }

            if (!exists)
            {
                foreach (var role in AppSettingsHelper.SystemRoles.Split(','))
                {
                    _context.Roles.Add(new IdentityRole()
                    {
                        Name = role
                    });
                    _context.SaveChanges();
                }

                UserManager.AddToRole(user.Id, "Customer");
            }
            else
            {
                UserManager.AddToRole(user.Id, "Customer");
            }
        }

        private async Task SendConfirmationEmail(ApplicationUser user)
        {
            var token = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
            var callbackUrl = String.Format("Please confirm your email by clicking here: <a href=\"{0}://{1}confirm-email?u={2}&t={3}\">link</a>", HttpContext.Current.Request.Url.Scheme, AppSettingsHelper.UrlForAppEmailRedirection, user.Id, HttpServerUtility.UrlTokenEncode(Encoding.ASCII.GetBytes(token)));

            EmailService.SendEmail(AppSettingsHelper.MailFrom, user.Email, "Confirm Your Email Link", callbackUrl, true);
        }

        // POST api/Account/ConfirmEmail
        [AllowAnonymous]
        [Route("ConfirmEmail")]
        public async Task<IHttpActionResult> ConfirmEmail(string u, string t)
        {
            var token = Encoding.ASCII.GetString(System.Web.HttpServerUtility.UrlTokenDecode(t));
            var result = await UserManager.ConfirmEmailAsync(u, token);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok(result.Succeeded);
        }

        // POST api/Account/SendConfirmationEmail
        [Authorize]
        [Route("SendConfirmationEmail")]
        public async Task<IHttpActionResult> SendConfirmationEmail()
        {
            try
            {
                var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());

                await SendConfirmationEmail(user);

                return Ok("Successfully sent confirmation email.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing && _userManager != null)
            {
                _userManager.Dispose();
                _userManager = null;
            }

            base.Dispose(disposing);
        }

        #region Helpers

        private IAuthenticationManager Authentication
        {
            get { return Request.GetOwinContext().Authentication; }
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }

        private static class RandomOAuthStateGenerator
        {
            private static RandomNumberGenerator _random = new RNGCryptoServiceProvider();

            public static string Generate(int strengthInBits)
            {
                const int bitsPerByte = 8;

                if (strengthInBits % bitsPerByte != 0)
                {
                    throw new ArgumentException("strengthInBits must be evenly divisible by 8.", "strengthInBits");
                }

                int strengthInBytes = strengthInBits / bitsPerByte;

                byte[] data = new byte[strengthInBytes];
                _random.GetBytes(data);
                return HttpServerUtility.UrlTokenEncode(data);
            }
        }

        #endregion
    }
}
