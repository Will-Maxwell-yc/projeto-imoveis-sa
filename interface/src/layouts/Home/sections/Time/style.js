import styled from "styled-components";

export const Wrapper = styled.div`
    max-width: 1600px;
    margin: 0 auto;
    padding: 50px;

    @media (max-width: 600px) {
        padding: 20px;
    }
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;

    @media (max-width: 600px) {
        gap: 10px;
    }
`

export const Title = styled.div`
    font-size: 36px;
    font-weight: 700;
    height: 50px;

    @media (max-width: 482px){
        height: unset;
    }
`