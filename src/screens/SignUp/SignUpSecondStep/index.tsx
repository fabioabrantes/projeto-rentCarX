import React,{useState} from 'react';
import {
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard,
  Alert
} from 'react-native';

import {useTheme} from 'styled-components';
import {useNavigation,useRoute} from '@react-navigation/native';


import {BackButton} from '../../../components/BackButton';
import {Bullet} from '../../../components/Bullet';
import {PasswordInput} from '../../../components/PasswordInput';
import {ButtonRegister} from '../../../components/ButtonRegister';

import { api } from '../../../services/api';

import { 
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,

} from './styles';

interface Params{
  user:{
    name:string;
    email:string;
    driverLicense:string;
  }
}

export const SignUpSecondStep: React.FC = () => {
  const [password,setPassword] = useState('');
  const [passwordConfirm,setPasswordConfirm] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const {user} = route.params as Params;

  const theme = useTheme();
  
  function handleBack(){
    navigation.goBack();
  }

  async function handleRegister(){
   
    if(password.length < 8 && passwordConfirm.length < 8){
      return Alert.alert('A senha tem que ter 8 ou mais caracteres');
    }
    if(password !== passwordConfirm){
      return Alert.alert('AS senhas não são iguais');
    }

    await api.post('/users',{
      name: user.name,
      email: user.email,
      driver_license: user.driverLicense,
      password
    }).then(()=>{
      navigation.navigate('Confirmation',{
        title:'Conta Criada!',
        message: `Agora é só fazer login \ne aproveitar`,
        nextScreenRoute:'SignIn'
      });
    }).catch((error) => {
      console.log(error);
      Alert.alert('Error', 'Não foi possível cadastrar');
    });
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack}/>
            <Steps>
              <Bullet active/>
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua {`\n`} conta</Title>
          <SubTitle>Faça seu cadastro de {`\n`} forma rápida e fácil</SubTitle>

          <Form>
            <FormTitle>2. Senha </FormTitle>

            <PasswordInput 
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput 
              iconName="lock"
              placeholder="Repetir senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />    

            <ButtonRegister 
              color={theme.colors.success}
              title="Cadastrar"
              onPress={handleRegister}
              enabled={!!password && !!passwordConfirm}
            />
          </Form>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
