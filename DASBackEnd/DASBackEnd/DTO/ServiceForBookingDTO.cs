namespace DASBackEnd.DTO
{
    public class ServiceForBookingDTO
    {
        public int serviceId { get; set; }
        public string ServiceName { get; set; }
        public decimal? lowPrice { get; set; }
        public decimal? advencedPrice { get; set; }
        public decimal? topPrice { get; set; }
    }
}
