using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Tblcamere
{
    public ushort IdCamera { get; set; }

    public string? Tip { get; set; }

    public float Pret { get; set; }

    public bool? AerConditionat { get; set; }

    public bool? WiFi { get; set; }

    public bool? Balcon { get; set; }

    public bool? Frigider { get; set; }

    public ushort? IdHotel { get; set; }

    public virtual Tblhoteluri? IdHotelNavigation { get; set; }
}
