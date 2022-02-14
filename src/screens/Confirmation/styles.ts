import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';


export const Container = styled.View`
  flex:1;
  background-color: ${({theme})=>theme.colors.header};

  padding-top: 80px;
`;

export const Content = styled.View`
  flex:1;
  justify-content: center;
  align-items: center;

  padding-bottom: 60px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  font-family: ${({theme})=>theme.fonts.secondary_600};
  color: ${({theme})=>theme.colors.shape};

  margin-top:20px;
`;

export const Message = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({theme})=>theme.fonts.primary_400};
  color: ${({theme})=>theme.colors.text_detail};

  text-align: center;
  line-height:${RFValue(25)}px;

  margin-top:10px;
`;

export const Footer = styled.View`
  width: 100%;
  align-items: center;

  margin:80px 0;
  padding-bottom: 40px;
`;