using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;

namespace NCSAngular.NCSDB
{
    [Table("AbpADNegara")]
    public class ADNegara : FullAuditedEntity
    {
        public const int MaxNameLength = 32;
        public const int MaxCodeLength = 32;

        [Required]
        [MaxLength(MaxNameLength)]
        public virtual string Name { get; set; }

        [Required]
        [MaxLength(MaxCodeLength)]
        public virtual string Code { get; set; }

    }

    [Table("AbpADProvinsi")]
    public class ADProvinsi : FullAuditedEntity
    {
        public const int MaxNameLength = 32;
        
        [Required]
        [MaxLength(MaxNameLength)]
        public virtual string Name { get; set; }

        [Required]
        public virtual long ADNegaraId { get; set; }

    }

    [Table("AbpADKota")]
    public class ADKota : FullAuditedEntity
    {
        public const int MaxNameLength = 32;

        [Required]
        [MaxLength(MaxNameLength)]
        public virtual string Name { get; set; }

        [Required]
        public virtual long ADProvinsiId { get; set; }

    }

    [Table("AbpADDistrik")]
    public class ADDistrik : FullAuditedEntity
    {
        public const int MaxNameLength = 32;
        public const int MaxPostCodeLength = 32;

        [Required]
        [MaxLength(MaxNameLength)]
        public virtual string Name { get; set; }

        [Required]
        public virtual long ADKotaId { get; set; }

    }

    [Table("AbpADKelurahan")]
    public class ADKelurahan : FullAuditedEntity
    {
        public const int MaxNameLength = 32;
        public const int MaxPostCodeLength = 32;

        [Required]
        [MaxLength(MaxNameLength)]
        public virtual string Name { get; set; }

        [Required]
        public virtual long ADDistrikId { get; set; }

        [Required]
        public virtual long PostCode { get; set; }

    }

    [Table("ADProvinsiTableView")]
    public class ADProvinsiTableView : FullAuditedEntity
    {
        public virtual long ADNegaraId { get; set; }
        public virtual string Name { get; set; }
        public virtual string NegaraName { get; set; }
        public virtual string userCreate { get; set; }
        public virtual string userEdit { get; set; }
    }
}

