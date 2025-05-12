import { Module } from '@nestjs/common';
import { TrabalhoService } from './trabalho.service';
import { TrabalhoController } from './trabalho.controller';
import { TrabalhoRepository } from './trabalho.repository';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TrabalhoController],
  providers: [TrabalhoService, TrabalhoRepository],
})
export class TrabalhoModule {}
