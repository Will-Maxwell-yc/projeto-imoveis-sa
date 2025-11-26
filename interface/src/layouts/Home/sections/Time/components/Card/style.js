import styled, { keyframes } from "styled-components";
import { SwiperSlide } from "swiper/react";

export const Wrapper = styled.div`
`

export const Container = styled.div`
    display: flex;
    justify-content: center;

    .swiper-slide{
        display: flex;
        justify-content: center;
    }

    .swiper-button-prev, .swiper-button-next{
        margin: 0 20px;
        background-color: #f2f2f2;
        width: 40px;
        height: 40px;
        border-radius: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .swiper-button-prev::after, .swiper-button-next::after{
        font-size: 20px;
        color: black;
    }
`

export const CardContent = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    color: white;
    opacity: 0.5;
    z-index: 2;
    padding: 20px;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;

    @media (max-width: 1030px) {
        opacity: 1;
        visibility: visible;
    }

    
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
    margin-bottom: 300px;
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

export const CardContainer = styled(SwiperSlide)`
    display: flex;
    max-width: 458px;
    height: 650px;
    margin: 55px 17px;
    background-color: black;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: transform 1.2s ease-in-out, box-shadow 0.5s ease-in-out;

    &:hover ${CardContent}, &:hover ${Overlay}, &:hover ${InfoIcon} {
        opacity: 1;
        visibility: visible;
    }

    &:hover {
        transform: scale(1.05); 
    }    

    @media (max-width: 600px) {
        max-width: 100%;
        height: 600px;
    }
`

export const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

export const Article = styled.div`
    padding: 10px;
    font-size: 16px;
    font-weight: 300;
    line-height: 26px;
`

export const Nome = styled.div`
    font-size: 32px;
    font-weight: 700;
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