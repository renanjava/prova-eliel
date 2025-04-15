import { PartialType } from '@nestjs/mapped-types';
import { CreateTrabalhoDto } from './create-trabalho.dto';

export class UpdateTrabalhoDto extends PartialType(CreateTrabalhoDto) {}
