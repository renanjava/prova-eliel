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
  Res,
} from '@nestjs/common';
import { Response } from 'express';
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

  @Post('pfp/:id')
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

  @Get('pfp/:id')
  async findProfilePicture(@Param('id') id: string, @Res() res: Response) {
    const imageStream = await this.minioClientService.download(id);
    res.setHeader('Content-Type', 'image/jpeg');
    imageStream.pipe(res);
  }

  @Delete('pfp/:id')
  async removeProfilePicture(@Param('id') id: string) {
    return await this.minioClientService.delete(id);
  }

  @Get()
  async findAll() {
    return await this.pessoaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.pessoaService.findOne({ id });
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
