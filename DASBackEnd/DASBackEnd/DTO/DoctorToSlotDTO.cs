namespace DASBackEnd.DTO
{
    public class DoctorToSlotDTO
    {
        public int ID { get; set; }
        public string slotStart { get; set; }
        public string slotEnd { get; set; }
        public string slotStatus { get; set; }
        public DateTime date { get; set; }
        public int accountId { get; set; }
    }
}
