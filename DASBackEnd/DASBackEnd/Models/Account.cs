using System.ComponentModel.DataAnnotations;

namespace DASBackEnd.Models
{
    public class Account
    {
        [Key]
        public int ID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int userId { get; set; }
        public int roleId { get; set; }
        public string workingStatus { get; set; }
        public string accountStatus { get; set; }
    }
}
