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
        public void Should_Get_All_People_Without_Any_Filter()
        {
            //Act
            var persons = _negaraAppService.GetNegara(new GetNegaraInput());

            //Assert
            persons.Items.Count.ShouldBe(1);
        }
    }
}
