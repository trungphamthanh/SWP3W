using BusinessObj.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class BookingRepository : GenericRepository<Booking>, IBookingRepository
    {
        public IEnumerable<Booking> GetBookingsByCustomerName(string customerName)
        {
            return _context.Bookings.Where(s => s.CustomerName.Contains(customerName)).ToList();
        }
    }
}
