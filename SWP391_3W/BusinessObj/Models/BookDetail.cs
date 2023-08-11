using System;
using System.Collections.Generic;

namespace BusinessObj.Models
{
    public partial class BookDetail
    {
        public int Id { get; set; }
        public int? BookingId { get; set; }
        public int? ServiceId { get; set; }
        public decimal? AmountServices { get; set; }

        public virtual Booking? Booking { get; set; }
        public virtual Daservice? Service { get; set; }
    }
}
