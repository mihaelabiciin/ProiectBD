using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Hoteluri
{
    public ulong Idhotel { get; set; }

    public string? NumeHotel { get; set; }

    public int? NrStele { get; set; }

    public string? Hoteluricol { get; set; }

    public float? Scorh { get; set; }

    public string? Adresa { get; set; }

    public ulong? Idlocatie { get; set; }

    public virtual Locatii? IdlocatieNavigation { get; set; }
}
