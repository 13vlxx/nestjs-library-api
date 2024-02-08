import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './_utils/dto/requests/create-user.dto';
import { LoginUserDto } from './_utils/dto/requests/login-user.dto';
import { UsersRepository } from './users.repository';
import { UsersMapper } from './users.mapper';
import { UserDocument } from './user.schema';
import { GetUserDto } from './_utils/dto/responses/get-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersMapper: UsersMapper,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<GetUserDto> {
    const { name, email, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersRepository.register(
      name,
      email,
      hashedPassword,
    );
    return this.usersMapper.toGetUserDto(user);
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<GetUserDto> {
    const { email, password } = loginUserDto;
    const user = await this.usersRepository.findUserByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    const arePasswordMatching = await bcrypt.compare(password, user.password);
    if (!arePasswordMatching)
      throw new UnauthorizedException('Incorrect email or password');
    return this.usersMapper.toGetUserDto(user);
  }

  async returnUserById(id: string): Promise<UserDocument> {
    return this.usersRepository.findUserById(id);
  }
}
