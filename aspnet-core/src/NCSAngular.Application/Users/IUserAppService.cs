using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using NCSAngular.Roles.Dto;
using NCSAngular.Users.Dto;

namespace NCSAngular.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserDto, long, PagedResultRequestDto, CreateUserDto, UserDto>
    {
        Task<ListResultDto<RoleDto>> GetRoles();
    }
}