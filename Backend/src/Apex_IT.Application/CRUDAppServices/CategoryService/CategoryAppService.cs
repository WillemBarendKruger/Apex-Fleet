using Abp.Application.Services;
using Abp.Domain.Repositories;
using Apex_IT.CRUDAppServices.CategoryService.Dto;
using Apex_IT.Entities.Categories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Apex_IT.CRUDAppServices.CategoryService
{
    public class CategoryAppService : AsyncCrudAppService<Category, CategoryDto, Guid>
    {
        public CategoryAppService(IRepository<Category, Guid> repository) : base(repository)
        {
        }
    }
}
