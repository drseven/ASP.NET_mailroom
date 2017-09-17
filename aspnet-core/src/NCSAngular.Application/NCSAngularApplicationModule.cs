using System.Reflection;
using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using NCSAngular.Authorization;

namespace NCSAngular
{
    [DependsOn(
        typeof(NCSAngularCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class NCSAngularApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<NCSAngularAuthorizationProvider>();
        }

        public override void Initialize()
        {
            Assembly thisAssembly = typeof(NCSAngularApplicationModule).GetAssembly();
            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(cfg =>
            {
                //Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg.AddProfiles(thisAssembly);
            });
        }
    }
}