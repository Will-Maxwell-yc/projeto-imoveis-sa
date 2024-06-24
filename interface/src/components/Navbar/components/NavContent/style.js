import styled, { keyframes } from 'styled-components'

export const  NavContent = styled.div`
    margin-right: 50px;
`

export const ContentLink = styled.span`
    display: inline-block;
    color: #EEEEEE;
    margin: 28px 20px 26px 20px;
    font-weight: 300px;
    font-size: 20px;
`

export const Dropdown = styled.div`
    position: absolute;
    width: 270px;
    right: ${props => props.right+"px"};
    font-weight: 300;
    font-size: 18px;
    background-color: #050505;
    box-sizing: border-box;
    padding: 29px;
    box-shadow: 0px 4px 8px 0px #00000026;
    border-radius: 0 0 3px 3px;
`

export const SideDropdown = styled.div`
    position: absolute;
    width: 280px;
    right: ${props => props.right+"px"};
    top: 0;
    font-weight: 300;
    font-size: 18px;
    background-color: #050505;
    box-sizing: border-box;
    padding: 29px;
    box-shadow: 0px 4px 8px 0px #00000026;
    overflow: hidden;
    border-radius: 3px;
`

const textSlide = keyframes`
    0% {left: -150%;}
    100% {left: 0;}
`

export const DropdownContent = styled.div`
    position: relative;
    left: 0;
    animation-name: ${textSlide};
    animation-duration: 0.4s;
`

export const Title = styled.div`
    padding-bottom: 10px;
    margin-bottom: 10px;
    font-weight: 600;
`

export const Li = styled.li`
    padding-top: 14px;
    font-weight: ${props => props.weight || ''};
    display: flex;
    justify-content: space-between;
    &:hover {
        font-weight: bold;
    }
`