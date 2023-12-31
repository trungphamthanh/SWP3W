﻿using System;
using System.Collections.Generic;

namespace BusinessObj.Model
{
    public partial class Booking
    {
        public Booking()
        {
            BookingDetails = new HashSet<BookingDetail>();
        }

        public int Id { get; set; }
        public string? CustomerName { get; set; }
        public string? BookingStatus { get; set; }
        public int? AccountId { get; set; }
        public int? SlotId { get; set; }

        public virtual Account? Account { get; set; }
        public virtual Slot? Slot { get; set; }
        public virtual ICollection<BookingDetail> BookingDetails { get; set; }
    }
}
