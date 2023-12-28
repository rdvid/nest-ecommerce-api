import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticateDto } from './dto/authenticate.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  login(
    @Body() { email, password }: AuthenticateDto
  ) {
    return this.authenticationService.login(email, password);
  }

}
