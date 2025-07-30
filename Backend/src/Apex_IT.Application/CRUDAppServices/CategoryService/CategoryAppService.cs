using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Apex_IT.CRUDAppServices.CategoryService.Dto;
using Apex_IT.Entities.Categories;
using System;

namespace Apex_IT.CRUDAppServices.CategoryService
{
    //[AbpAuthorize("Supervisor")]
    public class CategoryAppService : AsyncCrudAppService<Category, CategoryDto, Guid>
    {
        public CategoryAppService(IRepository<Category, Guid> repository) : base(repository)
        {
        }
    }
}
