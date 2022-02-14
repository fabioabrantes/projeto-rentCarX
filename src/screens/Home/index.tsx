import React,{useEffect,useState} from 'react';
import {StatusBar} from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';

import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from '@react-navigation/native';

import Logo from '../../assets/logo3.svg';

import { database } from '../../databases';
import {api} from '../../services/api';

import {Car} from '../../components/Car';

import { LoadAnimation } from '../../components/LoadAnimation';

import { Car as ModelCar } from '../../databases/model/Car';

import { 
  Container,
  Header,
  HeaderContent, 
  TotalCars ,
  CardList,
} from './styles';


export const Home: React.FC = () => {
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);

  const netInfo = useNetInfo();
  const navigation = useNavigation();
  
  function handleCarDetails(car:ModelCar){
    navigation.navigate("CarDetails",{car});
  }

  async function offlineSynchronize(){
    await synchronize({
      database, //lastPulledAt é o timestamp de quando ocorreu a última atualização
      pullChanges: async ({ lastPulledAt }) => { // recupera as mudanças que ocorreram do lado do backend e buscam
        const response = await api
        .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);
        
        const { changes, latestVersion } = response.data;
        return { changes, timestamp: latestVersion }
      },// changes é quais mudanças ocorreram no dispositivo
      pushChanges: async ({ changes }) => { // aqui envia para o backend as mudanças do lado do app
        const user = changes.users;
        if(user.updated.length > 0){
          await api.post('/users/sync', user).catch(console.log);
        }
      },
    });
  }

  useEffect(()=>{
    let isMounted = true;
    async function fetchCars(){
      try {
        const carCollection = database.get<ModelCar>('cars');
        const cars = await carCollection.query().fetch(); // fetch pega todos
        if(isMounted){
          setCars(cars);
        }

      } catch (error) {
        console.log(error);
      }finally {
        if(isMounted){
          setLoading(false);
        }
      }

    }
    fetchCars();
    return () =>{
      isMounted = false;
    }
  },[]);

  useEffect(() => {
    if(netInfo.isConnected === true){
     offlineSynchronize();
    }
  },[netInfo.isConnected]);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(128)}
            height={RFValue(33)}
          />
          {
            !loading && (
              <TotalCars>
                {
                  cars.length === 1?
                  "Total de 1 carro"
                  : 
                  `Total de ${cars.length} carros`
                }
              </TotalCars>
            )
          }
          
        </HeaderContent>
      </Header>
      {
        loading ? 
          <LoadAnimation />
        :
          <CardList
            data={cars}
            keyExtractor={item =>item.id}
            renderItem={({item}) => 
              <Car carData={item} onPress={()=>handleCarDetails(item)}/>
            }
          /> 
      }
    </Container>
  
  );
}
