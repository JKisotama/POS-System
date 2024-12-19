using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace POS_System_BAL.DTOs
{
    public class UserDTO
    {
        public string? FullName { get; set; }
        public string? IdentifyString { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }
        public string? DoB { get; set; }
        public string? Email { get; set; }
        public string? Gender { get; set; }
        
    }
}
