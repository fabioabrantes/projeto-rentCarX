import * as Yup from 'yup';
import { validateBr } from 'js-brasil'; 


interface DataUser{
  name:string;
  email?:string;
  driverLicense:string;
}

/* Yup.addMethod(Yup.mixed, 'cnh',function(){
  return this.test({
    name:'cnh',
    message:'CNH incorreto',
    test: value => validateBr.cnh(value)
  });
}); */

export async function validationSignIn(email:string, password:string){
  try {
    const schema =Yup.object().shape({
      email:Yup.string().email('Digite um email válido'),
      password:Yup.string().min(8,'A senha tem que ser maior 8 caracteres')
    });
    
    await schema.validate({email,password});
  } catch (error) {
    if(error instanceof Yup.ValidationError){
      return error.message;
    }else{
      return 'Error! Ocorreu um erro ao fazer login.Tente novamente.'
    }
  }

}

export async function validationSignUpFirstStep({name,email,driverLicense}:DataUser){
  try {
    const schema =Yup.object().shape({
      driverLicense:Yup.string()
      .required('A CNH é obrigatória')
      .test('CNH', 'A CNH está incorreto', value => !isNaN(Number(value)) && validateBr.cnh(value)),
      email:Yup.string()
      .required('Email é obrigatório')
      .email('Digite um email válido'),
      name:Yup.string()
      .required('Nome é obrigatório')
      .min(3, 'O nome tem que no mínimo 3 dígitos')
    });

    await schema.validate({name,email, driverLicense});
  } catch (error) {
    if(error instanceof Yup.ValidationError){
      return error.message;
    }else{
      return 'Error: Algum problema na inserção dos dados. Tente novamente!'
    }
  }
  return;
}

export async function validationDataProfile({name,driverLicense}:DataUser){
  try {
    const schema =Yup.object().shape({
      driverLicense:Yup.string()
      .required('A CNH é obrigatória')
      .test('CNH', 'A CNH está incorreto', value => !isNaN(Number(value)) && validateBr.cnh(value)),
      name:Yup.string()
      .required('Nome é obrigatório')
      .min(3, 'O nome tem que no mínimo 3 dígitos')
    });

    await schema.validate({name,driverLicense});
  } catch (error) {
    if(error instanceof Yup.ValidationError){
      return error.message;
    }else{
      return 'Não foi possível atualizar o Perfil.'
    }
  }
  return;
}
