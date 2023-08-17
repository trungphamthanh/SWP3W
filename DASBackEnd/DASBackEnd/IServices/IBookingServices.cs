using DASBackEnd.DTO;
using DASBackEnd.Models;

namespace DASBackEnd.IServices
{
    public interface IBookingServices
    {
        public Task<Booking> customerCreateBooking(int id, CustomerCreateBookingDTO customerCreateBookingDTO);
    }
}
