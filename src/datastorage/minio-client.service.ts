/* eslint-disable @typescript-eslint/only-throw-error */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { Readable } from 'stream';
import { BufferedFile } from './interfaces/bufferedFile.interface';
import * as ShortUUID from 'short-uuid';
import { ConfigService } from '@nestjs/config';
import { PessoaService } from 'src/pessoa/pessoa.service';

@Injectable()
export class MinioClientService {
  private readonly logger: Logger;
  private readonly translator = ShortUUID();
  private bucketName: string;

  constructor(
    private readonly minioService: MinioService,
    private readonly configService: ConfigService,
    private readonly pessoaService: PessoaService,
  ) {
    const bucketNameVar = this.configService.get('MINIO_BUCKET_NAME');
    if (!bucketNameVar) {
      throw new NotFoundException(
        'Variável de ambiente do nome do bucket não definida',
      );
    }
    this.bucketName = bucketNameVar;
    this.logger = new Logger('MinioService');
    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: {
            AWS: ['*'],
          },
          Action: [
            's3:ListBucketMultipartUploads',
            's3:GetBucketLocation',
            's3:ListBucket',
          ],
          Resource: [`arn:aws:s3:::${this.bucketName}`],
        },
        {
          Effect: 'Allow',
          Principal: {
            AWS: ['*'],
          },
          Action: [
            's3:PutObject',
            's3:AbortMultipartUpload',
            's3:DeleteObject',
            's3:GetObject',
            's3:ListMultipartUploadParts',
          ],
          Resource: [`arn:aws:s3:::${this.bucketName}/*`],
        },
      ],
    };
    this.client.setBucketPolicy(
      process.env.MINIO_BUCKET_NAME!,
      JSON.stringify(policy),
      function (err) {
        if (err) throw err;
        console.log('Política do Bucket setada com sucesso');
      },
    );
  }

  public async upload(
    file: BufferedFile,
    bucketName: string = this.bucketName,
  ) {
    if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
      throw new HttpException('Invalid File Extension', HttpStatus.BAD_REQUEST);
    }

    const pessoaId = file.fieldname;
    const fileName = this.getFileName(file.originalname, pessoaId);

    this.client.putObject(
      bucketName,
      fileName,
      file.buffer,
      file.buffer.length,
      function (err, res) {
        if (err) {
          throw new HttpException(
            'Error In Uploading file',
            HttpStatus.BAD_REQUEST,
          );
        }
      },
    );

    await this.pessoaService.update(pessoaId, {
      profilePictureUrl: fileName,
    });
    return {
      url: this.generateFileUrl(fileName),
    };
  }

  private getFileName(originalName: string, pessoaId: string) {
    const extension = this.getFileExtension(originalName);

    return `${this.encodeUUID(pessoaId)}-profile-picture${extension}`;
  }

  async download(
    bucket: string = this.bucketName,
    fileName: string,
  ): Promise<Readable> {
    return await this.minioService.client.getObject(bucket, fileName);
  }

  async delete(bucket: string, fileName: string) {
    return await this.minioService.client.removeObject(bucket, fileName);
  }

  private encodeUUID(uuid: string): string {
    return this.translator.fromUUID(uuid);
  }

  private generateFileUrl(fileName: string) {
    return `${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET_NAME}/${fileName}`;
  }

  public getFileExtension(fileName: string) {
    return fileName.substring(fileName.lastIndexOf('.'), fileName.length);
  }

  public get client() {
    return this.minioService.client;
  }
}
