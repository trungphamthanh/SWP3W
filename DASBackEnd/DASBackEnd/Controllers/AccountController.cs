﻿using DASBackEnd.Models;
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
                return BadRequest(new { Message = "Can not get all services information " });
            }
            else
            {
                return await _DASDbContext.Account.Where(x => x.roleId == 3).ToListAsync();
            }

        }

        [HttpGet]
        [Route("GetAllDoctor")]
        public async Task<ActionResult<IEnumerable<Account>>> GetAllDoctor()
        {
            if (_DASDbContext == null)
            {
                return BadRequest(new { Message = "Can not get all services information " });
            }
            else
            {
                return await _DASDbContext.Account.Where(x => x.roleId == 2).ToListAsync();
            }

        }

        [HttpGet]
        [Route("GetCustomerDetail/{id}")]
        public async Task<ActionResult<IEnumerable<Account>>> GetCustomerDetail(int id)
        {
            if (_DASDbContext.Account == null)
            {
                return BadRequest(new { Message = "Can not get customer information " });
            }
            var account = await _DASDbContext.Account.FindAsync(id);
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
            _DASDbContext.Entry(objAccount).State = EntityState.Modified;
            await _DASDbContext.SaveChangesAsync();
            return objAccount;
        }
    }
}
