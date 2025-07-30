using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.UI;
using Apex_IT.Authorization.Users;
using Apex_IT.CRUDAppServices.EquipmentService.Dto;
using Apex_IT.Entities.Categories;
using Apex_IT.Entities.EquimentItem;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Threading.Tasks;

namespace Apex_IT.CRUDAppServices.EquipmentService
{
    //[AbpAuthorize("Supervisor")]
    public class EquipmentAppService : AsyncCrudAppService<Equipment, EquipmentDto, Guid>
    {
        private readonly IRepository<Equipment, Guid> _equipmentRepository;
        private readonly IRepository<User, long> _userRepository;
        private readonly IRepository<Category, Guid> _categoryRepository;

        public EquipmentAppService(IRepository<Equipment, Guid> equipmentRepository, IRepository<User, long> userRepository, IRepository<Category, Guid> categoryRepository) : base(equipmentRepository)
        {
            _equipmentRepository = equipmentRepository;
            _userRepository = userRepository;
            _categoryRepository = categoryRepository;
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

        public async Task<Guid> GetCategoryIdByNameAsync(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                throw new UserFriendlyException("Category name cannot be empty");
            }

            var category = await _categoryRepository.FirstOrDefaultAsync(
                c => c.Type.ToLower() == name.ToLower()
            );
  
            if (category == null)
            {
                Logger.Error($"Could not find category {name}");

                try
                {
                    // create one if it doesn't exist, try that only Supervisor can do this
                    var categoryType = new Category
                    {
                        Type = name,
                    };
                    category = categoryType;
                    category.CreatorUserId = null;
                    await _categoryRepository.InsertAsync(category);
                }
                catch(Exception)
                {
                    throw new UserFriendlyException("Failed to create category");
                }
            }
            return category.Id;
        }

        public override async Task<EquipmentDto> CreateAsync(EquipmentDto input)
        {
            var handlerId = await GetEmployeeIdByEmailAsync(input.HandlerEmail);
            input.HandlerId = handlerId;

            var catergoryId = await GetCategoryIdByNameAsync(input.CategoryName);
            input.CategoryId = catergoryId;

            return await base.CreateAsync(input);
        }

        public override async Task<EquipmentDto> UpdateAsync(EquipmentDto input)
        {
            var handlerId = await GetEmployeeIdByEmailAsync(input.HandlerEmail);
            input.HandlerId = handlerId;

            var catergoryId = await GetCategoryIdByNameAsync(input.CategoryName);
            input.CategoryId = catergoryId;

            return await base.UpdateAsync(input);
        }
    }
}
