using System.ComponentModel.DataAnnotations;

namespace DASBackEnd.Models
{
    public class Slot
    {
        [Key]
        public int ID { get; set; }
        public string SlotStart { get; set; }
        public string SlotEnd { get; set; }
        public string Status { get; set; }
        public DateTime date { get; set; }
        public int accountId { get; set; }
    }
}
