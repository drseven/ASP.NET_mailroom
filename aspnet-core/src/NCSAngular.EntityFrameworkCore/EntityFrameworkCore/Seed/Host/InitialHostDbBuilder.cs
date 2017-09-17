namespace NCSAngular.EntityFrameworkCore.Seed.Host
{
    public class InitialHostDbBuilder
    {
        private readonly NCSAngularDbContext _context;

        public InitialHostDbBuilder(NCSAngularDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            new DefaultEditionCreator(_context).Create();
            new DefaultLanguagesCreator(_context).Create();
            new HostRoleAndUserCreator(_context).Create();
            new DefaultSettingsCreator(_context).Create();

            //init Adresses
            new InitialAdressCreator(_context).Create();

            _context.SaveChanges();
        }
    }
}
