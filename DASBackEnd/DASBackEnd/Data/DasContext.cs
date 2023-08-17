using System;
using System.Collections.Generic;
using DASBackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace DASBackEnd.Data;

public partial class DasContext : DbContext
{
    public DasContext()
    {
    }

    public DasContext(DbContextOptions<DasContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<Booking> Bookings { get; set; }

    public virtual DbSet<BookingDetail> BookingDetails { get; set; }

    public virtual DbSet<Daservice> Daservices { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Slot> Slots { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=DAS");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Account__3214EC27DCBDDBC8");

            entity.ToTable("Account");

            entity.HasIndex(e => e.Username, "UQ__Account__536C85E44FA69BA5").IsUnique();

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.AccountStatus)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("accountStatus");
            entity.Property(e => e.Password)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.RoleId).HasColumnName("roleId");
            entity.Property(e => e.UserId).HasColumnName("userId");
            entity.Property(e => e.Username).HasMaxLength(100);
            entity.Property(e => e.WorkingStatus)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("workingStatus");

            entity.HasOne(d => d.Role).WithMany(p => p.Accounts)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK__Account__roleId__6754599E");

            entity.HasOne(d => d.User).WithMany(p => p.Accounts)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Account__userId__66603565");
        });

        modelBuilder.Entity<Booking>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Booking__3214EC27BC82E6AF");

            entity.ToTable("Booking");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.AccountId).HasColumnName("accountId");
            entity.Property(e => e.BookingStatus)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("bookingStatus");
            entity.Property(e => e.CustomerName).HasMaxLength(100);
            entity.Property(e => e.SlotId).HasColumnName("slotId");

            entity.HasOne(d => d.Account).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.AccountId)
                .HasConstraintName("FK__Booking__account__628FA481");

            entity.HasOne(d => d.Slot).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.SlotId)
                .HasConstraintName("FK__Booking__slotId__6383C8BA");
        });

        modelBuilder.Entity<BookingDetail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__BookingD__3214EC27A724F8ED");

            entity.ToTable("BookingDetail");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.BookingId).HasColumnName("bookingId");
            entity.Property(e => e.ServiceId).HasColumnName("serviceId");

            entity.HasOne(d => d.Booking).WithMany(p => p.BookingDetails)
                .HasForeignKey(d => d.BookingId)
                .HasConstraintName("FK__BookingDe__booki__656C112C");

            entity.HasOne(d => d.Service).WithMany(p => p.BookingDetails)
                .HasForeignKey(d => d.ServiceId)
                .HasConstraintName("FK__BookingDe__servi__6477ECF3");
        });

        modelBuilder.Entity<Daservice>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DAServic__3214EC270B8DBE98");

            entity.ToTable("DAServices");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.AccountId).HasColumnName("accountId");
            entity.Property(e => e.AdvancedPrice)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("advancedPrice");
            entity.Property(e => e.Contents).HasMaxLength(1000);
            entity.Property(e => e.ImgUrl)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("imgUrl");
            entity.Property(e => e.Intro).HasMaxLength(1000);
            entity.Property(e => e.LowPrice)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("lowPrice");
            entity.Property(e => e.Outro).HasMaxLength(1000);
            entity.Property(e => e.ServiceName).HasMaxLength(100);
            entity.Property(e => e.TopPrice)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("topPrice");

            entity.HasOne(d => d.Account).WithMany(p => p.Daservices)
                .HasForeignKey(d => d.AccountId)
                .HasConstraintName("FK__DAService__accou__619B8048");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Roles__3214EC27BF0566AC");

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
            entity.HasKey(e => e.Id).HasName("PK__Slot__3214EC273A296CAF");

            entity.ToTable("Slot");

            entity.Property(e => e.Id).HasColumnName("ID");
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
            entity.Property(e => e.SlotStatus)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("slotStatus");

            entity.HasOne(d => d.Account).WithMany(p => p.Slots)
                .HasForeignKey(d => d.AccountId)
                .HasConstraintName("FK__Slot__accountId__60A75C0F");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3214EC2720353499");

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
