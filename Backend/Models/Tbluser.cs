using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Tbluser
{
    public ushort IdUser { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public bool? IsAdmin { get; set; }
}
