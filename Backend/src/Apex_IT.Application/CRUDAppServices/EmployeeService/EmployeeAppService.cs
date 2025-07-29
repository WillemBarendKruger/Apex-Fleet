using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.Json;
using Abp.UI;
using Apex_IT.Authorization.Users;
using Apex_IT.CRUDAppServices.EmployeeService.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Apex_IT.CRUDAppServices.EmployeeService
{
    public class EmployeeAppService : AsyncCrudAppService<User, EmployeeDto, long>
    {
        private readonly UserManager _userManager;

        public EmployeeAppService(IRepository<User, long> repository, UserManager userManager) : base(repository)
        {
            _userManager = userManager;
        }

        public override async Task<EmployeeDto> CreateAsync(EmployeeDto input)
        {
            var employee = ObjectMapper.Map<User>(input);
            employee.IsActive = true;

            try
            {
                await _userManager.CreateAsync(employee, employee.Password);
                await _userManager.AddToRoleAsync(employee, "Employee");
            }
            catch (Exception ex)
            {
                Logger.ToJsonString();
                throw new UserFriendlyException("Something went wrong when creating an employee", ex);         
            }
            return null;
        }
    }
}
