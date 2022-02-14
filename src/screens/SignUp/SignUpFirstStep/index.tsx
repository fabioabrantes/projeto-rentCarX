import React,{useState} from 'react';
import {
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard,
  Alert
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {validationSignUpFirstStep} from '../../../utils/validations';

import {BackButton} from '../../../components/BackButton';
import {Bullet} from '../../../components/Bullet';
import {Input} from '../../../components/Input';
import {ButtonRegister} from '../../../components/ButtonRegister';


import { 
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,

} from './styles';

export const SignUpFirstStep: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense,setDriverLicense] = useState('');
  
  const navigation = useNavigation();

  function handleBack(){
    navigation.goBack();
  }

  async function handleNextSecondStep(){
    const data ={ name,email,driverLicense};
    const error = await validationSignUpFirstStep(data);
    if(!error){
      navigation.navigate("SignUpSecondStep",{user:data});
    }else{
      Alert.alert(error);
    }
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
            <FormTitle>1. Dados </FormTitle>

            <Input 
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name}
            />
            <Input 
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
            <Input 
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              maxLength={11}
              onChangeText={setDriverLicense}
              value={driverLicense}
            />

            <ButtonRegister 
              title="Próximo"
              enabled={!!name && !!email && !!driverLicense}
              onPress={handleNextSecondStep}
            />
          </Form>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
