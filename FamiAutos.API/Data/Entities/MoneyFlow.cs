using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using FamiAutos.API.Data.Enums;

namespace FamiAutos.API.Data.Entities;

public class MoneyFlow
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public string Description { get; set; } = string.Empty;
    public EAccountingType FlowType { get; set; }
    public double Value { get; set; }
}