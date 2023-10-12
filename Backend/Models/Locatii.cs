using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Locatii
{
    public ulong IdLocatie { get; set; }

    public string? NumeLocatie { get; set; }

    public float? ScorL { get; set; }

    public virtual ICollection<Hoteluri> Hoteluris { get; set; } = new List<Hoteluri>();

    public virtual ICollection<Restaurante> Restaurantes { get; set; } = new List<Restaurante>();
}
