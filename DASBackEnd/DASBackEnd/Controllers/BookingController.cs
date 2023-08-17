using DASBackEnd.DTO;
using DASBackEnd.IServices;
using DASBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DASBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private IBookingServices iBookingServices;

        public BookingController(IBookingServices iBookingServices)
        {
            this.iBookingServices = iBookingServices;
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
                return BadRequest("Can not create new order please try again. ");

            }

        }
    }
}
