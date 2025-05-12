import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PessoaModule } from './pessoa/pessoa.module';
import { TrabalhoModule } from './trabalho/trabalho.module';
import { PrismaModule } from './database/prisma.module';
import { AppController } from './app.controller';
import { MinioClientModule } from './datastorage/minio-client.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PessoaModule,
    TrabalhoModule,
    PrismaModule,
    MinioClientModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
