using DASBackEnd.Data;
using DASBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DASBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingDetailController : ControllerBase
    {
        private readonly DasContext _DasContext;
        public BookingDetailController(DasContext DasContext)
        {

            this._DasContext = DasContext;

        }


        [HttpGet]
        [Route("GetBookingDetail/{id}")]
        public async Task<ActionResult<IEnumerable<Daservice>>> GetBookingDetail(int id)
        {
            if (_DasContext.Daservices == null)
            {
                return BadRequest(new { Message = "Can not get service information " });
            }
            var service = await _DasContext.BookingDetails.Where(x => x.BookingId == id).ToListAsync();
            if (service == null)
            {
                return BadRequest(new { Message = "Can not get service information " });
            }
            return Ok(service);

        }

    }
}
