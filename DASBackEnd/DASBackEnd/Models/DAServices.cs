using System.ComponentModel.DataAnnotations;

namespace DASBackEnd.Models
{
    public class DAServices
    {
        [Key]
        public int ID { get; set; }
        public string ServiceName { get; set; }
        public string? Intro { get; set; }
        public string? Contents { get; set; }
        public string? Outro { get; set; }
        public string? imgUrl { get; set; }
        public  decimal? lowPrice { get; set; }
        public decimal? advencedPrice { get; set; }
        public decimal? topPrice { get; set; }
        public int accountId { get; set; }
    }
}
