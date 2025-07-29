using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Apex_IT.Authorization.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Apex_IT.CRUDAppServices.EmployeeService.Dto
{
    [AutoMap(typeof(User))]
    public class EmployeeDto : EntityDto<long>
    {
        [Required]
        public virtual string UserName { get; set; }

        [Required]
        [EmailAddress]
        public virtual string EmailAddress { get; set; }

        [Required]
        public virtual string Password { get; set; }

        [Required]
        public virtual string Name { get; set; }

        [Required]
        public virtual string Surname { get; set; }

        [Required]
        public virtual string RoleName { get; set; }
    }
}
