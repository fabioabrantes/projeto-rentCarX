import React, { useState } from 'react';
import { 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard,
  Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
// esse hook nos ajuda a pegar a altura da barra. isso vai servir para mostrar todos os inputs para o usuário quando for editar
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {useNetInfo} from '@react-native-community/netinfo';

import { useAuth } from '../../hooks/auth';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { ButtonRegister } from '../../components/ButtonRegister';
import { PasswordInput } from '../../components/PasswordInput';

import {validationDataProfile} from '../../utils/validations';

import { 
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section
} from './styles';

export const Profile: React.FC = () => {
  const { user, signOut,updatedUser} = useAuth();

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);
    
  const netInfo = useNetInfo();
  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit'){
    if(netInfo.isConnected === false && optionSelected === 'passwordEdit'){
      Alert.alert('Você está offline','Para mudar a senha, conecte-se a internet');
    }else{
      setOption(optionSelected);
    }
  }

  async function handleAvatarSelect() {
    const result = await ImagePicker.launchImageLibraryAsync({ // aqui pega uma imagem salva no dispositivo
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // aqui podemos pegar vídeos
      allowsEditing: true, // permite ao usar dar um crop na imagem
      aspect: [4, 4], // imagem fica quadradinha
      quality: 1,
    });

    if(result.cancelled){
      return;
    }

    if(result.uri){
      setAvatar(result.uri);
    }
  }

  async function handleProfileUpdate() {
    if (option === 'dataEdit'){
      const messageError = await validationDataProfile({name, driverLicense});
      if(!messageError){
        await updatedUser({
          id: user.id,
          user_id: user.user_id,
          email: user.email,
          name,
          driver_license: driverLicense,
          avatar,
          token: user.token
        });
        Alert.alert('Dados do Perfil atualizado!');
      }else{
        Alert.alert(messageError);
      } 
    }

  }

  async function handleSignOut() {
    Alert.alert(
      'Tem certeza?', 
      'Se você sair, vai perder os dados atualizados e irá precisar de internet para conectar-se novamente.',
      [
        {
          text: 'Cancelar',
          onPress: () => {},        
        },
        {
          text: "Sair",
          onPress: () => signOut()
        }
      ]
    );
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton 
                color={theme.colors.shape} 
                onPress={handleBack} 
              />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={theme.colors.shape}/>
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              { !!avatar && <Photo source={{ uri: avatar }} /> }
              <PhotoButton onPress={handleAvatarSelect}>
                <Feather name="camera" size={24} color={theme.colors.shape}/>
              </PhotoButton>
            </PhotoContainer>
          </Header>
        
          <Content style={{ marginBottom: useBottomTabBarHeight() }}> 
            <Options>
              <Option 
                active={option === 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
              </Option>
              
              <Option 
                active={option === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
              >
                <OptionTitle active={option === 'passwordEdit'}>Trocar senha</OptionTitle>
              </Option>
            </Options>

            {
              option === 'dataEdit' ?             
              <Section>
                <Input 
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={user.name}            
                  onChangeText={setName}
                />
                <Input 
                  iconName="mail"
                  editable={false}   // regra de negócio. não permite trocar de email  
                  defaultValue={user.email}       
                />
                <Input 
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"     
                  defaultValue={user.driver_license}        
                  onChangeText={setDriverLicense}      
                />
              </Section>
              :
              <Section>
                <PasswordInput 
                  iconName="lock"
                  placeholder="Senha atual"
                />
                <PasswordInput 
                  iconName="lock"
                  placeholder="Nova senha"
                />
                <PasswordInput 
                  iconName="lock"
                  placeholder="Repetir senha"                                    
                />
              </Section>
            }

            <ButtonRegister 
              title="Salvar alterações"
              onPress={handleProfileUpdate}
            />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
