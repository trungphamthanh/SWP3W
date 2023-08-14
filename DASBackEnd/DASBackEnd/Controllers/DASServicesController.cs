using DASBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DASBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DASServicesController : ControllerBase
    {

        private readonly DASDbContext _DASDbContext;
        public DASServicesController(DASDbContext DASDbContext)
        {

            this._DASDbContext = DASDbContext;

        }


        [HttpGet]
        [Route("GetAllServices")]
        public async Task<ActionResult<IEnumerable<DAServices>>> GetAllServices()
        {
            if (_DASDbContext == null)
            {
                return BadRequest(new { Message = "Can not get all services information " });
            }
            return await _DASDbContext.DAServices.ToListAsync();
        }

        [HttpGet]
        [Route("GetServiceDetail/{id}")]
        public async Task<ActionResult<IEnumerable<DAServices>>> GetServiceDetail(int id)
        {
            if (_DASDbContext.DAServices == null)
            {
                return BadRequest(new { Message = "Can not get service information " });
            }
            var service = await _DASDbContext.DAServices.FindAsync(id);
            if (service == null)
            {
                return BadRequest(new { Message = "Can not get service information " });
            }
            return Ok(service);
            
        }
        
        [HttpPost]
        [Route("AddServices")]
        public async Task<DAServices> AddStudent(DAServices objServices)
        {
            _DASDbContext.DAServices.Add(objServices);
            await _DASDbContext.SaveChangesAsync();
            return objServices;
        }


        [HttpPatch]
        [Route("UpdateServices/{id}")]
        public async Task<DAServices> UpdateServices(DAServices objServices)
        {
            _DASDbContext.Entry(objServices).State = EntityState.Modified;
            await _DASDbContext.SaveChangesAsync();
            return objServices;
        }

        [HttpDelete]
        [Route("DeleteServices/{id}")]
        public bool DeleteStudent(int id)
        {
            bool a = false;
            var service = _DASDbContext.DAServices.Find(id);
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
