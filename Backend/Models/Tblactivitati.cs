using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Tblactivitati
{
    public ushort Id { get; set; }

    public string Nume { get; set; } = null!;

    public float Pret { get; set; }

    public bool? Antrenor { get; set; }

    public string? Contact { get; set; }

    public ushort? IdLocatie { get; set; }

    public virtual Tbllocatii? IdLocatieNavigation { get; set; }
}
