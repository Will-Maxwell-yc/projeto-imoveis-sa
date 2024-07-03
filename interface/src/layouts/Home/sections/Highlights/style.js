import styled, { keyframes } from "styled-components";

export const Wrapper = styled.section`
    max-width: 1870px;
    box-sizing: border-box;
    margin: 100px auto;
    width: 100%;
    height: 800px;
`

export const Container = styled.div`
    width: 80%;
    margin: auto;
`

export const Title = styled.div`
    font-size: 48px;
    font-weight: 700;
`

export const CardsWrapper = styled.div`
    margin: 56px auto;
    display: flex;
    justify-content: space-between;
`

export const SelectorWrapper = styled.div`
    width: 100%;
`

export const SelectorContainer = styled.div`
    width: 15%;
    margin: auto;
    display: flex;
    justify-content: center;
`

const growSelector = keyframes`
    0% {flex-grow: 0}
    100% {flex-grow: 1} 
`

const shrinkSelector = keyframes`
    0% {flex-grow: 1}
    100% {flex-grow: 0}
`

export const IndexSelector = styled.div`
    width: 30px;
    height: 20px;
    margin: 0 6px;
    background-color: ${props => props.grow === "true" ? "#454545" : "#000000"};
    flex-grow: ${props => props.grow === "true" ? 1 : 0};
    animation: ${props => props.grow === "true" ? growSelector : shrinkSelector} 0.5s;
    cursor: pointer;
`