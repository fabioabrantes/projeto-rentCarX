import {appSchema} from '@nozbe/watermelondb';

import {userSchema} from './userSchema';
import { carSchema } from './carSchema';

const schemas = appSchema({
  version:2, // versao do BD
  tables:[
    userSchema,
    carSchema
  ] // aqui informa as tabelas existentes que vai utilizar
});

export {schemas}