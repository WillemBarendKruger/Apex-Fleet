using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using Apex_IT.Authorization.Users;
using Apex_IT.CRUDAppServices.ConditionReportService.Dto;
using Apex_IT.Entities.EquimentItem;
using Apex_IT.Entities.Reports;
using System;
using System.Threading.Tasks;

namespace Apex_IT.CRUDAppServices.ConditionReportService
{
    public class ConditionReportAppService : AsyncCrudAppService<ConditionReport, ConditionReportDto, Guid>
    {
        private readonly IRepository<Equipment, Guid> _equipmentRepository;
        private readonly IRepository<User, long> _userRepository;

        public ConditionReportAppService(IRepository<ConditionReport, Guid> repository, IRepository<Equipment, Guid> equipmentRepository, IRepository<User, long> userrepository) : base(repository)
        {
            _equipmentRepository = equipmentRepository;
            _userRepository = userrepository;
        }

        public async Task<Guid> GetEquipmentIdByNameAsync(string name)
        {
            var equipment = await _equipmentRepository.FirstOrDefaultAsync(
               e => e.Name.ToLower() == name.ToLower()
           );

            if (equipment == null)
            {
                Logger.Error($"Equipment with name '{name}' not found.");
                throw new UserFriendlyException("Equipment not found");
            }

            return equipment.Id;
        }

        public async Task<long> GetEmployeeIdByEmailAsync(string email)
        {
            var employee = await _userRepository.FirstOrDefaultAsync(
               e => e.EmailAddress.ToLower() == email.ToLower()
           );

            if (employee == null)
            {
                Logger.Error($"Employee with email '{email}' not found.");
                throw new UserFriendlyException("Employee not found");
            }

            return employee.Id;
        }

        public override async Task<ConditionReportDto> CreateAsync(ConditionReportDto input)
        {
            var EmployeeId = await GetEmployeeIdByEmailAsync(input.ReportingEmployeeEmail);
            input.ReportingEmployeeId = EmployeeId;

            var equipmentId = await GetEquipmentIdByNameAsync(input.EquipmentName);
            input.EquipmentId = equipmentId;

            return await base.CreateAsync(input);
        }
    }
}
