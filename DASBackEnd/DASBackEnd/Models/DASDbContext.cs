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
        public DbSet<Slot> Slot { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<BookingDetail> BookingsDetail { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB; Initial Catalog=DAS; User id=Trung; password=145236; TrustServerCertificate=True;");
        }
    }
}
