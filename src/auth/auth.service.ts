import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { find } from 'rxjs';
import { CreateUserDto } from 'src/users/_utils/dto/requests/create-user.dto';
import { LoginUserDto } from 'src/users/_utils/dto/requests/login-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  async login(loginUserDto: LoginUserDto) {
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
