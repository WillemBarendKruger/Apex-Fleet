using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Apex_IT.EntityFrameworkCore;
using Apex_IT.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace Apex_IT.Web.Tests
{
    [DependsOn(
        typeof(Apex_ITWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class Apex_ITWebTestModule : AbpModule
    {
        public Apex_ITWebTestModule(Apex_ITEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(Apex_ITWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(Apex_ITWebMvcModule).Assembly);
        }
    }
}