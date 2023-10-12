using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models;

public partial class LitoralContext : DbContext
{
    public LitoralContext()
    {
    }

    public LitoralContext(DbContextOptions<LitoralContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Hoteluri> Hoteluri { get; set; }

    public virtual DbSet<Locatii> Locatii { get; set; }

    public virtual DbSet<Restaurante> Restaurante { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;database=litoral;uid=root;pwd=Paroladeacces1!", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.33-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Hoteluri>(entity =>
        {
            entity.HasKey(e => e.Idhotel).HasName("PRIMARY");

            entity.ToTable("hoteluri");

            entity.HasIndex(e => e.Idlocatie, "fk_hoteluri_locatii_idx");

            entity.Property(e => e.Idhotel).HasColumnName("idhotel");
            entity.Property(e => e.Adresa)
                .HasMaxLength(100)
                .HasColumnName("adresa");
            entity.Property(e => e.Hoteluricol)
                .HasMaxLength(45)
                .HasColumnName("hoteluricol");
            entity.Property(e => e.Idlocatie).HasColumnName("idlocatie");
            entity.Property(e => e.NrStele).HasColumnName("nr_stele");
            entity.Property(e => e.NumeHotel)
                .HasMaxLength(45)
                .HasColumnName("nume_hotel");
            entity.Property(e => e.Scorh).HasColumnName("scorh");

            entity.HasOne(d => d.IdlocatieNavigation).WithMany(p => p.Hoteluris)
                .HasForeignKey(d => d.Idlocatie)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fk_hoteluri_locatii");
        });

        modelBuilder.Entity<Locatii>(entity =>
        {
            entity.HasKey(e => e.IdLocatie).HasName("PRIMARY");

            entity.ToTable("locatii");

            entity.Property(e => e.IdLocatie).HasColumnName("idLocatie");
            entity.Property(e => e.NumeLocatie)
                .HasMaxLength(45)
                .HasColumnName("nume_locatie");
            entity.Property(e => e.ScorL).HasColumnName("scorL");
        });

        modelBuilder.Entity<Restaurante>(entity =>
        {
            entity.HasKey(e => e.Idrestaurant).HasName("PRIMARY");

            entity.ToTable("restaurante");

            entity.HasIndex(e => e.Idlocatie, "fk_restaurante_locatii_idx");

            entity.Property(e => e.Idrestaurant).HasColumnName("idrestaurant");
            entity.Property(e => e.Adresar)
                .HasMaxLength(45)
                .HasColumnName("adresar");
            entity.Property(e => e.Idlocatie).HasColumnName("idlocatie");
            entity.Property(e => e.NumeRestaurant)
                .HasMaxLength(45)
                .HasColumnName("nume_restaurant");
            entity.Property(e => e.Scorr).HasColumnName("scorr");

            entity.HasOne(d => d.IdlocatieNavigation).WithMany(p => p.Restaurantes)
                .HasForeignKey(d => d.Idlocatie)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fk_restaurante_locatii");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
