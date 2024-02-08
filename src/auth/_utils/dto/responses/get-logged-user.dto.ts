import { GetUserDto } from 'src/users/_utils/dto/responses/get-user.dto';

export class GetLoggedUserDto {
  user: GetUserDto;
  token: string;
}
