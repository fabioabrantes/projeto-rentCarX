import React from 'react';
import {Feather} from '@expo/vector-icons';
import {useTheme} from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';

import {ptBR} from './localeConfig';
import {generateInterval} from './generateInterval';

import {
  Calendar as CustomCalendar,
  LocaleConfig,
  DateCallbackHandler
} from 'react-native-calendars';

LocaleConfig.locales['pt-br']= ptBR;

LocaleConfig.defaultLocale='pt-br';

interface MarkedDateProps{
  [date:string]:{
    color:string;
    textColor:string;
    disabled?:boolean;
    disableTouchEvent?:boolean;
  }
}

interface DayProps{
  dateString:string;
  day:number;
  month:number;
  year:number;
  timestamp:number;
}

interface CalendarProps{
  markedDates:MarkedDateProps;
  onDayPress:DateCallbackHandler;
}

const Calendar: React.FC<CalendarProps> = ({markedDates,onDayPress}) => {
  const theme = useTheme();

  return (
    <CustomCalendar 
      renderArrow={(direction)=>(
        <Feather
          size={RFValue(24)}
          color={theme.colors.text}
          name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
        />
      )}
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth:0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom:10,
        marginBottom:10
      }}
      theme={{
        textDayFontFamily:theme.fonts.primary_400,
        textDayFontSize:RFValue(20),
        textDayHeaderFontFamily:theme.fonts.primary_500,
        textDayHeaderFontSize:RFValue(10),
        textMonthFontSize:RFValue(20),
        textMonthFontFamily:theme.fonts.secondary_600,
        monthTextColor:theme.colors.title,
        arrowStyle:{
          marginHorizontal:-15
        }
      }}
      firstDay={1}
      minDate = {new Date()} // pega a data mínima.fica cinza no calendário datas anteriores. evita de pegar uma data que já passou
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
      
    
  );
}

export {
  Calendar,
  MarkedDateProps, // interface do período selecionado
  DayProps, // propriedade do dia selecionado
  generateInterval
}