import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 }) //ordenamos por la columna no en ord asc
      .select('-__v'); //para quitar el campo __v (se lo restamos)
  }

  async findOne(searchTerm: string) {
    let pokemon: Pokemon;

    // search by number (no)
    if (!isNaN(+searchTerm)) {
      pokemon = await this.pokemonModel.findOne({ no: searchTerm });
    }

    // search by MongoId
    if (!pokemon && isValidObjectId(searchTerm)) {
      pokemon = await this.pokemonModel.findById(searchTerm);
    }

    // search by name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: searchTerm.toLowerCase().trim(),
      });
    }

    if (!pokemon) {
      throw new NotFoundException(
        `Pokemon with id, name or no "${searchTerm}" not found`,
      );
    }
    return pokemon;
  }

  async update(searchTerm: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(searchTerm);
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    try {
      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    /**
     * Esto sirve para eliminar el pokemon ya sea que envíe el MongoId/no/name
     *
     * const pokemon = await this.findOne(id);
     * await pokemon.deleteOne();
     */

    //Pero quiero construir mi BE donde solo se pueda eliminar el pokemon por su MongoId (por eso utilicé el ParseMongoIdPipe en el controller)

    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id "${id}" not found`);
    }
    return;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon exist in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't update Pokemon - Check server logs`,
    );
  }
}
