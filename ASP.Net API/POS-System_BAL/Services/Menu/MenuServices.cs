using Microsoft.EntityFrameworkCore;
using POS_System_DAL.Data;
using POS_System_DAL.Models;

namespace POS_System_BAL.Services.Menu;

public class MenuServices : IMenuServices
{
    private readonly OnlinePosContext _onlinePosContext;

    public MenuServices(OnlinePosContext  onlinePosContext)
    {
        _onlinePosContext = onlinePosContext;
    }



    public async Task<IEnumerable<TblMenu>> GetAllMenusAsync()
    {
        return await _onlinePosContext.TblMenus.OrderBy(m => m.MenuOrder).ToListAsync();
    }


    public async Task<TblMenu> GetMenuByIdAsync(int menuId)
    {
        return await _onlinePosContext.TblMenus.FirstOrDefaultAsync(m => m.MenuId == menuId);
    }
    

}