using System;
using System.Collections.Generic;

namespace BusinessObj.Models
{
    public partial class Account
    {
        public Account()
        {
            Bookings = new HashSet<Booking>();
            Slots = new HashSet<Slot>();
        }

        public int Id { get; set; }
        public int? UserId { get; set; }
        public string? Role { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public int? RoleId { get; set; }

        public virtual User? User { get; set; }
        public virtual ICollection<Booking> Bookings { get; set; }
        public virtual ICollection<Slot> Slots { get; set; }
    }
}
