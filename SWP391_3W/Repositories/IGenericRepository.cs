using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public interface IGenericRepository<T> where T : class
    {
        T GetByID(object id);
        void Save();
        void Delete(Object id);
        void Update(T entity);
        void Add(T entity);
        IEnumerable<T> GetAll();
    }
}
