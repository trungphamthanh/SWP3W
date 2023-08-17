using DASBackEnd.Models;

namespace DASBackEnd.IRepository
{
    public interface IBookingRepository
    {
        public Task<Booking> CreateBookingAsync(Booking booking);
        public List<Booking> getAllBookingByCustomer(int customerId);
        public List<Booking> getAllBookingByManager();
        public Booking customerGetBookingDetailInformationByOrderId(int bookingId);
    }
}
