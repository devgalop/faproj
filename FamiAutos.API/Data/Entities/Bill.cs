using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using FamiAutos.API.Data.Enums;

namespace FamiAutos.API.Data.Entities;

public class Bill
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime DeliverDate { get; set; }
    public DateTime ExpirationDate { get; set; }
    public EPayMethod PayMethod { get; set; }
    public double Subtotal { get; set; }
    public double IVA { get; set; }
    public double Total { get; set; }
    public double DiscountPercent { get; set; }
    public int ReparationId { get; set; }
    public List<BillDetail> Details { get; set; } = null!;
    public Reparation ReparationAssociated { get; set; } = null!;
}