using DASBackEnd.IServices;

namespace DASBackEnd.DTO
{
    public class CustomerCreateBookingDTO
    {
        public int accountId { get; set; }
        public int slotId { get; set; }
        public string bookingStatus { get; set; }
        public List<ServiceForBookingDTO> listService { get; set; }
    }
}
