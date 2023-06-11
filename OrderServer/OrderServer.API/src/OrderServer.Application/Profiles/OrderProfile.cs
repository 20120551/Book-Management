using AutoMapper;
using OrderServer.Application.DTO;
using OrderServer.Domain.Entities;
using OrderServer.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Application.Profiles
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            CreateMap<MovieItem, MovieItemReadDto>();
            CreateMap<Order, OrderReadDto>()
                 .ForMember(dest => dest.Id, otp => otp.MapFrom(src => src.Id.Id))
                 .ForMember(dest => dest.State, otp => otp.MapFrom(src => src._state))
                 .ForMember(dest => dest.TotalPrice, otp => otp.MapFrom(src => src._totalPrice))
                 .ForMember(dest => dest.Receiver, otp => otp.MapFrom(src => src._receiver))
                 .ForMember(dest => dest.Movies, otp => otp.MapFrom(src => src._movies));
        }
    }
}
