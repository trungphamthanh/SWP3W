using System;
using System.Collections.Generic;

namespace DASBackEnd.Models;

public partial class Booking
{
    public int Id { get; set; }

    public string? CustomerName { get; set; }

    public string? BookingStatus { get; set; }

    public int? AccountId { get; set; }

    public int? SlotId { get; set; }

    public virtual Account? Account { get; set; }

    public virtual ICollection<BookingDetail> BookingDetails { get; } = new List<BookingDetail>();

    public virtual Slot? Slot { get; set; }
}
