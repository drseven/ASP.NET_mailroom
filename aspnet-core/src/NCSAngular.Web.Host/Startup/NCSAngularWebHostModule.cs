using System.Reflection;
using Abp.Modules;
using Abp.Reflection.Extensions;
using NCSAngular.Configuration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace NCSAngular.Web.Host.Startup
{
    [DependsOn(
       typeof(NCSAngularWebCoreModule))]
    public class NCSAngularWebHostModule: AbpModule
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public NCSAngularWebHostModule(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(NCSAngularWebHostModule).GetAssembly());
        }
    }
}
