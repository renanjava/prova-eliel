/* eslint-disable @typescript-eslint/await-thenable */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { PessoaRepository } from './pessoa.repository';
import { MinioClientService } from 'src/datastorage/minio-client.service';
import { BufferedFile } from 'src/datastorage/interfaces/bufferedFile.interface';

@Injectable()
export class PessoaService {
  constructor(
    private readonly pessoaRepository: PessoaRepository,
    private readonly minioClientService: MinioClientService,
  ) {}
  async create(createPessoaDto: CreatePessoaDto) {
    const { trabalhoId, ...trabalho } = createPessoaDto;
    return await this.pessoaRepository.createPessoa({
      ...trabalho,
      trabalho: { connect: { id: trabalhoId } },
    });
  }

  async uploadProfilePicture(file: BufferedFile) {
    if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
      throw new HttpException('Invalid File Extension', HttpStatus.BAD_REQUEST);
    }
    const imageUrl = await this.minioClientService.upload(file);
    return {
      url: imageUrl,
    };
  }

  async findAll() {
    return await this.pessoaRepository.pessoas({});
  }

  async findOne(id: string) {
    const pessoaFounded = await this.pessoaRepository.pessoa({ id: id });
    if (!pessoaFounded) {
      throw new NotFoundException('Pessoa não encontrada');
    }
    return pessoaFounded;
  }

  async update(id: string, updatePessoaDto: UpdatePessoaDto) {
    await this.findOne(id);
    return await this.pessoaRepository.updatePessoa({
      where: { id: id },
      data: updatePessoaDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.pessoaRepository.deletePessoa({ id: id });
  }
}
