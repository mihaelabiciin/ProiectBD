using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Tbllocatii
{
    public ushort IdLocatie { get; set; }

    public string Nume { get; set; } = null!;

    public string? Descriere { get; set; }

    public virtual ICollection<Tblactivitati> Tblactivitatis { get; set; } = new List<Tblactivitati>();

    public virtual ICollection<Tblhoteluri> Tblhoteluris { get; set; } = new List<Tblhoteluri>();

    public virtual ICollection<Tblrestaurante> Tblrestaurantes { get; set; } = new List<Tblrestaurante>();
}
