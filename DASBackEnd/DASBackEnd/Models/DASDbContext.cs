using Microsoft.EntityFrameworkCore;

namespace DASBackEnd.Models
{
    public class DASDbContext : DbContext
    {
        public DASDbContext(DbContextOptions<DASDbContext> options) : base(options)
        {
        }

        public DbSet<DAServices> DAServices { get; set; }

        public DbSet<Account> Account { get; set; }

        public DbSet<Roles> Roles { get; set; }
        public DbSet<Slot> Slots { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<BookingDetail> BookingsDetail { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=SE130257\\SQLEXPRESS; Initial Catalog=DAS; User id=sa; password=123; TrustServerCertificate=True;");
        }
    }
}
