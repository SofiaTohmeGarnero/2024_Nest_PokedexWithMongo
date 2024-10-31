import { join } from 'path'; //viene con node
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    //esto es para servir contenido estatico (html), primero debemos instalar el paquete @nestjs/serve-static
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    PokemonModule,
  ],
})
export class AppModule {}
