import { FileSystemStoredFile, HasMimeType, IsFiles } from 'nestjs-form-data';

export class FormDataMultipleFilesDto {
  @IsFiles()
  @HasMimeType(['image/png'])
  images: FileSystemStoredFile[];
}
