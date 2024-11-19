import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try{
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    }catch(error){
      if( error.code === 11000){
        throw new BadRequestException(`Pokemon exist in db ${JSON.stringify( error.keyValue )}`)
      }
      console.log(error);
      throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(searchTerm: string) {
    let pokemon: Pokemon;

    // search by number (no)
    if (!isNaN(+searchTerm)){ 
      pokemon = await this.pokemonModel.findOne({no: searchTerm});
    }

    // search by MongoId
    if(!pokemon && isValidObjectId(searchTerm)){
      pokemon = await this.pokemonModel.findById(searchTerm);
    }

    // search by name
    if(!pokemon){
      pokemon = await this.pokemonModel.findOne({name: searchTerm.toLowerCase().trim()});
    }

    if(!pokemon){
      throw new NotFoundException(`Pokemon with id, name or no "${searchTerm}" not found`)
    }
    return pokemon;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
