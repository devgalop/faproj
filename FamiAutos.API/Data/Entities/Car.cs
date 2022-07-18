using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FamiAutos.API.Data.Entities;

public class Car
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Plaque { get; set; } = string.Empty;
    public int Model { get; set; }
    public string Brand { get; set; } = string.Empty;
    public int OwnerId { get; set; }
    public Customer Owner { get; set; } = null!;
    public List<Reparation> Revisions { get; set; } = null!;
}