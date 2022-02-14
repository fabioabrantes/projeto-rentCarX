import React from 'react';

import LottieView from 'lottie-react-native'

import loadingCarAnimation from '../../assets/loadingCarAnimation.json';

import { Container } from './styles';

export const LoadAnimation: React.FC = () => {
  return (
    <Container>
      <LottieView
        style={{ height:200}}
        resizeMode="contain"
        loop /* garante que a animação não pare */
        source={loadingCarAnimation}
        autoPlay
      />
    </Container>
  );
}

