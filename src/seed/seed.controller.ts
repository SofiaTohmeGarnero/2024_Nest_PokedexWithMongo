import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

/**
 * El controlador, su objetivo es escuchar las solicitudes y regresar respuestas.
 * Eso sería el objetivo principal de los controladores y el controlador no debería de realizar mucha lógica o
 * casi nada de lógica sobre las acciones o la lógica de negocio propiamente,
 * o las acciones que nosotros queremos ejecutar para crear o manipular la data.
 */

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  executeSeed() {
    return this.seedService.executeSeed();
  }

}
