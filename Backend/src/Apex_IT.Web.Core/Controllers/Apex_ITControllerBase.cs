using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace Apex_IT.Controllers
{
    public abstract class Apex_ITControllerBase: AbpController
    {
        protected Apex_ITControllerBase()
        {
            LocalizationSourceName = Apex_ITConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
