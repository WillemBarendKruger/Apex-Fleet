using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Apex_IT.Entities.Reports;
using System;

namespace Apex_IT.CRUDAppServices.ConditionReportService.Dto
{
    [AutoMap(typeof(ConditionReport))]
    public class ConditionReportDto : EntityDto<Guid>
    {
        public virtual string Description { get; set; }
        public virtual string Status { get; set; }

        public virtual string EquipmentName { get; set; }

        public virtual Guid EquipmentId { get; set; }

        public virtual string ReportingEmployeeName { get; set; }

        public virtual string ReportingEmployeeEmail { get; set; }

        public virtual long ReportingEmployeeId { get; set; }
    }
}
