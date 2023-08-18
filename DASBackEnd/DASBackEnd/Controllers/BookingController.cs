using DASBackEnd.Data;
using DASBackEnd.DTO;
using DASBackEnd.IServices;
using DASBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static System.Reflection.Metadata.BlobBuilder;

namespace DASBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private IBookingServices iBookingServices;
        private readonly DasContext _DasContext;

        public BookingController(IBookingServices iBookingServices, DasContext DasContext)
        {
            this.iBookingServices = iBookingServices;
            this._DasContext = DasContext;
        }


        [HttpPost]
        [Route("createBooking/customer/{id}")]
        public async Task<IActionResult> createOrderUsingCustomerId(CustomerCreateBookingDTO customerCreateBookingDTO)
        {
            try
            {
                await iBookingServices.customerCreateBooking(customerCreateBookingDTO);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest("Can not create new booking please try again. ");

            }
        }
        [HttpGet]
        [Route("getListBookingByCustomerId/{id}")]
        public IActionResult getListOrderByCustomerId(int id)
        {
            try
            {
                List<Booking> list = iBookingServices.customerGetAllBooking(id);
                return Ok(list);
            }
            catch (Exception)
            {

                return BadRequest("Đã xảy ra lỗi khi lấy thông tin, vui lòng thử lại. ");
            }
        }


        [HttpGet]
        [Route("GetAllBookingByManager")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetAllBookingByManager()
        {
            if (_DasContext == null)
            {
                return BadRequest(new { Message = "Can not get all booking information " });
            }
            var bookings = await _DasContext.Daservices.ToListAsync();
            if (bookings == null)
            {
                return BadRequest(new { Message = "Can not get all booking for manager " });
            }
            return Ok(bookings);
        }
    }
}
