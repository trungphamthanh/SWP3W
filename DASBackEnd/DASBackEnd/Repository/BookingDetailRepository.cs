using DASBackEnd.Data;
using DASBackEnd.IRepository;
using DASBackEnd.Models;

namespace DASBackEnd.Repository
{
    public class BookingDetailRepository : IBookingDetailRepository
    {
        private DasContext dasContext;
        public BookingDetailRepository(DasContext dasContext)
        {
            this.dasContext = dasContext;
        }

        public BookingDetail CreateBookingDetailAsync(BookingDetail bookingDetail)
        {
            dasContext.BookingDetails.Add(bookingDetail);
            dasContext.SaveChanges();
            return bookingDetail;
        }

        public BookingDetail customerGetBookingDetailInformationByOrderId(int bookingId)
        {
            throw new NotImplementedException();
        }

        public List<BookingDetail> getAllBookingDetailByManager()
        {
            throw new NotImplementedException();
        }

        public List<BookingDetail> getAllBookingDetailByCustomer(int customerId)
        {
            throw new NotImplementedException();
        }
    }
}
