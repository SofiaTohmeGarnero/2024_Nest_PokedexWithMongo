import { join } from 'path'; //viene con node
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      })
  ],
})
export class AppModule {}
