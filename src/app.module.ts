import { join } from 'path'; //viene con node
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    //esto es para servir contenido estatico (html), primero debemos instalar el paquete @nestjs/serve-static
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    //esto es para conectar la base de datos de mongo con la app de nest
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),

    PokemonModule,
  ],
})
export class AppModule {}
