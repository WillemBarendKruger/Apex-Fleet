using Abp.Application.Services;
using Abp.Domain.Repositories;
using Apex_IT.Authorization.Users;
using Apex_IT.CRUDAppServices.SupervisorService.Dto;

namespace Apex_IT.CRUDAppServices.SupervisorService
{
    public class SupervisorAppService : AsyncCrudAppService<User, SupervisorDto, long>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="SupervisorAppService"/> class for managing <see cref="User"/> entities as supervisors.
        /// </summary>
        public SupervisorAppService(IRepository<User, long> repository) : base(repository)
        {
        }
    }
}
