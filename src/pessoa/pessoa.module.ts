import { Module } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { PessoaController } from './pessoa.controller';
import { PessoaRepository } from './pessoa.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { MinioClientModule } from 'src/datastorage/minio-client.module';

@Module({
  imports: [PrismaModule, MinioClientModule],
  controllers: [PessoaController],
  providers: [PessoaService, PessoaRepository],
  exports: [PessoaService],
})
export class PessoaModule {}
