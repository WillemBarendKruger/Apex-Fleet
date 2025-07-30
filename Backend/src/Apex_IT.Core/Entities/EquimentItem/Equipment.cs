using Abp.Domain.Entities.Auditing;
using Apex_IT.Authorization.Users;
using Apex_IT.Entities.Categories;
using Apex_IT.Entities.Employees;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Apex_IT.Entities.EquimentItem
{
    public class Equipment : FullAuditedEntity<Guid>
    {
        public virtual string Name { get; set; }
        public virtual string SerialNumber { get; set; }
        public virtual int MaintanacePeriod { get; set; }
        public virtual string Status { get; set; }

        public virtual Guid CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public virtual Category Category { get; set; }

        public virtual long HandlerId { get; set; }
        [ForeignKey("HandlerId")]
        public virtual User Handler { get; set; }
    }
}
