using Abp.Zero.EntityFrameworkCore;
using NCSAngular.Authorization.Roles;
using NCSAngular.Authorization.Users;
using NCSAngular.MultiTenancy;
using Microsoft.EntityFrameworkCore;
using NCSAngular.TestEntitiy.Person;
using NCSAngular.NCSDB;

namespace NCSAngular.EntityFrameworkCore
{
    public class NCSAngularDbContext : AbpZeroDbContext<Tenant, Role, User, NCSAngularDbContext>
    {
        /* Define an IDbSet for each entity of the application */
        
        public NCSAngularDbContext(DbContextOptions<NCSAngularDbContext> options)
            : base(options)
        {

        }

        public virtual DbSet<Person> Persons { get; set; }

        //adresses
        public virtual DbSet<ADNegara> ADNegara { get; set; }
        public virtual DbSet<ADProvinsi> ADProvinsi { get; set; }
        public virtual DbSet<ADKota> ADKota { get; set; }
        public virtual DbSet<ADDistrik> ADDistrik { get; set; }
        public virtual DbSet<ADKelurahan> ADKelurahan { get; set; }
    }
}
