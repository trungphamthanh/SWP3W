using System.ComponentModel.DataAnnotations;

namespace DASBackEnd.Models
{
    public class BookingDetail
    {
        [Key]
        public int ID { get; set; }
        public int bookingId { get; set; }
        public int serviceId { get; set; }
    }
}
