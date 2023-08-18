using DASBackEnd.Models;

namespace DASBackEnd.IRepository
{
    public interface IBookingDetailRepository
    {
        public BookingDetail CreateBookingDetailAsync(BookingDetail bookingDetail);
        public BookingDetail customerGetBookingDetailInformationByBookingId(int bookingId);
    }
}
