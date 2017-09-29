using NCSAngular.NCSModules;
using NCSAngular.NCSModules.Addreses;
using Shouldly;
using Xunit;

namespace NCSAngular.Tests.NCSModules.Addresses
{
    class NegaraAppService_Tests : NCSAngularTestBase
    {
        private readonly INegaraAppService _negaraAppService;

        public NegaraAppService_Tests()
        {
            _negaraAppService = Resolve<INegaraAppService>();
        }

        [Fact]
        public void Should_Get_All_Negara_Without_Any_Filter()
        {
            //Act
            var negaras = _negaraAppService.GetNegara(new GetNegaraInput());

            //Assert
            negaras.Items.Count.ShouldBe(1);
        }
    }
}
