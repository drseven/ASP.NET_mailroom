using NCSAngular.Controllers;
using Microsoft.AspNetCore.Antiforgery;

namespace NCSAngular.Web.Host.Controllers
{
    public class AntiForgeryController : NCSAngularControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public AntiForgeryController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public void GetToken()
        {
            _antiforgery.SetCookieTokenAndHeader(HttpContext);
        }
    }
}