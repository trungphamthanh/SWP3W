using BusinessObj.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public interface IServiceRepository
    {
        public Daservice FindServiceByName(string name);
    }
}
