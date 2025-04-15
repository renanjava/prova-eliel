import { IsString } from 'class-validator';
import { TrabalhoEntity } from '../entities/trabalho.entity';

export class CreateTrabalhoDto implements TrabalhoEntity {
  @IsString()
  nome: string;

  @IsString()
  descricao: string;
}
