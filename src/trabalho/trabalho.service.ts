import { Injectable } from '@nestjs/common';
import { CreateTrabalhoDto } from './dto/create-trabalho.dto';
import { UpdateTrabalhoDto } from './dto/update-trabalho.dto';
import { TrabalhoRepository } from './trabalho.repository';

@Injectable()
export class TrabalhoService {
  constructor(private readonly trabalhoRepository: TrabalhoRepository) {}
  async create(createTrabalhoDto: CreateTrabalhoDto) {
    return await this.trabalhoRepository.createTrabalho(createTrabalhoDto);
  }

  async findAll() {
    return await this.trabalhoRepository.trabalhos({});
  }

  async findOne(id: string) {
    return await this.trabalhoRepository.trabalho({ id: id });
  }

  async update(id: string, updateTrabalhoDto: UpdateTrabalhoDto) {
    return await this.trabalhoRepository.updateTrabalho({
      where: { id: id },
      data: updateTrabalhoDto,
    });
  }

  async remove(id: string) {
    return await this.trabalhoRepository.deleteTrabalho({ id: id });
  }
}
