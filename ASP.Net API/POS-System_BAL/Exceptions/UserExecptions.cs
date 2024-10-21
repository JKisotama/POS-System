using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_BAL.Exceptions
{
    public class UserExecptions : Exception
    {
        public UserExecptions() : base() { }

        public UserExecptions(string message) : base(message) { }

        public UserExecptions(string message, Exception innerException) 
            : base(message, innerException) { }
    }
}
