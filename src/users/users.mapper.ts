import { Injectable } from '@nestjs/common';
import { UserDocument } from './user.schema';
import { GetUserDto } from './_utils/dto/responses/get-user.dto';

@Injectable()
export class UsersMapper {
  toGetUserDto = (user: UserDocument): GetUserDto => {
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
  };
}
