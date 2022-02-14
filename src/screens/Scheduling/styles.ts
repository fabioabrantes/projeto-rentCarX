import styled,{css} from 'styled-components/native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface DateValueProps{
  dateSelected: boolean;
}

export const Container = styled.View`
  flex:1;

  background-color: ${({theme})=>theme.colors.background_secondary};
`;

export const Header = styled.View`
  width: 100%;
  height:${RFValue(300)}px;

  background-color: ${({theme})=>theme.colors.header};

  justify-content: center;

  padding:25px;
  padding-top: ${getStatusBarHeight() + 35}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(34)}px;
  font-family: ${({theme})=>theme.fonts.secondary_600};
  color: ${({theme})=>theme.colors.shape};
 
  margin-top:${RFValue(10)}px;
`;

export const RentalPeriod = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;

  align-items: center;
  margin: 15px 0;
`;

export const DateInfo = styled.View`
  width: 30%;
`;

export const DateTitle = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${({theme})=>theme.fonts.secondary_500};
  color: ${({theme})=>theme.colors.text};
`;

export const DateValue = styled.Text<DateValueProps>`
  font-size: ${RFValue(15)}px;
  font-family: ${({theme})=>theme.fonts.primary_500};
  color: ${({theme})=>theme.colors.shape};

  ${({theme, dateSelected})=> !dateSelected && css`
      border-bottom-width:1px;
      border-bottom-color: ${theme.colors.text};
      padding-bottom:5px;
  `};
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle:{
    paddingBottom:24,
  },
  showsVerticalScrollIndicator:false,
})``;

export const Footer = styled.View`
  padding: 24px;
`;