import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';

export class FormDataBookPictureDto {
  @IsFile()
  @MaxFileSize(1e6)
  @HasMimeType(['image/png', 'image/jpeg'])
  image: MemoryStoredFile;
}
