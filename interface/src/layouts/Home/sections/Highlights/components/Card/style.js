import styled, { keyframes } from "styled-components"

export const Wrapper = styled.div`
    width: 30%;
    height: 400px;
    background-color: black;
    position: relative;
    overflow: hidden;
    cursor: pointer;

    @media (max-width: 951px){
        width: 50%;
    }

    @media (max-width: 451px){
        width: 100%;   
    }
`

export const BackgroundImage = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0.5;
    background-image: url(${props => props.image});
    background-position: 62%;
    background-size: 200% 100%;
`

const showInfo = keyframes`
    0% {top: 48px}
    100% {top: 0}
`
const hideInfo = keyframes`
    0% {top: 0}
    100% {top: 48px}
`

const handleCardInfo = (onHover) => {
    if(onHover === "true"){
        return showInfo
    }else if(onHover === "false"){
        return hideInfo
    }
}

export const CardContent = styled.div`
    position: relative;
    color: white;
    top: ${props => props.hover === "true" ? "0" : "48px"};
    animation: ${props => handleCardInfo(props.hover)} 0.5s;

    @media (max-width: 951px){
        top: 0;
        animation: none;
    }
`

export const Gap = styled.div`
    width: 100%;
    height: 135px;
    @media (max-width: 1281px) {
        height: 178px;
    }
`

export const Title = styled.div`
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 20px 35px;

    @media (max-width: 1281px) {
        margin: 0 0 10px 17px;
    }
`

export const PriceArea = styled.div`
    border: 1px solid #FFFFFF;
    padding: 13px;
    margin: 0 0 30px 35px;
    width: 200px;
    border-radius: 32px;
    font-size: 11px;

    @media (max-width: 1281px) {
        margin: 0 0 15px 17px;
    }
`

export const RedirectIndicator = styled.div`
    margin: 0 0 35px 35px;
    font-size: 10px;

    @media (max-width: 1281px) {
        margin: 0 0 17px 20px;
    }
`

export const HouseInfo = styled.div`
    font-size: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    text-align: center;
    background-color: #000000;
    padding: 10px;
    position: relative;
`