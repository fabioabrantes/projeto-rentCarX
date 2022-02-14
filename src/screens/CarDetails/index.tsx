import React,{useState, useEffect} from 'react';
import {StatusBar,StyleSheet} from 'react-native';
import {useTheme} from 'styled-components';
import { useNetInfo } from '@react-native-community/netinfo';

import { useNavigation,useRoute } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import Animated,{
  useSharedValue,
  useAnimatedScrollHandler, // identifica quando o usuário está fazendo um scroll na tela
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { ButtonRegister } from '../../components/ButtonRegister';

import { api } from '../../services/api';

import {getAccessoryIcon} from '../../utils/getAccessoryIcon';

import { CarDTO } from '../../dtos/CarDTO';
import { Car as ModelCar } from '../../databases/model/Car';

import { 
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
  OfflineInfo
} from './styles';

interface Params{
  car:ModelCar;
}

export const CarDetails: React.FC = () => {
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const route = useRoute();
  const {car} = route.params as Params;

  const theme = useTheme();

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event=>{
    console.log(event.contentOffset.y);
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(()=>{
    return{
      height: interpolate(scrollY.value, [0,200],[200,70], Extrapolate.CLAMP)
    }
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(()=>{
    return{
      opacity: interpolate(scrollY.value, [0,150],[1,0], Extrapolate.CLAMP)
    }
  });

  function handleConfirmRental(){
    navigation.navigate('Scheduling',{car:carUpdated});
  }
  function handleBack(){
    navigation.goBack();
  }

  useEffect(() =>{
    async function fetchCarUpdated(){
      const response = await api.get(`cars/${car.id}`);
      setCarUpdated(response.data);
    }
    if(netInfo.isConnected === true){
      fetchCarUpdated();
    }
  },[netInfo.isConnected]);

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <Animated.View 
        style={[
          headerStyleAnimation,
          styles.header,
          {backgroundColor: theme.colors.background_secondary}
        ]}
      >
        <Header>
          <BackButton onPress={handleBack}/>
        </Header>
        
        <Animated.View style={sliderCarsStyleAnimation}>
          <CarImages>
            <ImageSlider 
              imagesUrl={
                !!carUpdated.photos? 
                  carUpdated.photos 
                : 
                  [{id:car.thumbnail, photo:car.thumbnail}]
              }
            />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal:24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16} // retira o tremido qd faz a rolagem, usando o numero de quadro por segundo faz a rolagem. 1000(milisegundos)/60 (quadros) = 16
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>
              R$ {netInfo.isConnected === true? car.price : '...'}
            </Price>
          </Rent>
        </Details>

       {
         carUpdated.accessories &&
          <Accessories>
            {carUpdated.accessories.map(accessory => (
              <Accessory
                key={accessory.type}
                name={accessory.name} 
                icon={getAccessoryIcon(accessory.type)}
              />
            ))}          
          </Accessories>
        
       }
        <About>
          {car.about}
        </About>
      </Animated.ScrollView>

      <Footer>{/* Dica: coloquei essa view chamado footer para deixar visivel pois o Content é um scroolView */}
        <ButtonRegister 
          title="Escolher o período do aluguel" 
          onPress={handleConfirmRental}
          enabled={netInfo.isConnected === true}
        />
        {
          netInfo.isConnected === false &&
          <OfflineInfo>
            Conecte-se a Internet para ver mais 
            detalhes e agendar seu carro
          </OfflineInfo>
        }
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header:{
    position: 'absolute',
    overflow:'hidden',
    zIndex:1,
  }
})