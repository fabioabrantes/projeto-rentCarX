import React,{useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';

import Animated,{
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS
} from 'react-native-reanimated';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import { Container } from './styles';

export const Splash: React.FC = () => {
  const splashAnimation = useSharedValue(0);
  const navigation = useNavigation();

  const brandStyle = useAnimatedStyle(()=>{
    return{
      opacity: interpolate(splashAnimation.value,
        [0,50],
        [1,0],
      ),
      transform: [
        {
          translateX:interpolate(splashAnimation.value, 
            [0,50],
            [0,-50],
            Extrapolate.CLAMP
          )
        }
      ],
    }
  });

  const logoStyle = useAnimatedStyle(()=>{
    return{
      opacity: interpolate(splashAnimation.value,
        [0,25,50], // aqui informa que os valores 0,25 e 50 do splashAnimation
        [0,0.3,1], // para cada valores acima 0,25 e 50 do array o opacity recebe esses valores deste array
        Extrapolate.CLAMP // aqui faz nunca ultrapassar do limite que é 50. no opacity não é obrigatório pq o valor limite é 1 e 0
        ),
      transform: [
        {
          translateX:interpolate(splashAnimation.value, 
            [0,50],
            [-50,0],
            Extrapolate.CLAMP
          ),
        }
      ],
    }
  });

  function handleStartApp() {
    navigation.navigate('SignIn');
  }

  useEffect(()=>{
    splashAnimation.value = withTiming(
      50,
      {duration:1000},
      ()=>{
        'worklet'
        runOnJS(handleStartApp)();
      }
    )// aqui o splashAnimation vai receber valores de 0 a 50
  },[]);

  return (
    <Container>
      <Animated.View style={[brandStyle,{position:"absolute"}]}>
        <BrandSvg width={80} height={50}/>
      </Animated.View>

      <Animated.View style={[logoStyle,{position:"absolute"}]}>
        <LogoSvg width={180} height={20}/>
      </Animated.View>
    </Container>
  );
}

