using System.Threading.Tasks;
using NCSAngular.Configuration.Dto;

namespace NCSAngular.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}