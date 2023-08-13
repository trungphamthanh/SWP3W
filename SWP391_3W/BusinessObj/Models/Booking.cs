using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BusinessObj.Models
{
    public partial class Booking
    {
        public Booking()
        {
            BookDetails = new HashSet<BookDetail>();
        }

        public int Id { get; set; }
        public string? CustomerName { get; set; }
        public string? ServicesName { get; set; }
        public string? Status { get; set; }
        public int? AccountId { get; set; }
        [Display(Name = "Slot ID")]
        public int? SlotId { get; set; }

        public virtual Account? Account { get; set; }
        public virtual Slot? Slot { get; set; }
        public virtual ICollection<BookDetail> BookDetails { get; set; }
    }
}
