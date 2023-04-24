using AutoMapper;
using OrderServer.Application.DTO;
using OrderServer.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Application.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserReadDto>()
                .ForMember(dest => dest.Id, otp => otp.MapFrom(src => src.Id.Id));
        }
    }
}
