using Abp.Application.Services;
using Apex_IT.MultiTenancy.Dto;

namespace Apex_IT.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

