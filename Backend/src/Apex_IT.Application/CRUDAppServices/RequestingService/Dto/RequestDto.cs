using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Apex_IT.Entities.AccessRequests;
using System;

namespace Apex_IT.CRUDAppServices.RequestingService.Dto
{
    [AutoMap(typeof(AccessRequest))]
    public class RequestDto : EntityDto<Guid>
    {
        public virtual string Status { get; set; }

        public virtual Guid EquipmentId { get; set; }
        public virtual string EquipmentName { get; set; }

        public virtual string RequestingEmployeeEmail { get; set; }
        public virtual long RequestingEmployeeId { get; set; }
    }
}
