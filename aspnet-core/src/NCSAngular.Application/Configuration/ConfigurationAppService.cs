using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using NCSAngular.Configuration.Dto;

namespace NCSAngular.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : NCSAngularAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
