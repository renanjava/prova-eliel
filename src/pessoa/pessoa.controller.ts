import { MinioClientService } from 'src/datastorage/minio-client.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { BufferedFile } from 'src/datastorage/interfaces/bufferedFile.interface';

@Controller('pessoa')
export class PessoaController {
  constructor(
    private readonly pessoaService: PessoaService,
    private readonly minioClientService: MinioClientService,
  ) {}

  @Post()
  async create(@Body() createPessoaDto: CreatePessoaDto) {
    return await this.pessoaService.create(createPessoaDto);
  }

  @Post('/:id')
  @UseInterceptors(FileInterceptor('image'))
  async uploadProfilePicture(
    @Param('id') id: string,
    @UploadedFile() image: BufferedFile,
  ) {
    await this.findOne(id);
    return await this.minioClientService.upload({
      ...image,
      id: id,
    });
  }

  @Get()
  async findAll() {
    return await this.pessoaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.pessoaService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePessoaDto: UpdatePessoaDto,
  ) {
    return await this.pessoaService.update(id, updatePessoaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.pessoaService.remove(id);
  }
}
