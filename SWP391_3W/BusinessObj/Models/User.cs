﻿using System;
using System.Collections.Generic;

namespace BusinessObj.Models
{
    public partial class User
    {
        public User()
        {
            Accounts = new HashSet<Account>();
        }

        public int Id { get; set; }
        public string? Name { get; set; }
        public string? PhoneNum { get; set; }
        public string? Gender { get; set; }

        public virtual ICollection<Account> Accounts { get; set; }
    }
}