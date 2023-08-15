using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace BusinessObj.Models
{
    public partial class DASContext : DbContext
    {
        public DASContext()
        {
        }

        public DASContext(DbContextOptions<DASContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Accounts { get; set; } = null!;
        public virtual DbSet<Booking> Bookings { get; set; } = null!;
        public virtual DbSet<BookingDetail> BookingDetails { get; set; } = null!;
        public virtual DbSet<Daservice> Daservices { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<Slot> Slots { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(GetConnectionString());
        }
        public string GetConnectionString()
        {
            IConfiguration config = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", true, true).Build();
            return config.GetConnectionString("DefaultConn");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.ToTable("Account");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.IsActive)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("isActive");

                entity.Property(e => e.Password)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.RoleId).HasColumnName("roleId");

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.Property(e => e.Username).HasMaxLength(100);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Accounts)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK__Account__roleId__48CFD27E");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Accounts)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Account__userId__47DBAE45");
            });

            modelBuilder.Entity<Booking>(entity =>
            {
                entity.ToTable("Booking");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.AccountId).HasColumnName("accountId");

                entity.Property(e => e.CustomerName).HasMaxLength(100);

                entity.Property(e => e.SlotId).HasColumnName("slotId");

                entity.Property(e => e.Status)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.TotalPrice)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("totalPrice");

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Bookings)
                    .HasForeignKey(d => d.AccountId)
                    .HasConstraintName("FK__Booking__account__440B1D61");

                entity.HasOne(d => d.Slot)
                    .WithMany(p => p.Bookings)
                    .HasForeignKey(d => d.SlotId)
                    .HasConstraintName("FK__Booking__slotId__44FF419A");
            });

            modelBuilder.Entity<BookingDetail>(entity =>
            {
                entity.ToTable("BookingDetail");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.BookingId).HasColumnName("bookingId");

                entity.Property(e => e.ServiceId).HasColumnName("serviceId");

                entity.HasOne(d => d.Booking)
                    .WithMany(p => p.BookingDetails)
                    .HasForeignKey(d => d.BookingId)
                    .HasConstraintName("FK__BookingDe__booki__46E78A0C");

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.BookingDetails)
                    .HasForeignKey(d => d.ServiceId)
                    .HasConstraintName("FK__BookingDe__servi__45F365D3");
            });

            modelBuilder.Entity<Daservice>(entity =>
            {
                entity.ToTable("DAServices");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AccountId).HasColumnName("accountId");

                entity.Property(e => e.Descriptions).HasMaxLength(1000);

                entity.Property(e => e.ImgUrl)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("imgUrl");

                entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.ServiceName).HasMaxLength(100);

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Daservices)
                    .HasForeignKey(d => d.AccountId)
                    .HasConstraintName("FK__DAService__accou__4316F928");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.RoleName)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("roleName");
            });

            modelBuilder.Entity<Slot>(entity =>
            {
                entity.ToTable("Slot");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.AccountId).HasColumnName("accountId");

                entity.Property(e => e.Date)
                    .HasColumnType("datetime")
                    .HasColumnName("date");

                entity.Property(e => e.SlotEnd)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SlotStart)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Status)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Slots)
                    .HasForeignKey(d => d.AccountId)
                    .HasConstraintName("FK__Slot__accountId__4222D4EF");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Descriptions).HasMaxLength(100);

                entity.Property(e => e.Gender).HasMaxLength(100);

                entity.Property(e => e.Information).HasMaxLength(100);

                entity.Property(e => e.PhoneNum).HasMaxLength(100);

                entity.Property(e => e.UserName).HasMaxLength(100);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
