using System.ComponentModel.DataAnnotations;

namespace DASBackEnd.Models
{
    public class Booking
    {
        [Key]
        public int ID { get; set; }
        public string CustomerName { get; set; }
        public string ServicesName { get; set; }
        public string Status { get; set; }
        public int accountId { get; set; }
        public int roleId { get; set; }
        public decimal totalPrice { get; set; }
    }
}
