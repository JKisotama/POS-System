using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_BAL.Helper
{
    public class PagingParameters
    {
        public int PageNumber { get; set; } = 1; 
        public int PageSize { get; set; } = 10;
    }
}
