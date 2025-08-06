using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using Apex_IT.Authorization.Users;
using Apex_IT.CRUDAppServices.ConditionReportService.Dto;
using Apex_IT.CRUDAppServices.EmployeeService.Dto;
using Apex_IT.EmailService;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Apex_IT.CRUDAppServices.EmployeeService
{
    public class EmployeeAppService : AsyncCrudAppService<User, EmployeeDto, long>
    {
        private readonly UserManager _userManager;
        private readonly IRepository<User, long> _employeeRepository;
        private readonly ISendGridEmailService _sendGridEmailService;

        public EmployeeAppService(IRepository<User, long> repository, UserManager userManager, IRepository<User, long> employeeRepository, ISendGridEmailService sendGridEmailService) : base(repository)
        {
            _userManager = userManager;
            _employeeRepository = employeeRepository;
            _sendGridEmailService = sendGridEmailService;
        }

        public override async Task<EmployeeDto> CreateAsync(EmployeeDto input)
        {
            if (input == null)
                throw new ArgumentNullException(nameof(input));

            if (string.IsNullOrWhiteSpace(input.Password) ||
                input.Password.Length < 6 ||
                !input.Password.Any(char.IsUpper) ||
                !input.Password.Any(ch => !char.IsLetterOrDigit(ch)))
                throw new UserFriendlyException("Password must be at least 6 characters long, have a special character and one uppercase character");

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

                await _userManager.AddToRoleAsync(employee, "Employee");

                await _sendGridEmailService.SendEmailAsync(
                    input.EmailAddress,
                    "Welcome to Apex IT",
                  $@"
                    <p>You have been registered successfully.</p>
                    <p>Here are your credentials:</p>
                    <ul>
                      <li><strong>Username:</strong> {input.UserName}</li>
                      <li><strong>Email:</strong> {input.EmailAddress}</li>
                      <li><strong>Password:</strong> {input.Password}</li>
                    </ul>
                    <p><strong>Note:</strong> Update this for your own safety.</p>"
                );
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
