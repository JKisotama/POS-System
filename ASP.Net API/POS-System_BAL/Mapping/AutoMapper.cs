using AutoMapper;
using POS_System_BAL.DTOs;
using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_BAL.Mapping
{
    public class AutoMapper :Profile
    {
        public AutoMapper()
        {
            CreateMap<TblSupplier, SupplierDTO>().ReverseMap();
        }
    }
}
