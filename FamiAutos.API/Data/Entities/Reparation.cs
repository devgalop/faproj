using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FamiAutos.API.Data.Entities;

public class Reparation
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public int GuaranteeMonths { get; set; }
    public int CarId { get; set; }
    //public Car Car { get; set; } = null!;
}