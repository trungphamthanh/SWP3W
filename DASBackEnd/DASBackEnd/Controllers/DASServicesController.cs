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
    }
}
