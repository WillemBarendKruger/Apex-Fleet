using Abp.Domain.Entities.Auditing;
using Apex_IT.Authorization.Users;
using Apex_IT.Entities.EquimentItem;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Apex_IT.Entities.AccessRequests
{
    public class AccessRequest : FullAuditedEntity<Guid>
    {
        public virtual string Status { get; set; }
        public virtual string? Description { get; set; }
        public virtual DateTime? GetDate { get; set; }
        public virtual DateTime? ReturnDate { get; set; }

        public virtual Guid EquipmentId { get; set; }
        [ForeignKey("EquipmentId")]
        public virtual Equipment Equipment { get; set; }

        public virtual long RequestingEmployeeId { get; set; }
        [ForeignKey("RequestingEmployeeId")]
        public virtual User RequestingEmployee { get; set; }
    }
}
