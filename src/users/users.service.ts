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

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersMapper: UsersMapper,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    const isUserExisting = await this.usersRepository.findUserByEmail(email);
    if (isUserExisting) throw new ConflictException('User already exists');
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersRepository.register(
      name,
      email,
      hashedPassword,
    );
    return this.usersMapper.toGetUserDto(user);
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.usersRepository.findUserByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    const arePasswordMatching = await bcrypt.compare(password, user.password);
    if (!arePasswordMatching)
      throw new UnauthorizedException('Incorrect email or password');
    return this.usersMapper.toGetUserDto(user);
  }

  async returnUserById(id: string) {
    return this.usersRepository.findUserById(id);
  }
}
