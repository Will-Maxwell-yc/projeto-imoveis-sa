import React from 'react';
import QuemSomosVideo from '../SobreNos/components/SobreNos/index';
import NossaHistoria from '../SobreNos/components/NossaHistoria/index';
import NossosValores from '../SobreNos/components/NossosValores/index';
import SliderComponent from '../SobreNos/components/Carrossel/index'
import { Wrapper } from './style';

const QuemSomos = () => {
  return (
    <Wrapper>
      <QuemSomosVideo />
      <NossaHistoria />
      <NossosValores />
      <SliderComponent />
    </Wrapper>
  );
};

export default QuemSomos;