using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Restaurante
{
    public ulong Idrestaurant { get; set; }

    public string? NumeRestaurant { get; set; }

    public float? Scorr { get; set; }

    public string? Adresar { get; set; }

    public ulong? Idlocatie { get; set; }

    public virtual Locatii? IdlocatieNavigation { get; set; }
}
