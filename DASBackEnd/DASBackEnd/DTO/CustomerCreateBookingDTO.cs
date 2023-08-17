using DASBackEnd.IServices;

namespace DASBackEnd.DTO
{
    public class CustomerCreateBookingDTO
    {
        public int bookingId { get; set; }
        public string CustomerName { get; set; }
        public string bookingStatus { get; set; }
        public int accountId { get; set; }
        public int slotId { get; set; }

        public List<listServicesDTO> listservicesBookDTO { get; set; }
    }
}
