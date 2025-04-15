import { Module } from '@nestjs/common';
import { PessoaModule } from './pessoa/pessoa.module';
import { TrabalhoModule } from './trabalho/trabalho.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PessoaModule, TrabalhoModule, PrismaModule],
})
export class AppModule {}
