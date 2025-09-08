import styled, { css } from "styled-components"

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    max-width: 1444px;
    margin: 0 auto;

    @media (max-width: 1464px){
        max-width: 1198px;
        margin: 0;
    }

    @media (max-width: 1220px){
        max-width: 900px;
    }

    @media (max-width: 900px){
        max-width: 700px;
        margin: 0 auto;
    }
`

export const ContainerFiltro = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 160px;
    background-color: black;
    padding: 20px;
    position: relative;
    gap: 32px;
    justify-content: center; 
    
    
    @media (max-width: 1280px){
        gap: 10px;
    }

    @media (max-width: 720px) {
        height: 300px;
        display: grid;
        justify-content: normal; 
    }
`

export const ContainerInput = styled.div`
    width: 100%;
    display: flex;
    gap: 32px;
    
    
    @media (max-width: 1280px){
        gap: 10px;
    }

    @media (max-width: 950px){
        gap: 10px;
    }

    @media (max-width: 720px){
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }
`

export const Button = styled.button`
    width: 200px;
    background-color: #212121;
    display: flex;
    color: #FFFFFF;
    ${({ error }) =>
        error &&
        css`
        border: 2px solid red; 
    `}
    font-size: 20px;
    font-style: italic;
    line-height: 24.2px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    position: relative;
    padding: 10px;

    @media (max-width: 950px){
        width: 130px;
        font-size: 16px;
    }

    @media (max-width: 720px){
        width: 100%;
        grid-column: 1 / span 2;
        font-size: 25px;
        height: 60px;
        
    }
`

export const Codigo = styled.input`
    width: 250px;
    background-color: #FFFFFF;
    position: relative;
    display: flex;
    border: 2px solid ${props => (props.error ? 'red' : '#888')};
    &:focus {
    border-color: ${props => (props.error ? 'red' : '#888')};
    }
    font-size: 20px;
    line-height: 24.2px;
    text-align:left;
    padding-left: 10px;
    border-radius: 8px;
    
    @media (max-width: 1050px){
        width: 174px;
        font-size: 16px;
    }

    @media (max-width: 980px){
        width: 130px;
        font-size: 16px;
    }

    @media (max-width: 720px){
        width: 280px;
        font-size: 16px;
    }

    @media (max-width: 650px) {
        width: 100%;
        height: 60px;
        padding: 10px;
        line-height: 40px;
    }
`

export const Input = styled.div`
    padding: 18px;  
    width: 280px;
    height: 65px;
    background-color: #FFFFFF;
    position: relative;
    justify-content: center;
    font-size: 20px;
    line-height: 24px;
    text-align:left ;
    border-radius: 8px;

    @media (max-width: 1050px){
        font-size: 16px;
    }

    @media (max-width: 650px) {
        display: block;
        width: 100%;
        height: 60px;
    }
`

export const IconDrop = styled.i`
    position: absolute;
    right: 0.1rem;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
`

export const ListaCompra = styled.ul`
    position: relative;
    width: 280px;
    padding: 20px;
    right: 20px;
    transition: opacity 0.5s ease, max-height 0.5s ease;
    background: #ffffff;
    border-radius: 8px;
    border: 2px solid #000;
    z-index: 1;
    margin-top: 25px;

    @media (max-width: 1280px){
        width: 250px;   
    }

    @media (max-width: 950px){
        width: 174px;
        padding:  10px;
        right: 5px;
    }

    @media (max-width: 450px){
        width: 150px;
        margin-top: 25px;
        right: 5px;
    }
    
`

export const LiTipo = styled.li`
    right: 5px;
    display: flex;
    cursor: pointer;
    height: 55px;
`

export const UlOptions = styled.ul`
    position: absolute;
    width: 100%;
    padding: 20px;
    right: 0px;
    transition: opacity 0.5s ease, max-height 0.5s ease;
    background: #ffffff;
    border-radius: 8px;
    border: 2px solid #000;
    z-index: 2;
    margin-top: 25px;

    @media (max-width: 1380px){
        padding: 0 10px;
    }

    @media (max-width: 450px){
        width: 150px;
        margin-top: 25px;
        right: 5px;
    }
`

export const UlBairros = styled.ul`
    position: relative;
    padding: 20px;
    transition: opacity 0.5s ease, max-height 0.5s ease;
    margin-top: 20px;
    background: #ffffff;
    flex-direction: column;
    width: 326px;
    right: 20px;
    border-radius: 8px;
    border: 2px solid #000;
    z-index: 2;

    @media (max-width: 1280px){
        width: 250px;
    }

    @media (max-width: 950px){
        width: 174px;
        margin-top: 22px;
        padding: 0 5px;
    }

    @media (max-width: 450px){
        margin-top: 20px;
        width: 150px;
        right: 15px;
        padding: 15px;
        line-height: normal;
    }
`

export const CheckBoxWrapper = styled.div`
    display: flex;
    align-items: center;
`

export const CheckBox = styled.input`
    margin-right: 10px;
`

export const CheckBoxLabel = styled.label`
    cursor: pointer;
`

export const ErroText = styled.p`
    position: absolute;
    height: auto;
    top: 0px;
    display: flex;
    padding: 10px;
    color: red;
    font-size: large;

    @media (max-width: 650px ) {
        top: 55%;
        font-weight: 700;
        font-size: 18px;
        left: 20%; 
    }
`
