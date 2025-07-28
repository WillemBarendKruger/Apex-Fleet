using System.Threading.Tasks;
using Abp.Application.Services;
using Apex_IT.Sessions.Dto;

namespace Apex_IT.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
