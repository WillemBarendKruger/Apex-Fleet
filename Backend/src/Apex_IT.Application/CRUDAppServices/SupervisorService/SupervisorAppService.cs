using Abp.Application.Services;
using Abp.Domain.Repositories;
using Apex_IT.Authorization.Users;
using Apex_IT.CRUDAppServices.SupervisorService.Dto;

namespace Apex_IT.CRUDAppServices.SupervisorService
{
    public class SupervisorAppService : AsyncCrudAppService<User, SupervisorDto, long>
    {
        public SupervisorAppService(IRepository<User, long> repository) : base(repository)
        {
        }
    }
}
