using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Apex_IT.Configuration;

namespace Apex_IT.Web.Host.Startup
{
    [DependsOn(
       typeof(Apex_ITWebCoreModule))]
    public class Apex_ITWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public Apex_ITWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(Apex_ITWebHostModule).GetAssembly());
        }
    }
}
