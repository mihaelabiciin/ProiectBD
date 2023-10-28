using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Tblrestaurante
{
    public ushort Id { get; set; }

    public string Nume { get; set; } = null!;

    public float? NotaRecenzie { get; set; }

    public string Adresa { get; set; } = null!;

    public string? Contact { get; set; }

    public string? SpecificRestaurant { get; set; }

    public ushort? IdLocatie { get; set; }

    public virtual Tbllocatii? IdLocatieNavigation { get; set; }
}
