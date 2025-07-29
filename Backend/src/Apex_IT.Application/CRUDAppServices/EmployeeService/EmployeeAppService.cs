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
public override async Task<EmployeeDto> CreateAsync(EmployeeDto input)
{
    if (input == null)
        throw new ArgumentNullException(nameof(input));

    if (string.IsNullOrWhiteSpace(input.Password) || input.Password.Length < 6)
        throw new UserFriendlyException("Password must be at least 6 characters long");

    var employee = ObjectMapper.Map<User>(input);
    employee.IsActive = true;

    try
    {
        var result = await _userManager.CreateAsync(employee, employee.Password);
        if (!result.Succeeded)

        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            throw new UserFriendlyException($"Failed to create user: {errors}");
        }

        await _userManager.AddToRoleAsync(employee, input.RoleName);
    }
    catch (Exception ex)
    {
        Logger.Error("Failed to create employee", ex);

        if (ex is UserFriendlyException)
            throw;

        throw new UserFriendlyException("An error occurred while creating the employee", ex);
    }

    return ObjectMapper.Map<EmployeeDto>(employee);
}
    }
}
