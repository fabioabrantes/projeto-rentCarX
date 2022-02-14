import React from 'react';
import { SvgProps } from 'react-native-svg';
import {useTheme} from 'styled-components';

import { Container,Name } from './styles';

interface Props{
  name:string;
  icon:React.FC<SvgProps>
}
export const Accessory: React.FC<Props> = ({name,icon:Icon}) => {
  const theme = useTheme();
  
  return (
    <Container>
      <Icon 
        width={32} 
        height={32}
        fill={theme.colors.header}
      />
      <Name>{name}</Name>
    </Container>
   );
}
