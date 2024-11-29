import { join } from 'path'; //viene con node
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.config';

@Module({
  imports: [
    //esto es para poder setear las var de entorno (.env)
    ConfigModule.forRoot({
      load: [ EnvConfiguration ],
      validationSchema: JoiValidationSchema,
    }),

    //esto es para servir contenido estatico (html), primero debemos instalar el paquete @nestjs/serve-static
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    //esto es para conectar la base de datos de mongo con la app de nest
    MongooseModule.forRoot( process.env.MONGODB ),

    PokemonModule,

    CommonModule,

    SeedModule,
  ],
})
export class AppModule {}
