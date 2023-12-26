import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { PostgresConfigService } from './config/postgres.config.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './modules/order/order.module';
import { GlobalExceptionHttpFilter } from './resources/filter/global-exception-http-filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    UserModule, 
    ProductModule,
    OrderModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [ PostgresConfigService ]
    }),
  ],
  providers: [{
    provide: APP_FILTER,
    useClass: GlobalExceptionHttpFilter
  }]
})
export class AppModule {}
