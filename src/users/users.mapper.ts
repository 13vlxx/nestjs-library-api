import { Injectable } from '@nestjs/common';
import { UserDocument } from './user.schema';
import { GetUserDto } from './_utils/dto/responses/get-user.dto';
import { UsersRepository } from './users.repository';
import { Types } from 'mongoose';

@Injectable()
export class UsersMapper {
  constructor(private readonly usersRepository: UsersRepository) {}

  toFindAndGetUserDto = async (
    userId: string | Types.ObjectId,
  ): Promise<GetUserDto> => {
    const user = await this.usersRepository.findUserById(userId);

    return this.toGetUserDto(user);
  };

  toGetUserDto = (user: UserDocument): GetUserDto => {
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
  };
}
