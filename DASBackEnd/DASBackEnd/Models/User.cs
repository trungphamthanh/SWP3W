using System;
using System.Collections.Generic;

namespace DASBackEnd.Models;

public partial class User
{
    public int Id { get; set; }

    public string? UserName { get; set; }

    public string? PhoneNum { get; set; }

    public string? Gender { get; set; }

    public string? Information { get; set; }

    public string? Descriptions { get; set; }

    public virtual ICollection<Account> Accounts { get; } = new List<Account>();
}
