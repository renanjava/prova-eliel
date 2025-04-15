import { PessoaEntity } from '../entities/pessoa.entity';

export class CreatePessoaDto implements PessoaEntity {
  nome: string;
  cpf: string;
  trabalhoId: string;
}
