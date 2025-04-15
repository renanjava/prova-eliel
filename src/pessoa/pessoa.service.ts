import { Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { PessoaRepository } from './pessoa.repository';

@Injectable()
export class PessoaService {
  constructor(private readonly pessoaRepository: PessoaRepository) {}
  async create(createPessoaDto: CreatePessoaDto) {
    const { trabalhoId, ...trabalho } = createPessoaDto;
    return await this.pessoaRepository.createPessoa({
      ...trabalho,
      trabalho: { connect: { id: trabalhoId } },
    });
  }

  async findAll() {
    return await this.pessoaRepository.pessoas({});
  }

  async findOne(id: string) {
    return await this.pessoaRepository.pessoa({ id: id });
  }

  async update(id: string, updatePessoaDto: UpdatePessoaDto) {
    return await this.pessoaRepository.updatePessoa({
      where: { id: id },
      data: updatePessoaDto,
    });
  }

  async remove(id: string) {
    return await this.pessoaRepository.deletePessoa({ id: id });
  }
}
