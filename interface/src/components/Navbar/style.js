import styled from 'styled-components'

export const Wrapper = styled.div`
    width: 100%;
    background-color: #050505;
    position: sticky;
    top: 0;
    z-index: 1;
`

export const Nav = styled.nav`
    max-width: 1680px;
    margin: 0 auto;
    height: 95px;
    width: 100%;
    top: 0;
    overflow: visible;
    box-shadow: 0px 4px 8px 0px #00000026;
    display: flex;
    justify-content: space-between;
`

export const Logo = styled.div`
    width: 90px;
    margin: 28px 50px;

    @media (max-width: 950px){
        margin: 28px 10px;
    }
`