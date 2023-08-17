using DASBackEnd.Data;
using DASBackEnd.IRepository;
using DASBackEnd.Models;

namespace DASBackEnd.Repository
{
    public class BookingRepository : IBookingRepository
    {
        private DasContext dbContext;
        public BookingRepository(DasContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Booking> CreateBookingAsync(Booking booking)
        {
            await dbContext.Bookings.AddAsync(booking);
            await dbContext.SaveChangesAsync();
            return booking;
        }

        public Booking customerGetBookingDetailInformationByOrderId(int bookingId)
        {
            throw new NotImplementedException();
        }

        public List<Booking> getAllBookingByCustomer(int customerId)
        {
            throw new NotImplementedException();
        }

        public List<Booking> getAllBookingByManager()
        {
            throw new NotImplementedException();
        }
    }
}
