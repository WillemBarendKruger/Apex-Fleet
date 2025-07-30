using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using Apex_IT.Authorization.Users;
using Apex_IT.CRUDAppServices.SupervisorService.Dto;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Apex_IT.CRUDAppServices.SupervisorService
{
    public class SupervisorAppService : AsyncCrudAppService<User, SupervisorDto, long>
    {
        private readonly UserManager _userManager;

        public SupervisorAppService(IRepository<User, long> repository, UserManager userManager) : base(repository)
        {
            _userManager = userManager;
        }

        public override async Task<SupervisorDto> CreateAsync(SupervisorDto input)
        {
            if (input == null)
                throw new ArgumentNullException(nameof(input));

            if (string.IsNullOrWhiteSpace(input.Password) || input.Password.Length < 6)
                throw new UserFriendlyException("Password must be at least 6 characters long");

            if (!input.Password.Any(char.IsUpper) || !input.Password.Any(char.IsDigit) ||
                !input.Password.Any(ch => "!@#$%^&*()_+-=[]{}|;:,.<>?".Contains(ch)))
                throw new UserFriendlyException("Password must contain at least one uppercase letter, one digit, and one special character");

            var supervisor = ObjectMapper.Map<User>(input);
            supervisor.IsActive = true;

            try
            {
                var result = await _userManager.CreateAsync(supervisor, supervisor.Password);
                if (!result.Succeeded)
                {
                    var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                    throw new UserFriendlyException($"Failed to create user: {errors}");
                }

                await _userManager.AddToRoleAsync(supervisor, "Supervisor");
            }
            catch (Exception ex)
            {
                Logger.Error("Failed to create supervisor", ex);

                if (ex is UserFriendlyException)
                    throw;

                throw new UserFriendlyException("An error occurred while creating the supervisor", ex);
            }

            return ObjectMapper.Map<SupervisorDto>(supervisor);
        }
    }
}
