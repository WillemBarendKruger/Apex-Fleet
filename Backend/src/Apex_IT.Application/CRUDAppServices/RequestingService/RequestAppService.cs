using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using Apex_IT.Authorization.Users;
using Apex_IT.CRUDAppServices.RequestingService.Dto;
using Apex_IT.Entities.AccessRequests;
using Apex_IT.Entities.EquimentItem;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Apex_IT.CRUDAppServices.RequestingService
{
    public class RequestAppService : AsyncCrudAppService<AccessRequest, RequestDto, Guid>
    {
        private readonly IRepository<User, long> _userRepository;
        private readonly IRepository<Equipment, Guid> _equipmentRepository;
        private readonly IRepository<AccessRequest, Guid> _requestRepository;

        public RequestAppService(IRepository<AccessRequest, Guid> repository, IRepository<User, long> userRepository, IRepository<Equipment, Guid> equipmentRepository, IRepository<AccessRequest, Guid> requestRepository) : base(repository)
        {
            _userRepository = userRepository;
            _equipmentRepository = equipmentRepository;
            _requestRepository = requestRepository;
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

        public override async Task<RequestDto> CreateAsync(RequestDto input)
        {
            var EmployeeId = await GetEmployeeIdByEmailAsync(input.RequestingEmployeeEmail);
            input.RequestingEmployeeId = EmployeeId;

            var equipmentId = await GetEquipmentIdByNameAsync(input.EquipmentName);
            input.EquipmentId = equipmentId;

            return await base.CreateAsync(input);
        }

        public override async Task<PagedResultDto<RequestDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
        {
            var query = _requestRepository.GetAllIncluding(eq => eq.Equipment);

            var totalCount = await query.CountAsync();
            var requests = await query
                    .Skip(input.SkipCount)
                    .Take(input.MaxResultCount)
                    .ToListAsync();

            var requestDtos = ObjectMapper.Map<List<RequestDto>>(requests);

            return new PagedResultDto<RequestDto>(totalCount, requestDtos);
        }
    }
}
