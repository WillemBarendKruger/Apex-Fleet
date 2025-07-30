using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Apex_IT.Entities.Categories
{
    public class Category : FullAuditedEntity<Guid>
    {
        public virtual string Type { get; set; }
    }
}
