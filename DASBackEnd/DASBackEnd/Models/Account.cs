using System;
using System.Collections.Generic;

namespace DASBackEnd.Models;

public partial class Account
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public string? Username { get; set; }

    public string? Password { get; set; }

    public int? RoleId { get; set; }

    public string? AccountStatus { get; set; }

    public string? WorkingStatus { get; set; }

    public virtual ICollection<Booking> Bookings { get; } = new List<Booking>();

    public virtual ICollection<Daservice> Daservices { get; } = new List<Daservice>();

    public virtual Role? Role { get; set; }

    public virtual ICollection<Slot> Slots { get; } = new List<Slot>();

    public virtual User? User { get; set; }
}
