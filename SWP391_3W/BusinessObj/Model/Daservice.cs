﻿using System;
using System.Collections.Generic;

namespace BusinessObj.Model
{
    public partial class Daservice
    {
        public Daservice()
        {
            BookingDetails = new HashSet<BookingDetail>();
        }

        public int Id { get; set; }
        public string? ServiceName { get; set; }
        public string? Intro { get; set; }
        public string? Contents { get; set; }
        public string? Outro { get; set; }
        public decimal? LowPrice { get; set; }
        public decimal? AdvancedPrice { get; set; }
        public decimal? TopPrice { get; set; }
        public string? ImgUrl { get; set; }
        public int? AccountId { get; set; }

        public virtual Account? Account { get; set; }
        public virtual ICollection<BookingDetail> BookingDetails { get; set; }
    }
}
