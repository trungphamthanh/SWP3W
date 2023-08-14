using System.ComponentModel.DataAnnotations;

namespace DASBackEnd.Models
{
    public class User
    {
        [Key]
        public int ID { get; set; }
        public string UserName { get; set; }
        public string PhoneNum { get; set; }
        public string Gender { get; set; }
    }
}
