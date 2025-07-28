using System.Threading.Tasks;
using Apex_IT.Models.TokenAuth;
using Apex_IT.Web.Controllers;
using Shouldly;
using Xunit;

namespace Apex_IT.Web.Tests.Controllers
{
    public class HomeController_Tests: Apex_ITWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}