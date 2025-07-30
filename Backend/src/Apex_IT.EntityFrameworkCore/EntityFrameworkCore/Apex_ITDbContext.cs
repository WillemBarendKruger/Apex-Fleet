using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using Apex_IT.Authorization.Roles;
using Apex_IT.Authorization.Users;
using Apex_IT.MultiTenancy;
using Apex_IT.Entities.EquimentItem;
using Apex_IT.Entities.Categories;
using Apex_IT.Entities.AccessRequests;

namespace Apex_IT.EntityFrameworkCore
{
    public class Apex_ITDbContext : AbpZeroDbContext<Tenant, Role, User, Apex_ITDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Equipment> EquipmentSet { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<AccessRequest> AccessRequests { get; set; }

        public Apex_ITDbContext(DbContextOptions<Apex_ITDbContext> options)
            : base(options)
        {
        }
    }
}
