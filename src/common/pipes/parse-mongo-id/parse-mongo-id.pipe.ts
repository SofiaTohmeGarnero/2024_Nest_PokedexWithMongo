import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

//Los Pipes transforman la data, no es que hacen el cambio visualmente, sino que realizan el cambio físicamente (de manera real y permanente)

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if(!isValidObjectId(value)){
      throw new BadRequestException(`${value} is not a valid MongoId`)
    }
    return value;
  }
}
