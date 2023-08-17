using DASBackEnd.Data;
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

        private readonly DasContext _DasContext;
        public AccountController(DasContext DasContext)
        {

            this._DasContext = DasContext;

        }

        [HttpGet]
        [Route("GetAllCustomer")]
        public async Task<ActionResult<IEnumerable<Account>>> GetAllCustomer()
        {
            if (_DasContext == null)
            {
                return BadRequest(new { Message = "Can not get all services information " });
            }
            else
            {
                return await _DasContext.Accounts.Where(x => x.RoleId == 3).ToListAsync();
            }

        }

        [HttpGet]
        [Route("GetAllDoctor")]
        public async Task<ActionResult<IEnumerable<Account>>> GetAllDoctor()
        {
            if (_DasContext == null)
            {
                return BadRequest(new { Message = "Can not get all services information " });
            }
            else
            {
                return await _DasContext.Accounts.Where(x => x.RoleId == 2).ToListAsync();
            }

        }

        [HttpGet]
        [Route("GetCustomerDetail/{id}")]
        public async Task<ActionResult<IEnumerable<Account>>> GetCustomerDetail(int id)
        {
            if (_DasContext.Accounts == null)
            {
                return BadRequest(new { Message = "Can not get customer information " });
            }
            var account = await _DasContext.Accounts.FindAsync(id);
            if (account == null)
            {
                return BadRequest(new { Message = "Can not get customer information " });
            }
            return Ok(account);

        }

        [HttpPatch]
        [Route("UpdateProfile/{id}")]
        public async Task<Account> UpdateProfile(Account objAccount)
        {
            _DasContext.Entry(objAccount).State = EntityState.Modified;
            await _DasContext.SaveChangesAsync();
            return objAccount;
        }
    }
}
