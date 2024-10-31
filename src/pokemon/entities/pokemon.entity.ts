/**
 * Entity: es básicamente la representación de lo que nosotros vamos a estar grabando en la base de datos.
 * Es decir que podría verse como una tabla, aunque vamos a estar trabajando con mongo en este ejercicio,
 * entonces podría ser o verse como una entrada en la colección que nosotros vamos a tener.
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
  //id: string No lo tengo que especificar porque Mongo me lo crea automaticamente

  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    unique: true,
    index: true,
  })
  no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
