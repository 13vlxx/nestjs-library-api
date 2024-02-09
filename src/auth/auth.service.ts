import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/_utils/dto/requests/create-user.dto';
import { LoginUserDto } from 'src/users/_utils/dto/requests/login-user.dto';
import { UsersService } from 'src/users/users.service';
import { GetLoggedUserDto } from './_utils/dto/responses/get-logged-user.dto';
import { GetUserDto } from 'src/users/_utils/dto/responses/get-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<GetUserDto> {
    return await this.usersService.createUser(createUserDto);
  }

  async login(loginUserDto: LoginUserDto): Promise<GetLoggedUserDto> {
    const user = await this.usersService.loginUser(loginUserDto);
    const token = this.jwtService.sign({
      id: user.id,
    });
    return {
      user,
      token,
    };
  }
}
