using DASBackEnd.Data;
using DASBackEnd.IRepository;
using DASBackEnd.Models;
using Microsoft.EntityFrameworkCore;

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

        public BookingDetail customerGetBookingDetailInformationByBookingId(int bookingId)
        {
            BookingDetail bookingDetail = dasContext.BookingDetails.Find(bookingId);

            return bookingDetail;

        }
    }
}
