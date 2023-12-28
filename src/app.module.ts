import { ClassSerializerInterceptor, ConsoleLogger, Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { PostgresConfigService } from './config/postgres.config.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './modules/order/order.module';
import { GlobalExceptionHttpFilter } from './resources/filter/global-exception-http-filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { GlobalLoggerInterceptor } from './resources/intercepters/global-logger.interceptor';
import { LoggerModule } from './modules/logger/logger.module';
// TODO: change imports to relative

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => ({
        // setting redis and defining time to leave data (1h)_
        store: await redisStore({ ttl: 3600 * 1000 })
      }),
      isGlobal: true,
      
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [ PostgresConfigService ]
    }),
    UserModule, 
    ProductModule,
    OrderModule,
    AuthenticationModule,
    LoggerModule,
  ],
  providers: [
    {
      // defining my own filter of httperrorhandling
      provide: APP_FILTER,
      useClass: GlobalExceptionHttpFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalLoggerInterceptor
    },
    ConsoleLogger
  ]
})
export class AppModule {}
