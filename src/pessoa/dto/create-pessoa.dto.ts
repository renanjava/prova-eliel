import { IsOptional, IsString, IsUUID } from 'class-validator';
import { PessoaEntity } from '../entities/pessoa.entity';

export class CreatePessoaDto implements PessoaEntity {
  @IsString()
  nome: string;

  @IsString()
  cpf: string;

  @IsUUID()
  trabalhoId: string;

  @IsOptional()
  @IsString()
  fotoPerfil?: string | undefined;
}
