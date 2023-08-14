using System;
using System.Collections.Generic;

namespace BusinessObj.Model
{
    public partial class Daservice
    {
        public Daservice()
        {
            Bookings = new HashSet<Booking>();
        }

        public int Id { get; set; }
        public string? ServiceName { get; set; }
        public string? Descriptions { get; set; }
        public decimal? Price { get; set; }
        public string? ImgUrl { get; set; }
        public int? AccountId { get; set; }

        public virtual Account? Account { get; set; }
        public virtual ICollection<Booking> Bookings { get; set; }
    }
}
