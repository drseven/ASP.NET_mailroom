using System.Threading.Tasks;
using Abp.Application.Services;
using NCSAngular.Sessions.Dto;

namespace NCSAngular.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
