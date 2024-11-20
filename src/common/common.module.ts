import { Module } from '@nestjs/common';
import { AxiosAdapter } from './http-adapters/axios.adapter';

/**
 * La principal característica de un provider es que se pueda inyectar
 * y los providers tienen que estar definidos en el módulo.
 */

@Module({
  providers: [AxiosAdapter],
  exports: [AxiosAdapter],
})
export class CommonModule {}
