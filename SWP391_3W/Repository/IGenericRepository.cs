using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public interface IGenericRepository<T> where T : class
    {
        T GetByID(Object id);
        void Save();
        void Delete(object id);
        void Add(T entity);
        void Update(T entity);
        IEnumerable<T> GetAll();
    }
}
