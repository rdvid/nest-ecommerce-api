import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UserPayload } from './authentication.service';
import { JwtService } from '@nestjs/jwt';

export interface RequestWithUser extends Request {
  user: UserPayload
}

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private jwtService: JwtService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = this.getTokenFromRequestHeader(request);
    if(!token){
      throw new UnauthorizedException('erro de autenticação')
    }
    try {
      const payload: UserPayload = await this.jwtService.verifyAsync(token);
      request.user = payload;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('invalid Jwt token')
    }
    return true;
  }

  private getTokenFromRequestHeader(request: Request):string | undefined{
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
