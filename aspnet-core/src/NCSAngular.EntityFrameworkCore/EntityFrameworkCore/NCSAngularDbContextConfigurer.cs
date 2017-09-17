using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace NCSAngular.EntityFrameworkCore
{
    public static class NCSAngularDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<NCSAngularDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<NCSAngularDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}