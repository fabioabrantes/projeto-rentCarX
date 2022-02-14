import React from 'react';
import {MaterialIcons}from '@expo/vector-icons';
import {useTheme} from 'styled-components';
import {BorderlessButtonProps} from 'react-native-gesture-handler';

import { ContainerButton } from './styles';

interface Props extends BorderlessButtonProps{
  color?:string;
}
export const BackButton: React.FC<Props> = ({color,...rest}) => {
  const theme = useTheme();

  return (
    <ContainerButton {...rest}>
      <MaterialIcons
        name="chevron-left"
        size={24}
        color={color? color: theme.colors.text}
      />
    </ContainerButton>
  );
}

