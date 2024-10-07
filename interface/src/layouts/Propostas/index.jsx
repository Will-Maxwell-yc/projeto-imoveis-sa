import { useState, useEffect } from 'react'

import { Wrapper, Container, Title, Content, Options, Option } from './style'

const PropostasLayout = () => {

    const [selected, setSelected] = useState("Em andamento")

    const handleSelected = (e) => {
        setSelected(e.target.textContent)
    }

    return (
        <Wrapper>
            <Container>
                <Title>Minhas propostas</Title>

                <Content>
                    <Options>
                        <Option onClick={handleSelected} selected={selected === "Canceladas"} value="canceladas">Canceladas</Option>
                        <Option onClick={handleSelected} selected={selected === "Em andamento"} value="em andamento">Em andamento</Option>
                    </Options>

                    
                </Content>
            </Container>
        </Wrapper>
    )
}

export default PropostasLayout