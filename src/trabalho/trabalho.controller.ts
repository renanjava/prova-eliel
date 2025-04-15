import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrabalhoService } from './trabalho.service';
import { CreateTrabalhoDto } from './dto/create-trabalho.dto';
import { UpdateTrabalhoDto } from './dto/update-trabalho.dto';

@Controller('trabalho')
export class TrabalhoController {
  constructor(private readonly trabalhoService: TrabalhoService) {}

  @Post()
  async create(@Body() createTrabalhoDto: CreateTrabalhoDto) {
    return await this.trabalhoService.create(createTrabalhoDto);
  }

  @Get()
  async findAll() {
    return await this.trabalhoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.trabalhoService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTrabalhoDto: UpdateTrabalhoDto,
  ) {
    return await this.trabalhoService.update(id, updateTrabalhoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.trabalhoService.remove(id);
  }
}
