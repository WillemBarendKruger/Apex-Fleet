using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Apex_IT.Configuration;
using Apex_IT.Web;

namespace Apex_IT.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class Apex_ITDbContextFactory : IDesignTimeDbContextFactory<Apex_ITDbContext>
    {
        public Apex_ITDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<Apex_ITDbContext>();
            
            /*
             You can provide an environmentName parameter to the AppConfigurations.Get method. 
             In this case, AppConfigurations will try to read appsettings.{environmentName}.json.
             Use Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") method or from string[] args to get environment if necessary.
             https://docs.microsoft.com/en-us/ef/core/cli/dbcontext-creation?tabs=dotnet-core-cli#args
             */
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            Apex_ITDbContextConfigurer.Configure(builder, configuration.GetConnectionString(Apex_ITConsts.ConnectionStringName));

            return new Apex_ITDbContext(builder.Options);
        }
    }
}
