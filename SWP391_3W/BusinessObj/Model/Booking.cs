using System;
using System.Collections.Generic;

namespace BusinessObj.Model
{
    public partial class Booking
    {
        public int Id { get; set; }
        public string? CustomerName { get; set; }
        public string? ServicesName { get; set; }
        public string? Status { get; set; }
        public int? AccountId { get; set; }
        public int? SlotId { get; set; }
        public int? ServiceId { get; set; }
        public decimal? TotalPrice { get; set; }

        public virtual Account? Account { get; set; }
        public virtual Daservice? Service { get; set; }
        public virtual Slot? Slot { get; set; }
    }
}
