using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using AutoMapper;
using NCSAngular.Authorization;
using NCSAngular.NCSDB;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NCSAngular.NCSModules.Addreses
{
    //interface
    public interface INegaraAppService : IApplicationService
    {
        ListResultDto<NegaraListDto> GetNegara(GetNegaraInput input);
        Task CreateNegara(CreateNegaraInput input);
    }


    //DTOs
    public class GetNegaraInput
    {
        public string Filter { get; set; }
    }


    //map
    [AutoMapFrom(typeof(ADNegara))]
    public class NegaraListDto : FullAuditedEntityDto
    {
        public string Name { get; set; }

        public string Code { get; set; }

    }

    [AutoMapTo(typeof(ADNegara))]
    public class CreateNegaraInput
    {
        [Required]
        [MaxLength(ADNegara.MaxNameLength)]
        public string Name { get; set; }

        [Required]
        [MaxLength(ADNegara.MaxCodeLength)]
        public string Code { get; set; }
    }


    //Implementation
    //[AbpAuthorize(PermissionNames.Pages_Negara)]
    public class NegaraAppService : NCSAngularAppServiceBase, INegaraAppService
    {
        private readonly IRepository<ADNegara> _negaraRepository;

        public NegaraAppService(IRepository<ADNegara> negaraRepository)
        {
            _negaraRepository = negaraRepository;
        }

        public ListResultDto<NegaraListDto> GetNegara(GetNegaraInput input)
        {
            var thisnegara = _negaraRepository
                .GetAll()
                .WhereIf(
                    !input.Filter.IsNullOrEmpty(),
                    p => p.Name.Contains(input.Filter) ||
                         p.Code.Contains(input.Filter)
                )
                .OrderBy(p => p.Code)
                .ThenBy(p => p.Name)
                .ToList();

            return new ListResultDto<NegaraListDto>(ObjectMapper.Map<List<NegaraListDto>>(thisnegara));
        }

        public async Task CreateNegara(CreateNegaraInput input)
        {
            var negara = ObjectMapper.Map<ADNegara>(input);
            await _negaraRepository.InsertAsync(negara);
        }

        public Task<ListResultDto<NegaraListDto>> GetAllNegara(GetNegaraInput input)
        {
            var thisnegara = _negaraRepository
                .GetAll()
                .WhereIf(
                    !input.Filter.IsNullOrEmpty(),
                    p => p.Name.Contains(input.Filter) ||
                         p.Code.Contains(input.Filter)
                )
                .OrderBy(p => p.Code)
                .ThenBy(p => p.Name)
                .ToList();

            return Task.FromResult(new ListResultDto<NegaraListDto>(
                ObjectMapper.Map<List<NegaraListDto>>(thisnegara)
            ));
        }
    }

}