import styled from "styled-components"

export const Wrapper = styled.div``

export const Container = styled.div`
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: center;

    .swiper-slide{
        display: flex;
        justify-content: center;
    }

    .swiper-button-prev, .swiper-button-next{
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

export const TitleSection = styled.div`
    width: 90%;
    margin: auto;
`

export const Title = styled.div`
    font-size: 36px;
    font-weight: 700;
    height: 50px;

    @media (max-width: 482px){
        height: unset;
    }
`

export const CardsSection = styled.div`
    display: flex;
    justify-content: center;
    margin: auto;
`