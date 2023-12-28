import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  imports: [ 
    UserModule, 
    JwtModule.register({
      global: true,
      secret: 'TOP_SECRET',
      signOptions: { expiresIn: '72h' }
    })
 ]
})
export class AuthenticationModule {}
