using BusinessObj.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public interface IBookingRepository
    {
        public IEnumerable<Booking> GetBookingsByCustomerName(string customerName);
    }
}
