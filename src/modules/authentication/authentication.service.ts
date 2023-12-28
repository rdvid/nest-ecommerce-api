import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface UserPayload {
  sub: string;
  username: string;
}

@Injectable()
export class AuthenticationService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}


  async login(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);

    const loggedUser = await bcrypt.compare(password, user.password);

    if(!loggedUser){
      throw new UnauthorizedException('invalid email or password')
    }

    const payload: UserPayload = {
      sub: user.id,
      username: user.name
    };

    return {
      access_token: await this.jwtService.signAsync(payload)
    }

  }

}
