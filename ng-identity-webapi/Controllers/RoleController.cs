using Microsoft.AspNet.Identity.EntityFramework;
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
    public class RoleController : ApiController
    {
        private RoleRepository _repo;

        public RoleController()
        {
            _repo = new RoleRepository();
        }

        // GET: api/Role/Get
        public IHttpActionResult Get()
        {
            return Ok(_repo.Get());
        }

        // POST: api/Role/Post?Name=
        [HttpPost]
        public IHttpActionResult Post(string Name)
        {
            try
            {
                _repo.Create(Name);
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // DELETE: api/Role/Delete?Name=
        [HttpPost]
        public IHttpActionResult Delete(string Name)
        {
            try
            {
                _repo.Delete(Name);
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
