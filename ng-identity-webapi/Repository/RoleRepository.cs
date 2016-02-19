using Microsoft.AspNet.Identity.EntityFramework;
using ng_identity_webapi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ng_identity_webapi.Repository
{
    public class RoleRepository
    {
        private ApplicationDbContext _context;

        public RoleRepository()
        {
            _context = new ApplicationDbContext();
        }

        public IEnumerable<IdentityRole> Get()
        {
            return _context.Roles.ToList();
        }

        public void Delete(string RoleName)
        {
            var thisRole = _context.Roles.Where(r => r.Name.Equals(RoleName, StringComparison.CurrentCultureIgnoreCase)).FirstOrDefault();
            _context.Roles.Remove(thisRole);
            _context.SaveChanges();
        }

        public IEnumerable<IdentityRole> Create(string RoleName)
        {
            _context.Roles.Add(new IdentityRole()
            {
                Name = RoleName
            });
            _context.SaveChanges();

            return _context.Roles.ToList().Where(x => x.Name == RoleName);
        }
    }
}