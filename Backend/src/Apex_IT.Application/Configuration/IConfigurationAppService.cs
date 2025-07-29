using System.Threading.Tasks;
using Apex_IT.Configuration.Dto;

namespace Apex_IT.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
