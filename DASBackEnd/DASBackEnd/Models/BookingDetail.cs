using System;
using System.Collections.Generic;

namespace DASBackEnd.Models;

public partial class BookingDetail
{
    public int Id { get; set; }

    public int? BookingId { get; set; }

    public int? ServiceId { get; set; }

    public virtual Booking? Booking { get; set; }

    public virtual Daservice? Service { get; set; }
}
