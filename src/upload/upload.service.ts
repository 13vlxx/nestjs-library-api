import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { FormDataBookPictureDto } from './_utils/dto/requests/form-data-book-picture.dto';
import { FormDataMultipleFilesDto } from './_utils/dto/requests/form-data-multiple-files.dto';
import { GetUploadConfirmationDto } from './_utils/dto/responses/get-upload-confirmation.dto';

@Injectable()
export class UploadService {
  constructor() {}

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
