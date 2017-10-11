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
        Task DeleteNegara(EntityDto input);
    }


    //DTOs
    public class GetNegaraInput
    {
        public string Filter { get; set; }

        public int Limit { get; set; }
    }

    public class GetNegarabyIDArrayInput
    {
        public int[] Id { get; set; }
    }

    public class GetNegarabyIDInput
    {
        public int Id { get; set; }
    }


    //map
    [AutoMapFrom(typeof(ADNegara))]
    public class NegaraListDto : FullAuditedEntityDto
    {
        //public long Id { get; set; }

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

    [AutoMapTo(typeof(ADNegara))]
    public class EditNegaraInput
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(ADNegara.MaxNameLength)]
        public string Name { get; set; }

        [Required]
        [MaxLength(ADNegara.MaxCodeLength)]
        public string Code { get; set; }

        [Required]
        public int LastModifierUserId { get; set; }
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

        public Task<ListResultDto<NegaraListDto>> GetNegaraAsync(GetNegaraInput input)
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
                .ToList().AsQueryable();

            if (input.Limit != 0)
                thisnegara = thisnegara.Take(input.Limit);

            return Task.FromResult(new ListResultDto<NegaraListDto>(
                ObjectMapper.Map<List<NegaraListDto>>(thisnegara)
            ));
        }

        public Task<ListResultDto<NegaraListDto>> GetNegarabyID(GetNegarabyIDInput input)
        {
            var thisnegara = _negaraRepository
                .GetAll()
                .Where(
                    p => p.Id.Equals(input.Id)
                )
                .OrderBy(p => p.Code)
                .ThenBy(p => p.Name)
                .ToList();

            return Task.FromResult(new ListResultDto<NegaraListDto>(
                ObjectMapper.Map<List<NegaraListDto>>(thisnegara)
            ));
        }

        public Task<ListResultDto<ProvinsiListDto>> GetNegarabyNegaraIDArray(GetNegarabyIDArrayInput input)
        {
            var thisProvinsi = _negaraRepository
                .GetAll()
                .Where(
                    p => input.Id.Contains(p.Id)
                )
                .OrderBy(p => p.Code)
                .ThenBy(p => p.Name)
                .ToList();

            return Task.FromResult(new ListResultDto<ProvinsiListDto>(
                ObjectMapper.Map<List<ProvinsiListDto>>(thisProvinsi)
            ));
        }

        public async Task DeleteNegara(EntityDto input)
        {
            await _negaraRepository.DeleteAsync(input.Id);
        }

        public async Task EditNegara(EditNegaraInput input)
        {
            var data = await _negaraRepository.GetAsync(input.Id);
            data.Name = input.Name;
            data.Code = input.Code;
            data.LastModificationTime = new System.DateTime();
            data.LastModifierUserId = input.LastModifierUserId;
            await _negaraRepository.UpdateAsync(data);
        }
    }

}