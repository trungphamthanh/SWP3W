using System.ComponentModel.DataAnnotations;

namespace DASBackEnd.Models
{
    public class DAServices
    {
        [Key]
        public int ID { get; set; }
        public string ServiceName { get; set; }
        public string Descriptions { get; set; }
        public string? imgUrl { get; set; }
        public  decimal Price { get; set; }
        public int accountId { get; set; }
    }
}
