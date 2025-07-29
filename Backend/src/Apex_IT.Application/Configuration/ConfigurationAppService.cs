using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using Apex_IT.Configuration.Dto;

namespace Apex_IT.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : Apex_ITAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
