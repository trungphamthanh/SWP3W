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
        [Route("GetServices")]
        public async Task<IEnumerable<DAServices>> GetStudents()
        {
            return await _DASDbContext.Services.ToListAsync();
        }


        [HttpPost]
        [Route("AddServices")]
        public async Task<DAServices> AddStudent(DAServices objServices)
        {
            _DASDbContext.Services.Add(objServices);
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
            var service = _DASDbContext.Services.Find(id);
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
