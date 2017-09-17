using System.Threading.Tasks;
using Abp.Application.Services;
using NCSAngular.Authorization.Accounts.Dto;

namespace NCSAngular.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
