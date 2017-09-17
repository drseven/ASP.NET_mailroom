using System;
using System.Collections.Generic;
using System.Text;
using NCSAngular.EntityFrameworkCore;
using System.Linq;

namespace NCSAngular.EntityFrameworkCore.Seed.Host
{
    class InitialAdressCreator
    {
        private readonly NCSAngularDbContext _context;

        public InitialAdressCreator(NCSAngularDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            //script untuk inisialisasi data negara

            //init Negara
            var Indonesia = _context.ADNegara.FirstOrDefault(p => p.Name == "Indonesia");
            if (Indonesia == null)
            {
                _context.ADNegara.Add(
                    new NCSDB.ADNegara
                    {
                        Name = "Indonesia",
                        Code = "IND"
                    });
            }


            //init provinsi
            //var JawaBarat = _context.ADNegara.FirstOrDefault(p => p.Name == "Jawa Barat");
            //if (JawaBarat == null)
            //{
            //    _context.ADProvinsi.Add(
            //        new NCSDB.ADProvinsi
            //        {
            //            Name = "JawaBarat",
            //            ADNegaraId = Indonesia.Id
            //        });
            //}

            //init kota
        }
    }
}
