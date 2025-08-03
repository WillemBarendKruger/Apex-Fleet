using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using Apex_IT.Authorization.Users;
using Apex_IT.CRUDAppServices.ConditionReportService.Dto;
using Apex_IT.CRUDAppServices.RequestingService.Dto;
using Apex_IT.Entities.EquimentItem;
using Apex_IT.Entities.Reports;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Apex_IT.CRUDAppServices.ConditionReportService
{
    public class ConditionReportAppService : AsyncCrudAppService<ConditionReport, ConditionReportDto, Guid>
    {
        private readonly IRepository<Equipment, Guid> _equipmentRepository;
        private readonly IRepository<User, long> _userRepository;
        private readonly IRepository<ConditionReport, Guid> _reportsRepository;

        public ConditionReportAppService(IRepository<ConditionReport, Guid> repository, IRepository<Equipment, Guid> equipmentRepository, IRepository<User, long> userrepository) : base(repository)
        {
            _equipmentRepository = equipmentRepository;
            _userRepository = userrepository;
            _reportsRepository = repository;
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
            var employeeId = await GetEmployeeIdByEmailAsync(input.ReportingEmployeeEmail);
            input.ReportingEmployeeId = employeeId;

            // Set the employee name for consistency with the entity design
            var employee = await _userRepository.GetAsync(employeeId);
            input.ReportingEmployeeName = $"{employee.Name} {employee.Surname}";

            var equipmentId = await GetEquipmentIdByNameAsync(input.EquipmentName);
            input.EquipmentId = equipmentId;

            return await base.CreateAsync(input);
        }

        public override async Task<PagedResultDto<ConditionReportDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
        {
            var query = _reportsRepository.GetAllIncluding(eq => eq.Equipment, emp => emp.ReportingEmployee);
            
            var totalCount = await query.CountAsync();
            var requests = await query
                    .Skip(input.SkipCount)
                    .Take(input.MaxResultCount)
                    .ToListAsync();
            
            var conditionReports = ObjectMapper.Map<List<ConditionReportDto>>(requests);
            
                return new PagedResultDto<ConditionReportDto>(totalCount, conditionReports);
        }
    }
}
