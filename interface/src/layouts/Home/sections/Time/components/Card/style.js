import styled from "styled-components";
import { SwiperSlide } from "swiper/react";

export const Wrapper = styled.div`
    .swiper-pagination{
        position: relative;
        bottom: -5px;

        @media (max-width: 1030px) {
            display: none;
        }
    }

    .swiper-button-disabled{
        opacity: 0 !important;
    }

    .swiper-button-prev, .swiper-button-next {
        opacity: 50%;
        background-color: white;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        width: 30px;
        height: 30px;
        border-radius: 50%;
        color: black;
    }

    .swiper-button-prev:after, .swiper-button-next:after {
        font-size: 20px;
    }
`

export const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

export const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    background: #000000CC;

    @media (max-width: 1030px) {
        opacity: 1;
        visibility: visible;
    }
`
export const InfoIcon = styled.div`
    position: absolute;
    padding: 15px;
    z-index: 3;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;

    @media (max-width: 1030px) {
        opacity: 1;
        visibility: visible;
    }
`

export const CardContent = styled.div`
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    gap: 45px;
    top: 220px;
    padding: 20px;
    position: absolute;
    opacity: 0;
    z-index: 2;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;

    @media (max-width: 1030px) {
        opacity: 1;
        visibility: visible;
    }
`

export const CardContainer = styled(SwiperSlide)`
    position: relative;
    height: 630px;
    display: flex !important;
    cursor: pointer;
    transition: transform 1.2s ease-in-out, box-shadow 0.5s ease-in-out;

    &:hover ${CardContent}, &:hover ${Overlay}, &:hover ${InfoIcon} {
        opacity: 1;
        visibility: visible;
    }

    &:hover {
        transform: scale(1.05); 
    }    
`

export const Article = styled.div`
    padding: 10px;
    font-size: 16px;
    font-weight: 300;
    line-height: 26px;
`

export const Nome = styled.div`
    font-size: 36px;
    font-weight: 700;
    line-height: 43px;
    padding: 10px;
`

export const Telefone = styled.div`
    font-size: 16px;
    font-weight: 300;
    line-height: 16px;
    padding: 10px;
`

export const Email = styled.div`
    font-size: 16px;
    font-weight: 300;
    line-height: 16px;
    padding: 10px;
`