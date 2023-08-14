using DASBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DASBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {

        private readonly DASDbContext _DASDbContext;
        public AccountController(DASDbContext DASDbContext)
        {

            this._DASDbContext = DASDbContext;

        }

        [HttpGet]
        [Route("GetAllCustomer")]
        public async Task<ActionResult<IEnumerable<Account>>> GetAllCustomer()
        {
            if (_DASDbContext == null)
            {
                return BadRequest(new { Message = "Can not get all customer information " });
            }
            return await _DASDbContext.Accounts.ToListAsync();
        }

        [HttpGet]
        [Route("GetCustomerDetail/{id}")]
        public async Task<ActionResult<IEnumerable<Account>>> GetCustomerDetail(int id)
        {
            if (_DASDbContext.DAServices == null)
            {
                return BadRequest(new { Message = "Can not get customer information " });
            }
            var service = await _DASDbContext.DAServices.FindAsync(id);
            if (service == null)
            {
                return BadRequest(new { Message = "Can not get customer information " });
            }
            return Ok(service);

        }

        [HttpPost]
        [Route("AddServices")]
        public async Task<Account> AddStudent(Account objServices)
        {
            _DASDbContext.Accounts.Add(objServices);
            await _DASDbContext.SaveChangesAsync();
            return objServices;
        }


        [HttpPatch]
        [Route("UpdateServices/{id}")]
        public async Task<Account> UpdateServices(Account objAccount)
        {
            _DASDbContext.Entry(objAccount).State = EntityState.Modified;
            await _DASDbContext.SaveChangesAsync();
            return objAccount;
        }

        [HttpDelete]
        [Route("DeleteServices/{id}")]
        public bool DeleteStudent(int id)
        {
            bool a = false;
            var service = _DASDbContext.Accounts.Find(id);
            if (service != null)
            {
                a = true;
                _DASDbContext.Entry(service).State = EntityState.Deleted;
                _DASDbContext.SaveChanges();
            }
            else
            {
                a = false;
            }

            return a;
        }
    }
}
