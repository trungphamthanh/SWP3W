using System;
using System.Collections.Generic;

namespace DASBackEnd.Models;

public partial class Role
{
    public int Id { get; set; }

    public string? RoleName { get; set; }

    public virtual ICollection<Account> Accounts { get; } = new List<Account>();
}
