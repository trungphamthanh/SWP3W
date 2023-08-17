using System.ComponentModel.DataAnnotations;

namespace DASBackEnd.Models
{
    public class Booking
    {
        [Key]
        public int ID { get; set; }
        public string CustomerName { get; set; }
        public string bookingStatus { get; set; }
        public int accountId { get; set; }
        public int slotId { get; set; }
    }
}
