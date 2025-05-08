import { Module } from '@nestjs/common';
import { PessoaModule } from './pessoa/pessoa.module';
import { TrabalhoModule } from './trabalho/trabalho.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';

@Module({
  imports: [PessoaModule, TrabalhoModule, PrismaModule],
  controllers: [AppController],
})
export class AppModule {}
