import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { GetUploadConfirmationDto } from './_utils/dto/responses/get-upload-confirmation.dto';

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {}

  uploadFile(file: Express.Multer.File): GetUploadConfirmationDto {
    const extension = path.extname(file.originalname);
    const uploadFolder = `./src/upload/uploaded_files/${extension.slice(1)}`;

    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }

    const filePath = path.join(
      uploadFolder,
      Date.now() + '_' + file.originalname.replace(/\s/g, '').toLowerCase(),
    );
    fs.writeFileSync(filePath, file.buffer);

    return {
      status: 'ok',
      message: 'file uploaded successfully',
    };
  }
}
