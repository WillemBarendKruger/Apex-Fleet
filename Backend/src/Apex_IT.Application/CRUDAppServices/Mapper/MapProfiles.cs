using Apex_IT.CRUDAppServices.EquipmentService.Dto;
using Apex_IT.CRUDAppServices.RequestingService.Dto;
using Apex_IT.Entities.AccessRequests;
using Apex_IT.Entities.EquimentItem;
using AutoMapper;

namespace Apex_IT.CRUDAppServices.Mapper
{
    public class MapProfiles : Profile
    {
        public MapProfiles()
        {
            CreateMap<Equipment, EquipmentDto>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Type));
            CreateMap<AccessRequest, RequestDto>()
                .ForMember(dest => dest.EquipmentName, opt => opt.MapFrom(src => src.Equipment.Name));
        }
    }
}
