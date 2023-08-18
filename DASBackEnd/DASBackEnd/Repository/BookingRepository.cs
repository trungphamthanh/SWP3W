using DASBackEnd.Data;
using DASBackEnd.IRepository;
using DASBackEnd.Models;
using Microsoft.EntityFrameworkCore;

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

        public List<Booking> GetAllBookingByCustomer(int id)
        {
            List<Booking> booking = dbContext.Bookings.Where(x => x.AccountId == id).ToList();
            return booking;
        }

        public List<Booking> GetAllBookingByManager()
        {
            List<Booking> booking = dbContext.Bookings.ToList();
            return booking;
        }
    }
}
