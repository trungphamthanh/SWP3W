using DASBackEnd.Data;
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

        private readonly DasContext _DasContext;
        public DASServicesController(DasContext DasContext)
        {

            this._DasContext = DasContext;

        }


        [HttpGet]
        [Route("GetAllServices")]
        public async Task<ActionResult<IEnumerable<Daservice>>> GetAllServices()
        {
            if (_DasContext == null)
            {
                return BadRequest(new { Message = "Can not get all services information " });
            }
            return await _DasContext.Daservices.ToListAsync();
        }

        [HttpGet]
        [Route("GetServiceDetail/{id}")]
        public async Task<ActionResult<IEnumerable<Daservice>>> GetServiceDetail(int id)
        {
            if (_DasContext.Daservices == null)
            {
                return BadRequest(new { Message = "Can not get service information " });
            }
            var service = await _DasContext.Daservices.FindAsync(id);
            if (service == null)
            {
                return BadRequest(new { Message = "Can not get service information " });
            }
            return Ok(service);

        }

        [HttpPost]
        [Route("AddServices")]
        public async Task<Daservice> AddService(Daservice objServices)
        {
            _DasContext.Daservices.Add(objServices);
            await _DasContext.SaveChangesAsync();
            return objServices;
        }


        [HttpPatch]
        [Route("UpdateServices/{id}")]
        public async Task<Daservice> UpdateServices(Daservice objServices)
        {
            _DasContext.Entry(objServices).State = EntityState.Modified;
            await _DasContext.SaveChangesAsync();
            return objServices;
        }

        [HttpDelete]
        [Route("DeleteServices/{id}")]
        public bool DeleteStudent(int id)
        {
            bool a = false;
            var service = _DasContext.Daservices.Find(id);
            if (service != null)
            {
                a = true;
                _DasContext.Entry(service).State = EntityState.Deleted;
                _DasContext.SaveChanges();
            }
            else
            {
                a = false;
            }

            return a;
        }
    }
}
