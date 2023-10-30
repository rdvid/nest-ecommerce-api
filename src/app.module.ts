import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { PostgresConfigService } from './config/postgres.config.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule, 
    ProductModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [ PostgresConfigService ]
    }),

  ],
})
export class AppModule {}
