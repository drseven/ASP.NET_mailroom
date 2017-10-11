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
    public interface IProvinsiAppService : IApplicationService
    {
        ListResultDto<ProvinsiListDto> GetProvinsi(GetProvinsiInput input);
        Task CreateProvinsi(CreateProvinsiInput input);
        Task DeleteProvinsi(EntityDto input);
    }


    //DTOs
    public class GetProvinsiInput
    {
        public string Filter { get; set; }

        public int Limit { get; set; }
    }

    public class GetProvinsibyIDInput
    {
        public int Id { get; set; }

        public int Limit { get; set; }
    }

    public class GetProvinsibyIDArrayInput
    {
        public int[] Id { get; set; }

        public int Limit { get; set; }
    }


    //map
    [AutoMapFrom(typeof(ADProvinsi))]
    public class ProvinsiListDto : FullAuditedEntityDto
    {
        //public long Id { get; set; }

        public string Name { get; set; }

        public long ADNegaraId { get; set; }
    }

    [AutoMapFrom(typeof(ADProvinsiTableView))]
    public class ProvinsiTableViewListDto : FullAuditedEntityDto
    {
        public string Name { get; set; }
        public long ADNegaraId { get; set; }
        public string NegaraName { get; set; }
        public string userCreate { get; set; }
        public string userEdit { get; set; }
    }

    [AutoMapTo(typeof(ADProvinsi))]
    public class CreateProvinsiInput
    {
        [Required]
        [MaxLength(ADProvinsi.MaxNameLength)]
        public string Name { get; set; }

        [Required]
        public long ADNegaraId { get; set; }
    }

    [AutoMapTo(typeof(ADProvinsi))]
    public class EditProvinsiInput
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(ADProvinsi.MaxNameLength)]
        public string Name { get; set; }

        [Required]
        public long ADNegaraId { get; set; }

        [Required]
        public long LastModifierUserId { get; set; }
    }

    //Implementation
    //[AbpAuthorize(PermissionNames.Pages_Provinsi)]
    public class ProvinsiAppService : NCSAngularAppServiceBase, IProvinsiAppService
    {
        private readonly IRepository<ADProvinsi> _ProvinsiRepository;
        private readonly IRepository<ADProvinsiTableView> _ProvinsiTableViewRepository;

        public ProvinsiAppService(IRepository<ADProvinsi> ProvinsiRepository, IRepository<ADProvinsiTableView> ProvinsiTableViewRepository)
        {
            _ProvinsiRepository = ProvinsiRepository;
            _ProvinsiTableViewRepository = ProvinsiTableViewRepository;
        }

        public ListResultDto<ProvinsiListDto> GetProvinsi(GetProvinsiInput input)
        {
            var thisProvinsi = _ProvinsiRepository
                .GetAll()
                .WhereIf(
                    !input.Filter.IsNullOrEmpty(),
                    p => p.Name.Contains(input.Filter)
                )
                .OrderBy(p => p.Name)
                .ToList();

            return new ListResultDto<ProvinsiListDto>(ObjectMapper.Map<List<ProvinsiListDto>>(thisProvinsi));
        }

        public Task<ListResultDto<ProvinsiListDto>> GetProvinsiAsync(GetProvinsiInput input)
        {
            var thisProvinsi = _ProvinsiRepository
                .GetAll()
                .WhereIf(
                    !input.Filter.IsNullOrEmpty(),
                    p => p.Name.Contains(input.Filter)
                )
                .OrderBy(p => p.ADNegaraId)
                .ThenBy(p => p.Name)
                .ToList().AsQueryable();

            if (input.Limit != 0)
                thisProvinsi = thisProvinsi.Take(input.Limit);

            return Task.FromResult(new ListResultDto<ProvinsiListDto>(
                ObjectMapper.Map<List<ProvinsiListDto>>(thisProvinsi)
            ));
        }


        /* CREATE */
        public async Task CreateProvinsi(CreateProvinsiInput input)
        {
            var Provinsi = ObjectMapper.Map<ADProvinsi>(input);
            await _ProvinsiRepository.InsertAsync(Provinsi);
        }

        public async Task DeleteProvinsi(EntityDto input)
        {
            await _ProvinsiRepository.DeleteAsync(input.Id);
        }

        public async Task EditProvinsi(EditProvinsiInput input)
        {
            var data = await _ProvinsiRepository.GetAsync(input.Id);
            data.Name = input.Name;
            data.ADNegaraId = input.ADNegaraId;
            data.LastModificationTime = new System.DateTime();
            data.LastModifierUserId = input.LastModifierUserId;
            await _ProvinsiRepository.UpdateAsync(data);
        }

        /* VIEW OPERATION */
        public ListResultDto<ProvinsiTableViewListDto> GetProvinsiTableView(GetProvinsiInput input)
        {
            var thisProvinsi = _ProvinsiTableViewRepository
                .GetAll()
                .WhereIf(
                    !input.Filter.IsNullOrEmpty(),
                    p => p.Name.Contains(input.Filter)
                )
                .OrderBy(p => p.Name)
                .ToList();

            return new ListResultDto<ProvinsiTableViewListDto>(ObjectMapper.Map<List<ProvinsiTableViewListDto>>(thisProvinsi));
        }

        public Task<ListResultDto<ProvinsiTableViewListDto>> GetProvinsiTableViewAsync(GetProvinsiInput input)
        {
            var thisProvinsi = _ProvinsiTableViewRepository
                .GetAll()
                .WhereIf(
                    !input.Filter.IsNullOrEmpty(),
                    p => p.Name.Contains(input.Filter)
                )
                .OrderBy(p => p.ADNegaraId)
                .ThenBy(p => p.Name)
                .ToList().AsQueryable();

            if (input.Limit != 0)
                thisProvinsi = thisProvinsi.Take(input.Limit);

            return Task.FromResult(new ListResultDto<ProvinsiTableViewListDto>(
                ObjectMapper.Map<List<ProvinsiTableViewListDto>>(thisProvinsi)
            ));
        }

        public Task<ListResultDto<ProvinsiTableViewListDto>> GetProvinsiTableViewbyNegaraID(GetProvinsibyIDInput input)
        {
            var thisProvinsi = _ProvinsiTableViewRepository
                .GetAll()
                .Where(
                    p => p.ADNegaraId.Equals(input.Id)
                )
                .OrderBy(p => p.ADNegaraId)
                .ThenBy(p => p.Name)
                .ToList();

            return Task.FromResult(new ListResultDto<ProvinsiTableViewListDto>(
                ObjectMapper.Map<List<ProvinsiTableViewListDto>>(thisProvinsi)
            ));
        }

        public Task<ListResultDto<ProvinsiTableViewListDto>> GetProvinsiTableViewbyNegaraIDArray(GetProvinsibyIDArrayInput input)
        {
            var thisProvinsi = _ProvinsiTableViewRepository
                .GetAll()
                .Where(
                    p => input.Id.Contains(p.Id)
                )
                .OrderBy(p => p.ADNegaraId)
                .ThenBy(p => p.Name)
                .ToList();

            return Task.FromResult(new ListResultDto<ProvinsiTableViewListDto>(
                ObjectMapper.Map<List<ProvinsiTableViewListDto>>(thisProvinsi)
            ));
        }
    }

}