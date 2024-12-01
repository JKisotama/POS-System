using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_BAL.Helper
{
    public class PageResult<T>
    {
        public IEnumerable<T> Items { get; set; }
        public int TotalCount { get; set; }
        public PageResult(IEnumerable<T> items, int totalCount) 
        { 
            Items = items;
            TotalCount = totalCount;
        }
    }
}
