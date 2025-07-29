using System.Linq;
using Microsoft.EntityFrameworkCore;
using Abp.Authorization;
using Abp.Authorization.Roles;
using Abp.Authorization.Users;
using Abp.MultiTenancy;
using Apex_IT.Authorization;
using Apex_IT.Authorization.Roles;
using Apex_IT.Authorization.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace Apex_IT.EntityFrameworkCore.Seed.Host
{
    public class HostRoleAndUserCreator
    {
        private readonly Apex_ITDbContext _context;

        public HostRoleAndUserCreator(Apex_ITDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            CreateHostRoleAndUsers();
        }

        /// <summary>
        /// Creates default host-level roles ("Admin", "Employee", "Supervisor") and an admin user if they do not already exist, and assigns all host permissions to the admin role.
        /// </summary>
        private void CreateHostRoleAndUsers()
        {
            // Admin role for host

            var adminRoleForHost = _context.Roles.IgnoreQueryFilters().FirstOrDefault(r => r.TenantId == null && r.Name == StaticRoleNames.Host.Admin);
            if (adminRoleForHost == null)
            {
                adminRoleForHost = _context.Roles.Add(new Role(null, StaticRoleNames.Host.Admin, StaticRoleNames.Host.Admin) { IsStatic = true}).Entity;
                _context.SaveChanges();
            }

            // Employee role

            var EmployeeRole = _context.Roles.IgnoreQueryFilters().FirstOrDefault(r => r.TenantId == null && r.Name == StaticRoleNames.Employee.User);
            if (EmployeeRole == null)
            {
                EmployeeRole = _context.Roles.Add(new Role(null, StaticRoleNames.Employee.User, StaticRoleNames.Employee.User) { IsStatic = true}).Entity;
                _context.SaveChanges();
            }

            // Supervisor role

            var SupervisorRole = _context.Roles.IgnoreQueryFilters().FirstOrDefault(r => r.TenantId == null && r.Name == StaticRoleNames.Supervisor.Admin);
            if (SupervisorRole == null)
            {
                SupervisorRole = _context.Roles.Add(new Role(null, StaticRoleNames.Supervisor.Admin, StaticRoleNames.Supervisor.Admin) { IsStatic = true, IsDefault = true }).Entity;
                _context.SaveChanges();
            }

            // Grant all permissions to admin role for host

            var grantedPermissions = _context.Permissions.IgnoreQueryFilters()
                .OfType<RolePermissionSetting>()
                .Where(p => p.TenantId == null && p.RoleId == adminRoleForHost.Id)
                .Select(p => p.Name)
                .ToList();

            var permissions = PermissionFinder
                .GetAllPermissions(new Apex_ITAuthorizationProvider())
                .Where(p => p.MultiTenancySides.HasFlag(MultiTenancySides.Host) &&
                            !grantedPermissions.Contains(p.Name))
                .ToList();

            if (permissions.Any())
            {
                _context.Permissions.AddRange(
                    permissions.Select(permission => new RolePermissionSetting
                    {
                        TenantId = null,
                        Name = permission.Name,
                        IsGranted = true,
                        RoleId = adminRoleForHost.Id
                    })
                );
                _context.SaveChanges();
            }

            // Admin user for host

            var adminUserForHost = _context.Users.IgnoreQueryFilters().FirstOrDefault(u => u.TenantId == null && u.UserName == AbpUserBase.AdminUserName);
            if (adminUserForHost == null)
            {
                var user = new User
                {
                    TenantId = null,
                    UserName = AbpUserBase.AdminUserName,
                    Name = "admin",
                    Surname = "admin",
                    EmailAddress = "admin@aspnetboilerplate.com",
                    IsEmailConfirmed = true,
                    IsActive = true
                };

                user.Password = new PasswordHasher<User>(new OptionsWrapper<PasswordHasherOptions>(new PasswordHasherOptions())).HashPassword(user, "123qwe");
                user.SetNormalizedNames();

                adminUserForHost = _context.Users.Add(user).Entity;
                _context.SaveChanges();

                // Assign Admin role to admin user
                _context.UserRoles.Add(new UserRole(null, adminUserForHost.Id, adminRoleForHost.Id));
                _context.SaveChanges();

                _context.SaveChanges();
            }
        }
    }
}
