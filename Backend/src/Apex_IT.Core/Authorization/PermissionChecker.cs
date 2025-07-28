using Abp.Authorization;
using Apex_IT.Authorization.Roles;
using Apex_IT.Authorization.Users;

namespace Apex_IT.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
