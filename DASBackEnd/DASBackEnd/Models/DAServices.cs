using System.ComponentModel.DataAnnotations;

namespace DASBackEnd.Models
{
    public class DAServices
    {
        [Key]
        public int ID { get; set; }
        public string ServiceName { get; set; }
        public string Description { get; set; }
        public  decimal Price { get; set; }
        public int accountId { get; set; }
    }
}
