import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Carrossel from './components/Carrossel'
import config from './components/Carrossel/components/Images'
import { Wrapper } from './style'

const LoginLayout = () => {
  return (
    <Wrapper>
      <Carrossel config={config} />
    </Wrapper>
  )
}

export default LoginLayout