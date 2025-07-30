using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Apex_IT.Entities.EquimentItem;
using System;

namespace Apex_IT.CRUDAppServices.EquipmentService.Dto
{
    [AutoMap(typeof(Equipment))]
    public class EquipmentDto : EntityDto<Guid>
    {
        public virtual string Name { get; set; }
        public virtual string SerialNumber { get; set; }
        public virtual int MaintenancePeriod { get; set; }
        public virtual string Status { get; set; }

        public virtual Guid CategoryId { get; set; }
        public virtual string CategoryName { get; set; }

        public virtual long? HandlerId { get; set; }
        public virtual string HandlerEmail { get; set; }
    }
}
