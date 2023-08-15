using System;
using System.Collections.Generic;

namespace BusinessObj.Models
{
    public partial class Slot
    {
        public Slot()
        {
            Bookings = new HashSet<Booking>();
        }

        public int Id { get; set; }
        public string? SlotStart { get; set; }
        public string? SlotEnd { get; set; }
        public string? Status { get; set; }
        public DateTime? Date { get; set; }
        public int? AccountId { get; set; }

        public virtual Account? Account { get; set; }
        public virtual ICollection<Booking> Bookings { get; set; }
    }
}
