import styled from "styled-components";

export const Wrapper = styled.main`
    max-width: 1870px;
    margin: auto;
`

export const Container = styled.div`
    padding: 100px 50px 80px;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
`

export const Title = styled.section`
    width: 100%;
    border-left: 5px solid #454545;
    padding: 10px 25px;
    height: 60px;
    font-size: 32px;
    font-weight: 600;
    line-height: 39px;
    text-align: left;
`

export const Content = styled.section`
    width: 100%;
`

export const Options = styled.div`
    display: flex;
    width: 30%;
    margin: auto;
    gap: 20px;
`

export const Option = styled.div`
    font-weight: 700;
    border-bottom: ${props => props.selected === true ? "2px solid black" : "none"};
    cursor: pointer;
`