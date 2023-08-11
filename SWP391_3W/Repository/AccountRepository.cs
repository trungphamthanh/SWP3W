using BusinessObj.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class AccountRepository : GenericRepository<Account>, IAccountRepository
    {
        public Account GetAccount(string username, string password)
        {
            return _context.Accounts.FirstOrDefault(s => s.Username.Equals(username) && s.Password.Equals(password));
        }
    }
}
