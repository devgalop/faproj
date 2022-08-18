using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FamiAutos.API.Data.Entities;

public class BillDetail
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public double UnitPrice { get; set; }
    public int Quantity { get; set; }
    public double SubTotal { get; set; }
    public int BillId { get; set; }
    public Bill Bill { get; set; } = null!;
}