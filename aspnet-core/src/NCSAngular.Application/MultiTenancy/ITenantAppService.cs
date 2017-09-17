using Abp.Application.Services;
using Abp.Application.Services.Dto;
using NCSAngular.MultiTenancy.Dto;

namespace NCSAngular.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}
