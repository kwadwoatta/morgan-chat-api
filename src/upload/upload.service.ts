import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: process.env.AWS_S3_REGION ?? 'af-south-1',
  });

  constructor() {}

  upload(files: { key: string; file: Buffer }[]) {
    const uploadPromises = files.map(({ key, file }) => {
      return this.s3Client.send(
        new PutObjectCommand({
          Bucket: 'morganchat-bucket',
          Key: key,
          Body: file,
        }),
      );
    });

    return Promise.all(uploadPromises);
  }

  async getAllFiles(key: string): Promise<string[]> {
    const listObjectsCommand = new ListObjectsCommand({
      Bucket: 'morganchat-bucket',
      Prefix: key,
    });

    const { Contents } = await this.s3Client.send(listObjectsCommand);

    return Contents.map((object) => object.Key);
  }

  async getFile(key: string): Promise<{ buffer: Buffer; url: string }> {
    const getObjectCommand = new GetObjectCommand({
      Bucket: 'morganchat-bucket',
      Key: key,
    });

    const { Body } = await this.s3Client.send(getObjectCommand);

    const chunks: Uint8Array[] = [];
    for await (const chunk of Body as AsyncIterable<Uint8Array>) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    const url = `https://morganchat-bucket.s3.af-south-1.amazonaws.com/${key}`;

    return { buffer, url };
  }

  async deleteFile(key: string): Promise<void> {
    const deleteObjectCommand = new DeleteObjectCommand({
      Bucket: 'morganchat-bucket',
      Key: key,
    });

    await this.s3Client.send(deleteObjectCommand);
  }
}
