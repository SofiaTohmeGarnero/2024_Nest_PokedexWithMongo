import { PartialType } from '@nestjs/mapped-types'; //indica que va a terner las mismas propiedades pero opcionales
import { CreatePokemonDto } from './create-pokemon.dto';

//updatePokemon va a tener las mismas propiedades que createPokemon pero opcionales
export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {}
