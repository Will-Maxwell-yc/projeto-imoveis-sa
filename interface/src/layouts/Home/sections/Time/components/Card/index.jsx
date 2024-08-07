import React, { useEffect, useState } from 'react'

import { CardContent, CardContainer, Article, Nome, Telefone, Email, Wrapper, Container, Overlay, Direita, Esquerda, Icon, ContainerIcon, } from './style'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"
import NavButtons from '../../../Time/components/NavButtons/index'
import { useNavigate } from 'react-router-dom'

const Card = ({ configTime }) => {
    const [imageIndex, setImageIndex] = useState(0)
    const [visibleCards, setVisibleCards] = useState(1)
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)
    const [touchStartTime, setTouchStartTime] = useState(0)
    const [paused] = useState(false)
    const navigate = useNavigate()

    const handleButtonClick = (buttonIndex) => {
        setImageIndex(buttonIndex - 1)
    }

    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientX)
        setTouchStartTime(new Date().getTime())
    }

    const handleTouchMove = (e) => {
        setTouchEnd(e.touches[0].clientX)
    }

    const handleCardClick = (item) => {
        console.log('Navigating with data:', item)
        navigate('/consultores', { state: { data: item } })
    }

    const handleTouchEnd = () => {
        const touchEndTime = new Date().getTime()
        const touchDuration = touchEndTime - touchStartTime

        if (touchDuration > 200) {
            if (touchStart - touchEnd > 10) {
                next()
            }

            if (touchStart - touchEnd < -10) {
                prev()
            }

        }
        setTouchStart(0)
        setTouchEnd(0)
        setTouchStartTime(0)
    }

    const next = () => {
        setImageIndex((prevIndex) => {
            const maxIndex = visibleCards === 3 ? 3 : (visibleCards === 2 ? 4 : 5)
            const nextIndex = (prevIndex + 1) % configTime.length;
            if (nextIndex >= maxIndex) {
                return 0
            }
            return nextIndex;
        })
    }

    const prev = () => {
        setImageIndex((prevIndex) => (prevIndex - 1 + configTime.length) % configTime.length)
    }

    useEffect(() => {
        const updateCardCount = () => {
            if (window.innerWidth >= 1540) {
                setVisibleCards(3)
            } else if (window.innerWidth >= 1100) {
                setVisibleCards(2)
            } else {
                setVisibleCards(1)
            }
        }

        window.addEventListener('resize', updateCardCount)
        updateCardCount()

        return () => window.removeEventListener('resize', updateCardCount)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            if (!paused) {
                next()
            }
        }, 6000)
        return () => clearInterval(interval)
    }, [paused, visibleCards])

    const getCardsToRender = () => {
        if (imageIndex + visibleCards <= configTime.length) {
            return configTime.slice(imageIndex, imageIndex + visibleCards)
        } else {
            return [...configTime.slice(imageIndex), ...configTime.slice(0, (imageIndex + visibleCards) % configTime.length)]
        }
    }

    return (
        <Wrapper>
            <Container
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {getCardsToRender().map((item, index) => (
                    <CardContainer
                        key={index}
                        style={{
                            backgroundImage: `url(${item.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                        index={index}
                        currentIndex={imageIndex}
                        onClick={() => handleCardClick(item)}
                    >
                        <Overlay />
                        <CardContent>
                            <Nome>
                                {item.nome}
                            </Nome>
                            <Article>
                                {item.sobre}
                            </Article>
                            <Telefone>
                                Tel: {item.telefone}
                            </Telefone>
                            <Email>
                                E-mail: {item.email}
                            </Email>
                        </CardContent>
                    </CardContainer>
                ))}
                {visibleCards === 3 && (
                    <NavButtons 
                    selectedButton={(imageIndex % configTime.length) + 1} 
                    handleButtonClick={handleButtonClick} />
                )}
            </Container>
            <ContainerIcon>
                <Direita onClick={prev} >
                    <FaAngleLeft size={25} />
                </Direita>
                <Esquerda onClick={next} >
                    <FaAngleRight size={25} />
                </Esquerda>
            </ContainerIcon>
        </Wrapper>
    )
}

export default Card
