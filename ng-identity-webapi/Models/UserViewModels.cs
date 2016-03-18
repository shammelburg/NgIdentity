using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ng_identity_webapi.Models
{
    public class UserViewModels
    {
    }

    public class UserViewModel
    {
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public string Id { get; set; }
        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public string RoleName { get; set; }
        public bool TwoFactorEnabled { get; set; }
        public bool LockoutEnabled { get; set; }
    }
}