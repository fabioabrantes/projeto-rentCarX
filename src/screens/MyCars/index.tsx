import React,{useState,useEffect} from 'react';
import { FlatList, StatusBar } from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { useNavigation,useIsFocused } from '@react-navigation/core';
import {format, parseISO} from 'date-fns';

import { Car } from '../../components/Car';
import {Car as ModelCar} from '../../databases/model/Car';
import { api } from '../../services/api';

import { BackButton } from '../../components/BackButton';
import { LoadAnimation } from '../../components/LoadAnimation';

import { 
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';


interface DataSchedulingCar{
  id:string;
  car:ModelCar;
  start_date:string;
  end_date:string;
}
export const MyCars: React.FC = () => {
  const [cars,setCars] = useState<DataSchedulingCar[]>([]);
  const [loading,setLoading] = useState(true);
  
  const screenIsFocus = useIsFocused();

  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack(){
    navigation.goBack();
  }

  useEffect(()=>{
    async function fetchCars(){
      try {
        const response = await api.get('/rentals');
        const dataFormatted= response.data.map((data:DataSchedulingCar)=>{
          return {
            id:data.id,
            car:data.car,
            start_date:format(parseISO(data.start_date),'dd/MM/yyyy'),
            end_date:format(parseISO(data.end_date),'dd/MM/yyyy'),
          }
        })
        setCars(dataFormatted);
      } catch (error) {
        console.log(error);
      }finally {
        setLoading(false);
      }
    }
    fetchCars();
  },[screenIsFocus]);

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton 
          color={theme.colors.shape} 
          onPress={handleBack}
        />

        <Title>
          Seus agendamentos {'\n'}
          estão aqui {'\n'}
        </Title>
        <SubTitle>
          Conforto, segurança e praticidade
        </SubTitle>
      </Header>
      {loading ? 
         <LoadAnimation/>
        :
          <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>

          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={item =>item.id }
            showsVerticalScrollIndicator={false}
            renderItem={({item}) =>(
              <CarWrapper>
                <Car carData={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{marginHorizontal:10}}
                    />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      }
    </Container>
  );
}

