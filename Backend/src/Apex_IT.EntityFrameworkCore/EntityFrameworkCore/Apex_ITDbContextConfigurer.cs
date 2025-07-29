using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace Apex_IT.EntityFrameworkCore
{
    public static class Apex_ITDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<Apex_ITDbContext> builder, string connectionString)
        {
            builder.UseNpgsql(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<Apex_ITDbContext> builder, DbConnection connection)
        {
            builder.UseNpgsql(connection);
        }
    }
}
