using Abp.Domain.Entities.Auditing;
using Apex_IT.Authorization.Users;
using Apex_IT.Entities.EquimentItem;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Apex_IT.Entities.Reports
{
    public class ConditionReport : FullAuditedEntity<Guid>
    {
        public virtual string Description { get; set; }
        public virtual string Status { get; set; }

        public virtual Guid EquipmentId { get; set; }
        [ForeignKey("EquipmentId")]
        public virtual Equipment Equipment { get; set; }

        public virtual string ReportingEmployeeName { get; set; }

        public virtual long ReportingEmployeeId { get; set; }
        [ForeignKey("ReportingEmployeeId")]
        public virtual User ReportingEmployee { get; set; }
    }
}
