import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useNetInfo } from '@react-native-community/netinfo';

import { Car as ModelCar } from '../../databases/model/Car';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import { 
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from './styles';

interface Props extends RectButtonProps{
  carData:ModelCar;
}

export const Car: React.FC<Props> = ({carData,...rest}) => {
  const MotorIcon = getAccessoryIcon(carData.fuel_type);
  
  const netInfo = useNetInfo();
  
  return (
    <Container {...rest}>
      <Details>
        <Brand>{carData.brand}</Brand>
        <Name>{carData.name}</Name>
        <About>
          <Rent>
            <Period>{carData.period}</Period>
            <Price>
              {`R$ ${netInfo.isConnected === true ? carData.price : '...'}`}
            </Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage 
        source={{uri:carData.thumbnail}}
        resizeMode='contain'
      />
    </Container>
  );
}

