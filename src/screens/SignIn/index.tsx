import React,{useState} from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,/* consiga movimentar os elementos qd o teclado sobe. ele já tem flex:1 por padrão */
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native'

import {useTheme} from 'styled-components';

import {useAuth} from '../../hooks/auth';

import {ButtonRegister} from '../../components/ButtonRegister';
import {Input} from '../../components/Input';
import {PasswordInput} from '../../components/PasswordInput';

import {validationSignIn} from '../../utils/validations';

import { 
  Container,
  Header,
  Title,
  SubTitle,
  Form,
  Footer,
} from './styles';

export const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const theme = useTheme();

  const navigation = useNavigation();

  const {signIn} = useAuth();

  async function handleSignIn(){
    const error = await validationSignIn(email,password);
    if(error) {
      Alert.alert(error);
    }else{
      // aqui fazer o login com a api
      await signIn({email,password});
    }
  }

  function handleNewAccount(){
    navigation.navigate('SignUpFirstStep');
  }
  
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <Title>
              Estamos{'\n'} quase lá.
            </Title>
            <SubTitle>
              Faça seu login para começar{'\n'} 
              uma experiência incrível.
            </SubTitle>
          </Header>

          <Form>
            <Input 
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}/* não fica corrigindo palavras */
              autoCapitalize="none" /* não fica induzindo a colocar a primeira letra maiúscula */
              onChangeText={setEmail}
              value={email}
            />

            <PasswordInput 
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <ButtonRegister
              title="Login"
              onPress={handleSignIn}
              enabled={!!email  && !!password}
              loading={false}
            />

            <ButtonRegister
              title="Criar conta gratuita"
              color={theme.colors.background_secondary}
              onPress={handleNewAccount}
              loading={false}
              light
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

