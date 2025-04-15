import { Module } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { PessoaController } from './pessoa.controller';
import { PessoaRepository } from './pessoa.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PessoaController],
  providers: [PessoaService, PessoaRepository],
})
export class PessoaModule {}
