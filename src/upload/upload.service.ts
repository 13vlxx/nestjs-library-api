import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { GetUploadConfirmationDto } from './_utils/dto/responses/get-upload-confirmation.dto';
import { FormDataBookPictureDto } from './_utils/dto/requests/form-data-book-picture.dto';
import { FormDataMultipleFilesDto } from './_utils/dto/requests/form-data-multiple-files.dto';

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {}

  uploadFile(file: FormDataBookPictureDto): GetUploadConfirmationDto {
    const extension = path.extname(file.image.originalName);
    const uploadFolder = `./uploads/${extension.slice(1)}`;

    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }

    const filePath = path.join(
      uploadFolder,
      Date.now() +
        '_' +
        file.image.originalName.replace(/\s/g, '').toLowerCase(),
    );
    fs.writeFileSync(filePath, file.image.buffer);

    return {
      status: 'ok',
      message: 'file uploaded successfully',
    };
  }

  uploadFiles(formDataMultipleFilesDto: FormDataMultipleFilesDto) {
    console.log(formDataMultipleFilesDto);
  }
}
