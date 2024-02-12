import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FormDataRequest } from 'nestjs-form-data';
import { FormDataBookPictureDto } from './_utils/dto/requests/form-data-book-picture.dto';
import { FormDataMultipleFilesDto } from './_utils/dto/requests/form-data-multiple-files.dto';
import { Protect } from 'src/auth/_utils/decorators/protect.decorator';

@Protect()
@ApiTags('Uploads')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  // @Post()
  // @UseInterceptors(FileInterceptor('file'))
  // @ApiOperation({ summary: 'Upload a file' })
  // uploadFile(
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [
  //         new MaxFileSizeValidator({ maxSize: 1000000 }),
  //         new FileTypeValidator({ fileType: '' }),
  //       ],
  //     }),
  //   )
  //   file: Express.Multer.File,
  // ): GetUploadConfirmationDto {
  //   return this.uploadService.uploadFile(file);
  // }

  @Post('single')
  @ApiOperation({ summary: 'Upload a file' })
  @FormDataRequest()
  uploadFile(@Body() formDataBookPictureDto: FormDataBookPictureDto) {
    return this.uploadService.uploadFile(formDataBookPictureDto);
  }

  @Post('multiple')
  @ApiOperation({ summary: 'Upload multiple files' })
  @FormDataRequest()
  uploadFiles(@Body() formDataMultipleFilesDto: FormDataMultipleFilesDto) {
    return this.uploadService.uploadFiles(formDataMultipleFilesDto);
  }
}
