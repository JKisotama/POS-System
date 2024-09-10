using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_DAL
{
    public interface IGenericRepository<TEntity> where TEntity : class, new()
    {
        Task<TEntity> AddAsync(TEntity entity);
        Task<int> DeleteAsync(TEntity entity);
        Task<IEnumerable<TEntity>> GettAllAsync(Expression<Func<TEntity, bool>> predicate);
        Task<TEntity> UpdateAsync(TEntity entity);
        Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> predicate);
        Task DeleteAsync(Expression<Func<TEntity, bool>> predicate);
    }
}
