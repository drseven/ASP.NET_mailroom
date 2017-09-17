using NCSAngular.Configuration;
using NCSAngular.Web;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace NCSAngular.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class NCSAngularDbContextFactory : IDesignTimeDbContextFactory<NCSAngularDbContext>
    {
        public NCSAngularDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<NCSAngularDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            NCSAngularDbContextConfigurer.Configure(builder, configuration.GetConnectionString(NCSAngularConsts.ConnectionStringName));

            return new NCSAngularDbContext(builder.Options);
        }
    }
}