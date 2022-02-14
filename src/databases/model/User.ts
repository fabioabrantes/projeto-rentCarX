import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators'; // para representar cada campos que vai existir dentro da nossa model

// vai ser a representação do objeto que trafega da app para o BD
class User extends Model {
  static table = 'users'; // tem que ser o mesmo nome da tabela que existe no backend
  
  // o watermelondb gera seu id. esse user_id é o nome do campo na tabela do BD no backend
  @field('user_id') 
  user_id: string; // esse aqui é o nome do campo que vou usar no nosso modelo

  @field('name') 
  name: string;

  @field('email') 
  email: string;

  @field('driver_license') 
  driver_license: string;

  @field('avatar') 
  avatar: string;

  @field('token') 
  token: string;
}

export {User}

