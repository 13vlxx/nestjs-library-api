import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { CreateUserDto } from './_utils/dto/requests/create-user.dto';
import { LoginUserDto } from './_utils/dto/requests/login-user.dto';
import { GetUserDto } from './_utils/dto/responses/get-user.dto';
import { UserDocument } from './user.schema';
import { UsersMapper } from './users.mapper';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly emailService: EmailService,
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

    this.emailService.sendRegistrationConfirmationEmail({
      toEmail: email,
      subject: 'Welcome to our library !',
      content: `Hello ${name}`,
    });

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
    return await this.usersRepository.findUserById(id);
  }

  async deleteUser(userId: string) {
    return await this.usersRepository.delete(userId);
  }
}
