using System.ComponentModel.DataAnnotations;

namespace DASBackEnd.Models
{
    public class Roles
    {
        [Key]
        public int ID { get; set; }
        public string roleName { get; set; }
    }
}
