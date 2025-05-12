/* eslint-disable @typescript-eslint/require-await */
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MinioModule } from 'nestjs-minio-client';
import { MinioClientService } from './minio-client.service';
import { PessoaModule } from 'src/pessoa/pessoa.module';

@Module({
  imports: [
    forwardRef(() => PessoaModule),
    MinioModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        endPoint: configService.get<string>('MINIO_ENDPOINT') || 'localhost',
        port: parseInt(configService.get<string>('MINIO_PORT') || '9000', 10),
        useSSL: false,
        accessKey:
          configService.get<string>('MINIO_ACCESS_KEY') || 'defaultAccessKey',
        secretKey:
          configService.get<string>('MINIO_SECRET_KEY') || 'defaultSecretKey',
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule {}
