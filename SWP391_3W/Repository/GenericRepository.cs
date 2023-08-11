using BusinessObj.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly DASContext _context = null;
        protected readonly DbSet<T> _db = null;
        public void Add(T entity)
        {
            _db.Add(entity);
        }
        public GenericRepository(DASContext context)
        {
            _context = context;
            _db = _context.Set<T>();
        }
        public GenericRepository()
        {
            _context = new DASContext();
            _db = _context.Set<T>();
        }
        public void Delete(object id)
        {
            T exist = _db.Find(id);
            if (exist != null)
            {
                _db.Remove(exist);
            }
        }

        public IEnumerable<T> GetAll()
        {
            return _db.ToList();
        }

        public T GetByID(object id)
        {
            return _db.Find(id);
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        public void Update(T entity)
        {
            _db.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }
    }
}
