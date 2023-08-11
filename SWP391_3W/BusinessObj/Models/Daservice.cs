using System;
using System.Collections.Generic;

namespace BusinessObj.Models
{
    public partial class Daservice
    {
        public Daservice()
        {
            BookDetails = new HashSet<BookDetail>();
        }

        public int Id { get; set; }
        public string? ServiceName { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }

        public virtual ICollection<BookDetail> BookDetails { get; set; }
    }
}
