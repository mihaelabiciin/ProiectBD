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

    public virtual DbSet<Tblactivitati> Tblactivitatis { get; set; }

    public virtual DbSet<Tblcamere> Tblcameres { get; set; }

    public virtual DbSet<Tblhoteluri> Tblhoteluris { get; set; }

    public virtual DbSet<Tbllocatii> Tbllocatiis { get; set; }

    public virtual DbSet<Tblrestaurante> Tblrestaurantes { get; set; }

    public virtual DbSet<Tbluser> Tblusers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;database=litoral;uid=root;pwd=Paroladeacces1!", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.33-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Tblactivitati>(entity =>
        {
            entity.HasKey(e => e.IdActivitate).HasName("PRIMARY");

            entity.ToTable("tblactivitati");

            entity.HasIndex(e => e.IdLocatie, "fk_tblActivitati_tblLocatii");

            entity.Property(e => e.IdActivitate).HasColumnName("idActivitate");
            entity.Property(e => e.Antrenor).HasColumnName("antrenor");
            entity.Property(e => e.Contact)
                .HasMaxLength(10)
                .HasColumnName("contact");
            entity.Property(e => e.IdLocatie).HasColumnName("idLocatie");
            entity.Property(e => e.Nume)
                .HasMaxLength(45)
                .HasColumnName("nume");
            entity.Property(e => e.Pret).HasColumnName("pret");

            entity.HasOne(d => d.IdLocatieNavigation).WithMany(p => p.Tblactivitatis)
                .HasForeignKey(d => d.IdLocatie)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fk_tblActivitati_tblLocatii");
        });

        modelBuilder.Entity<Tblcamere>(entity =>
        {
            entity.HasKey(e => e.IdCamera).HasName("PRIMARY");

            entity.ToTable("tblcamere");

            entity.HasIndex(e => e.IdHotel, "fk_tblCamere_tblHoteluri");

            entity.Property(e => e.IdCamera).HasColumnName("idCamera");
            entity.Property(e => e.AerConditionat).HasColumnName("aerConditionat");
            entity.Property(e => e.Balcon).HasColumnName("balcon");
            entity.Property(e => e.Frigider).HasColumnName("frigider");
            entity.Property(e => e.IdHotel).HasColumnName("idHotel");
            entity.Property(e => e.Pret).HasColumnName("pret");
            entity.Property(e => e.Tip)
                .HasMaxLength(50)
                .HasDefaultValueSql("'Single'")
                .HasColumnName("tip");
            entity.Property(e => e.WiFi).HasColumnName("wiFi");

            entity.HasOne(d => d.IdHotelNavigation).WithMany(p => p.Tblcameres)
                .HasForeignKey(d => d.IdHotel)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fk_tblCamere_tblHoteluri");
        });

        modelBuilder.Entity<Tblhoteluri>(entity =>
        {
            entity.HasKey(e => e.IdHotel).HasName("PRIMARY");

            entity.ToTable("tblhoteluri");

            entity.HasIndex(e => e.IdLocatie, "fk_tblHoteluri_tblLocatii");

            entity.Property(e => e.IdHotel).HasColumnName("idHotel");
            entity.Property(e => e.Adresa)
                .HasMaxLength(100)
                .HasColumnName("adresa");
            entity.Property(e => e.Contact)
                .HasMaxLength(10)
                .HasColumnName("contact");
            entity.Property(e => e.IdLocatie).HasColumnName("idLocatie");
            entity.Property(e => e.MicDejun).HasColumnName("micDejun");
            entity.Property(e => e.NotaRecenzieHotel).HasColumnName("notaRecenzieHotel");
            entity.Property(e => e.NumarStele).HasColumnName("numarStele");
            entity.Property(e => e.Nume)
                .HasMaxLength(45)
                .HasColumnName("nume");
            entity.Property(e => e.PretMicDejun).HasColumnName("pretMicDejun");

            entity.HasOne(d => d.IdLocatieNavigation).WithMany(p => p.Tblhoteluris)
                .HasForeignKey(d => d.IdLocatie)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fk_tblHoteluri_tblLocatii");
        });

        modelBuilder.Entity<Tbllocatii>(entity =>
        {
            entity.HasKey(e => e.IdLocatie).HasName("PRIMARY");

            entity.ToTable("tbllocatii");

            entity.Property(e => e.IdLocatie).HasColumnName("idLocatie");
            entity.Property(e => e.Descriere)
                .HasMaxLength(1000)
                .HasColumnName("descriere");
            entity.Property(e => e.Nume)
                .HasMaxLength(45)
                .HasColumnName("nume");
        });

        modelBuilder.Entity<Tblrestaurante>(entity =>
        {
            entity.HasKey(e => e.IdRestaurant).HasName("PRIMARY");

            entity.ToTable("tblrestaurante");

            entity.HasIndex(e => e.IdLocatie, "fk_tblRestaurante_tblLocatii");

            entity.Property(e => e.IdRestaurant).HasColumnName("idRestaurant");
            entity.Property(e => e.Adresa)
                .HasMaxLength(100)
                .HasColumnName("adresa");
            entity.Property(e => e.Contact)
                .HasMaxLength(10)
                .HasColumnName("contact");
            entity.Property(e => e.IdLocatie).HasColumnName("idLocatie");
            entity.Property(e => e.NotaRecenzie).HasColumnName("notaRecenzie");
            entity.Property(e => e.Nume)
                .HasMaxLength(45)
                .HasColumnName("nume");
            entity.Property(e => e.SpecificRestaurant)
                .HasMaxLength(50)
                .HasDefaultValueSql("'Nespecificat'")
                .HasColumnName("specificRestaurant");

            entity.HasOne(d => d.IdLocatieNavigation).WithMany(p => p.Tblrestaurantes)
                .HasForeignKey(d => d.IdLocatie)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fk_tblRestaurante_tblLocatii");
        });

        modelBuilder.Entity<Tbluser>(entity =>
        {
            entity.HasKey(e => e.IdUser).HasName("PRIMARY");

            entity.ToTable("tblusers");

            entity.Property(e => e.IdUser).HasColumnName("idUser");
            entity.Property(e => e.Email)
                .HasMaxLength(45)
                .HasColumnName("email");
            entity.Property(e => e.IsAdmin).HasColumnName("isAdmin");
            entity.Property(e => e.Password)
                .HasMaxLength(45)
                .HasColumnName("password");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
