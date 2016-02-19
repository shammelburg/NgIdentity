using ng_identity_webapi.Models;
using ng_identity_webapi.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ng_identity_webapi.Controllers
{
    [Authorize(Roles = "Admin")]
    public class UserController : ApiController
    {
        private UserRepository _repo;

        public UserController()
        {
            _repo = new UserRepository();
        }

        // GET: api/User/Get
        public IHttpActionResult Get()
        {
            return Ok(_repo.GetUsers());
        }

        // GET: api/User/GetUser
        public IHttpActionResult GetUser(string Id)
        {
            return Ok(_repo.GetUser(Id));
        }

        // GET: api/User/GetUserRoles
        public IHttpActionResult GetUserRoles(string Id)
        {
            return Ok(_repo.GetUserRoles(Id));
        }

        // POST: api/User/AddToRole
        [HttpPost]
        public IHttpActionResult AddToRole(UserViewModel vm)
        {
            try
            {
                _repo.AddToRole(vm);
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // POST: api/User/RemoveFromRole
        [HttpPost]
        public IHttpActionResult RemoveFromRole(UserViewModel vm)
        {
            try
            {
                _repo.RemoveFromRole(vm);
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // POST: api/User/UpdateUser
        [HttpPost]
        public IHttpActionResult UpdateUser(UserViewModel vm)
        {
            try
            {
                _repo.Update(vm);
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // POST: api/User/ResetPassword
        [HttpPost]
        public IHttpActionResult ResetPassword(ResetPasswordViewModel vm)
        {
            try
            {
                _repo.ResetPassword(vm);
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
