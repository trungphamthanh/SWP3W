using DASBackEnd.Models;

namespace DASBackEnd.IRepository
{
    public interface IBookingDetailRepository
    {
        public BookingDetail CreateBookingDetailAsync(BookingDetail bookingDetail);
        public List<BookingDetail> getAllBookingDetailByCustomer(int customerId);
        public List<BookingDetail> getAllBookingDetailByManager();
        public BookingDetail customerGetBookingDetailInformationByOrderId(int bookingId);
    }
}
