using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Apex_IT.Entities.Categories;
using System;

namespace Apex_IT.CRUDAppServices.CategoryService.Dto
{
    [AutoMap(typeof(Category))]
    public class CategoryDto : EntityDto<Guid>
    {
        public virtual string Type { get; set; }
    }
}
