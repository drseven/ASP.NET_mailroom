using Abp.Authorization;
using NCSAngular.Authorization.Roles;
using NCSAngular.Authorization.Users;

namespace NCSAngular.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {

        }
    }
}
