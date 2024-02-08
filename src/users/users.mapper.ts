import { Injectable } from '@nestjs/common';
import { UserDocument } from './user.schema';
import { GetUserDto } from './_utils/dto/responses/get-user.dto';
import { UsersRepository } from './users.repository';
import { Types } from 'mongoose';

@Injectable()
export class UsersMapper {
  constructor(private readonly usersRepository: UsersRepository) {}

  toGetUserDto = (user: UserDocument): GetUserDto => ({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  });
}
