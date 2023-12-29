using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Tblhoteluri
{
    public ushort IdHotel { get; set; }

    public string Nume { get; set; } = null!;

    public short? NumarStele { get; set; }

    public float? NotaRecenzieHotel { get; set; }

    public string Adresa { get; set; } = null!;

    public string? Contact { get; set; }

    public bool? MicDejun { get; set; }

    public float? PretMicDejun { get; set; }

    public ushort? IdLocatie { get; set; }

    public virtual Tbllocatii? IdLocatieNavigation { get; set; }

    public virtual ICollection<Tblcamere> Tblcameres { get; set; } = new List<Tblcamere>();
}
