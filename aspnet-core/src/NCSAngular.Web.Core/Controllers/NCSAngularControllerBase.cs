using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace NCSAngular.Controllers
{
    public abstract class NCSAngularControllerBase: AbpController
    {
        protected NCSAngularControllerBase()
        {
            LocalizationSourceName = NCSAngularConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}