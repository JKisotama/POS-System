using Microsoft.EntityFrameworkCore;
using POS_System_DAL.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_DAL
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class, new()
    {
        private readonly OnlinePosContext _onlinePosContext;
        public GenericRepository(OnlinePosContext onlinePosContext)
        {
            _onlinePosContext = onlinePosContext;
        }


        public async Task<TEntity> AddAsync(TEntity entity)
        {
            _onlinePosContext.Add(entity);
            await _onlinePosContext.SaveChangesAsync();
            return entity;
        }

        public async Task<int> DeleteAsync(TEntity entity)
        {
            _onlinePosContext.Remove(entity);
            return await _onlinePosContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<TEntity>> GettAllAsync(Expression<Func<TEntity, bool>> predicate)
        {
            var query = _onlinePosContext.Set<TEntity>().Where(predicate); 
            return await query.ToListAsync();
        }

        public async Task<TEntity> UpdateAsync(TEntity entity)
        {
            _onlinePosContext.Update(entity);
            await _onlinePosContext.SaveChangesAsync();
            return entity;
        }

        public async Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> predicate)
        { 
            return await _onlinePosContext.Set<TEntity>().FirstOrDefaultAsync(predicate);
        }

        public async Task DeleteAsync(Expression<Func<TEntity, bool>> predicate)
        {
            var entityToDelete = await GetAsync(predicate);
            if (entityToDelete != null)
            {
                _onlinePosContext.Set<TEntity>().Remove(entityToDelete);
                await _onlinePosContext.SaveChangesAsync();

            }
        }

    }
}
