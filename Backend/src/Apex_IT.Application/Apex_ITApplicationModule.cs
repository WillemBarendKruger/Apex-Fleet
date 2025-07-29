using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Apex_IT.Authorization;

namespace Apex_IT
{
    [DependsOn(
        typeof(Apex_ITCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class Apex_ITApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<Apex_ITAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(Apex_ITApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
