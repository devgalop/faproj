using FamiAutos.API.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FamiAutos.API.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    public DbSet<Customer> Customers { get; set; } = null!;
    public DbSet<Car> Cars { get; set; } = null!;
    public DbSet<Bill> Bills { get; set; } = null!;
    public DbSet<BillDetail> BillDetails { get; set; } = null!;
    public DbSet<Reparation> Reparations { get; set; } = null!;
    public DbSet<MoneyFlow> MoneyFlows { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Car>()
            .HasIndex(t => t.Plaque)
            .IsUnique();
        
        modelBuilder.Entity<Customer>()
            .HasIndex(t => t.Email)
            .IsUnique();
    }
}