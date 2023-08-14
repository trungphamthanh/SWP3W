using Microsoft.EntityFrameworkCore;

namespace DASBackEnd.Models
{
    public class DASDbContext : DbContext
    {
        public DASDbContext(DbContextOptions<DASDbContext> options) : base(options)
        {
        }

        public DbSet<DAServices> DAServices { get; set; }

        public DbSet<Account> Accounts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=SE130257\\SQLEXPRESS; Initial Catalog=DAS; User id=sa; password=123; TrustServerCertificate=True;");
        }
    }
}
