import { TrabalhoEntity } from '../entities/trabalho.entity';

export class CreateTrabalhoDto implements TrabalhoEntity {
  nome: string;
  descricao: string;
}
