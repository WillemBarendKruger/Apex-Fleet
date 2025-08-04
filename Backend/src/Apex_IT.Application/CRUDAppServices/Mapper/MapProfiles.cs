using Apex_IT.Authorization.Users;
using Apex_IT.CRUDAppServices.ConditionReportService.Dto;
using Apex_IT.CRUDAppServices.EmployeeService.Dto;
using Apex_IT.CRUDAppServices.EquipmentService.Dto;
using Apex_IT.CRUDAppServices.RequestingService.Dto;
using Apex_IT.Entities.AccessRequests;
using Apex_IT.Entities.EquimentItem;
using Apex_IT.Entities.Reports;
using AutoMapper;

namespace Apex_IT.CRUDAppServices.Mapper
{
    public class MapProfiles : Profile
    {
        public MapProfiles()
        {
            CreateMap<Equipment, EquipmentDto>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Type))
                .ForMember(dest => dest.HandlerEmail, opt => opt.MapFrom(src => src.Handler.EmailAddress))
                .ForMember(dest => dest.HandlerId, opt => opt.MapFrom(src => src.Handler.Id));
            CreateMap<AccessRequest, RequestDto>()
                .ForMember(dest => dest.EquipmentName, opt => opt.MapFrom(src => src.Equipment.Name))
                .ForMember(dest => dest.RequestingEmployeeEmail, opt => opt.MapFrom(src => src.RequestingEmployee.EmailAddress));
            CreateMap<ConditionReport, ConditionReportDto>()
                            .ForMember(dest => dest.ReportingEmployeeEmail, opt => opt.MapFrom(src => src.ReportingEmployee.EmailAddress));
        }
    }
}
