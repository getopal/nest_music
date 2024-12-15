import {
  BadRequestException,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { audioStorage } from '../storage';

@Controller('upload')
@ApiTags('upload')
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor('audio', {
      storage: audioStorage,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        audio: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async create(
    @UploadedFile() audio: Express.Multer.File,
    @Req() req: Request,
  ) {
    if (!audio) {
      throw new BadRequestException('File upload failed');
    }

    const baseUrl = req.protocol + '://' + req.get('host');
    const fileUrl = `${baseUrl}/uploads/audio/${audio.filename}`;

    return { url: fileUrl };
  }
}
