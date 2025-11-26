import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ContainerInput, Codigo, IconDrop, ListaCompra, Input, Button, Wrapper, UlOptions, UlBairros, LiTipo, CheckBoxWrapper, CheckBox, CheckBoxLabel, ErroText, ContainerFiltro } from './style'
import { IoIosArrowDropdownCircle } from "react-icons/io"

const FiltroBusca = () => {
  const navigate = useNavigate()
  
  const [produtos, setProdutos] = useState([])
  const [openDropdown, setOpenDropdown] = useState(null) // controla o dropdown aberto
  const [selectedBairro, setSelectedBairro] = useState([])
  const [selectedTipo, setSelectedTipo] = useState([])
  const [selectedCompra, setSelectedCompra] = useState([])
  const [codigo, setCodigo] = useState('')
  const [error, setError] = useState('')
  const [showErroMessage] = useState(false)
  const [inputErro, setInputErro] = useState(false)
  const [buttonError, setButtonError] = useState(false)

  const closeTimeout = useRef(null)

  useEffect(() => {
    if (error) {
      setError('')
      setInputErro(false)
      setButtonError(false)
    }
  }, [selectedBairro, selectedCompra, selectedTipo, codigo])

  // --- Controle de dropdown ---
  const handleMouseEnter = (name) => () => {
    if (window.innerWidth > 950) {
      // se existir um timeout de fechamento, cancela
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current)
        closeTimeout.current = null
      }
      setOpenDropdown(name)
    }
  }

  const handleMouseLeave = (name) => () => {
    if (window.innerWidth > 950 && openDropdown === name) {
      // aguarda 500ms antes de fechar
      closeTimeout.current = setTimeout(() => {
        setOpenDropdown(null)
      }, 500)
    }
  }

  const handleDropdownClick = (name) => () => {
    if (window.innerWidth <= 1250) {
      setOpenDropdown(prev => prev === name ? null : name)
    }
  }

  // --- Seleções ---
  const handleBairroChange = (bairro) => {
    setSelectedBairro(prev =>
      prev.includes(bairro) ? prev.filter(item => item !== bairro) : [...prev, bairro]
    )
  }

  const handleTipoChange = (tipo) => {
    setSelectedTipo(prev =>
      prev.includes(tipo) ? prev.filter(item => item !== tipo) : [...prev, tipo]
    )
  }

  const handleTransacaoChange = (disponibilidade) => {
    setSelectedCompra(prev =>
      prev.includes(disponibilidade) ? prev.filter(item => item !== disponibilidade) : [...prev, disponibilidade]
    )
  }

  const filtrarImoveis = () => {
    let disponibilidadeQuery = []
    let query = ''
    const imovelID = codigo.trim()

    const filterCheck = selectedBairro.length > 0 || selectedCompra.length > 0 || selectedTipo.length > 0
    if (imovelID && filterCheck) {
      console.log('Tipo de busca não permitida')
      setError('Tipo de busca não permitida')
      setInputErro(true)
      return
    }
    if (!imovelID && !filterCheck) {
      console.log('Por favor, selecione pelo menos um filtro.')
      setError('Por favor, selecione pelo menos um filtro')
      setButtonError(true)
      setInputErro(false)
      return
    }

    if (imovelID && !filterCheck) {
      fetch(`http://localhost:3001/imoveis/${imovelID}`, { method: 'GET', redirect: 'follow' })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro na resposta da API')
          }
          return response.json();
        })
        .then((data) => {
          setProdutos(data)

          if (data.length > 0) {
            navigate(`/imovel?id=${imovelID}`);
          } else {
            setError('Não foram encontrados imóveis com os filtros selecionados.')
          }
        })
        .catch((error) => {
          setError('Erro ao buscar imóvel por ID');
        })
      return
    }

    if (!imovelID && filterCheck) {
      if (selectedCompra.includes('Alugar')) {
        disponibilidadeQuery.push('aluguel');
      }
      if (selectedCompra.includes('Comprar')) {
        disponibilidadeQuery.push('venda');
      }
      if (selectedCompra.includes('Alugar') && selectedCompra.includes('Comprar')) {
        disponibilidadeQuery.push('venda_e_aluguel');
      }

      if (disponibilidadeQuery.length > 0) {
        query += `?disponibilidade=${disponibilidadeQuery.join(',')}`;
      }

      if (selectedTipo.length) {
        query += query ? `&tipo=${selectedTipo.join(',')}` : `?tipo=${selectedTipo.join(',')}`
      }

      if (selectedBairro.length) {
        query += query ? `&bairro=${selectedBairro.join(',')}` : `?bairro=${selectedBairro.join(',')}`
      }

      fetch("http://localhost:3001/imoveis/busca" + query, { method: "GET", redirect: "follow" })
        .then((response) => response.json())
        .then((data) => {
          console.log('Filtros selecionado :', data)
          setProdutos(data)
          if (data.length > 0) {
            window.location.href = `/imoveis${query}`
          } else {
            console.log('Não foram encontrados imóveis com os filtros selecionados.')
          }
        })
        .catch((error) => {
          setError('Erro ao buscar imóveis')
          setInputErro(false)
          setButtonError(true)
        })
      return
    }
    console.log('Por favor, selecione pelo menos um filtro.')
    setError('Por favor, selecione pelo menos um filtro')

  }

  return (
    <Wrapper>
      <ContainerFiltro>
        <ContainerInput>
          {showErroMessage && <ErroText error={error} />}

          {/* Disponibilidade */}
          <Input
            onMouseEnter={handleMouseEnter('compra')}
            onMouseLeave={handleMouseLeave('compra')}
            onClick={handleDropdownClick('compra')}
          >
            Disponibilidade
            <IconDrop><IoIosArrowDropdownCircle /></IconDrop>
            {openDropdown === 'compra' && (
              <UlOptions>
                {['Alugar', 'Comprar'].map(disponibilidade => (
                  <LiTipo key={disponibilidade}>
                    <CheckBoxWrapper>
                      <CheckBox
                        type='checkbox'
                        id={disponibilidade}
                        value={disponibilidade}
                        checked={selectedCompra.includes(disponibilidade)}
                        onChange={() => handleTransacaoChange(disponibilidade)}
                      />
                      <CheckBoxLabel htmlFor={disponibilidade}>{disponibilidade}</CheckBoxLabel>
                    </CheckBoxWrapper>
                  </LiTipo>
                ))}
              </UlOptions>
            )}
          </Input>

          {/* Imóveis */}
          <Input
            onMouseEnter={handleMouseEnter('tipo')}
            onMouseLeave={handleMouseLeave('tipo')}
            onClick={handleDropdownClick('tipo')}
          >
            Imóveis
            <IconDrop><IoIosArrowDropdownCircle /></IconDrop>
            {openDropdown === 'tipo' && (
              <UlOptions>
                {['Casa', 'Apartamento'].map(tipo => (
                  <LiTipo key={tipo}>
                    <CheckBoxWrapper>
                      <CheckBox
                        type='checkbox'
                        id={tipo}
                        value={tipo}
                        checked={selectedTipo.includes(tipo)}
                        onChange={() => handleTipoChange(tipo)}
                      />
                      <CheckBoxLabel htmlFor={tipo}>{tipo}</CheckBoxLabel>
                    </CheckBoxWrapper>
                  </LiTipo>
                ))}
              </UlOptions>
            )}
          </Input>

          {/* Bairros */}
          <Input
            onMouseEnter={handleMouseEnter('bairro')}
            onMouseLeave={handleMouseLeave('bairro')}
            onClick={handleDropdownClick('bairro')}
          >
            Bairro
            <IconDrop><IoIosArrowDropdownCircle /></IconDrop>
            {openDropdown === 'bairro' && (
              <UlOptions>
                {['Bela Vista', 'Copacabana', 'Centro', 'Pinheiros', 'Botafogo', 'Barra da Tijuca'].map(bairro => (
                  <LiTipo key={bairro}>
                    <CheckBoxWrapper>
                      <CheckBox
                        type='checkbox'
                        id={bairro}
                        value={bairro}
                        checked={selectedBairro.includes(bairro)}
                        onChange={() => handleBairroChange(bairro)}
                      />
                      <CheckBoxLabel htmlFor={bairro}>{bairro}</CheckBoxLabel>
                    </CheckBoxWrapper>
                  </LiTipo>
                ))}
              </UlOptions>
            )}
          </Input>

          <Codigo
            placeholder='Código'
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            error={inputErro}
          />

          <Button onClick={filtrarImoveis} error={buttonError}>Buscar</Button>
        </ContainerInput>

        {error && <ErroText>{error}</ErroText>}
      </ContainerFiltro>
    </Wrapper>
  )
}

export default FiltroBusca
