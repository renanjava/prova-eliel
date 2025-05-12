/* eslint-disable @typescript-eslint/only-throw-error */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { Readable } from 'stream';
import { BufferedFile } from './interfaces/bufferedFile.interface';
import * as ShortUUID from 'short-uuid';

@Injectable()
export class MinioClientService {
  private readonly bucketName = process.env.MINIO_BUCKET_NAME;
  private readonly logger: Logger;
  private readonly translator = ShortUUID();

  constructor(private readonly minioService: MinioService) {
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
        console.log('Bucket policy set');
      },
    );
  }

  public upload(file: BufferedFile, bucketName: string = this.bucketName!) {
    const fileName = this.getFileName(file.originalname, file.fieldname);

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

    return this.generateFileUrl(fileName);
  }

  getFileName(originalName: string, fieldName: string) {
    const extension = this.getFileExtension(originalName);

    return `${this.encodeUUID(fieldName)}-profile-picture${extension}`;
  }

  async download(bucket: string, fileName: string): Promise<Readable> {
    return await this.minioService.client.getObject(bucket, fileName);
  }

  async delete(bucket: string, fileName: string) {
    return await this.minioService.client.removeObject(bucket, fileName);
  }

  encodeUUID(uuid: string): string {
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
