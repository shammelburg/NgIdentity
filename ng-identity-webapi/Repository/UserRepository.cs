using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using ng_identity_webapi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace ng_identity_webapi.Repository
{
    public class UserRepository
    {
        private UserManager<ApplicationUser> _userManager;

        public UserRepository()
        {
            _userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
        }

        public IEnumerable<ApplicationUser> GetUsers()
        {
            return _userManager.Users.ToList();
        }

        public ApplicationUser GetUser(string UserId)
        {
            var user = _userManager.FindById(UserId);
            return user;
        }

        public void Update(UserViewModel vm)
        {
            var user = _userManager.FindById(vm.Id);

            user.Email = vm.Email;
            user.UserName = vm.Email;
            user.EmailConfirmed = vm.EmailConfirmed;
            user.PhoneNumber = vm.PhoneNumber;
            user.PhoneNumberConfirmed = vm.PhoneNumberConfirmed;
            user.TwoFactorEnabled = vm.TwoFactorEnabled;
            user.LockoutEnabled = vm.LockoutEnabled;

            _userManager.Update(user);
        }

        public void Delete(UserViewModel vm)
        {
            var user = _userManager.FindById(vm.Id);
            _userManager.Delete(user);
        }

        public void ResetPassword(ResetPasswordViewModel vm)
        {
            _userManager.RemovePassword(vm.Id);
            _userManager.AddPassword(vm.Id, vm.Password);
        }

        public IEnumerable<string> GetUserRoles(string Id)
        {
            return _userManager.GetRoles(Id);
        }

        public void AddToRole(UserViewModel vm)
        {
            _userManager.AddToRole(vm.Id, vm.RoleName);
        }

        public void RemoveFromRole(UserViewModel vm)
        {
            _userManager.RemoveFromRole(vm.Id, vm.RoleName);
        }
    }
}