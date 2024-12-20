using POS_System_DAL.Models;

namespace POS_System_BAL.Services.Menu;

public interface IMenuServices
{
    Task<IEnumerable<TblMenu>> GetAllMenusAsync();
    Task<TblMenu> GetMenuByIdAsync(int menuId);
}