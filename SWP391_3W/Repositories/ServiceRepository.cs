using BusinessObj.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class ServiceRepository : GenericRepository<Daservice>, IServiceRepository
    {
        public IEnumerable<Daservice> FindServiceByName(string name)
        {
            return _context.Daservices.Where(s => s.ServiceName.Contains(name)).ToList();
        }
    }
}
