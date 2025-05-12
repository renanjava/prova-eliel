import { AppMimeType } from '../models/file.model';

export interface BufferedFile {
  id: string;
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: AppMimeType;
  size: number;
  buffer: Buffer | string;
}
