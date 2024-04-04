import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MyAppController } from './my-app.controller';
import { MyAppService } from './my-app.service';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from 'y/common/middleware/logger.middleware';


import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from 'y/common/exceptionFilter/global-exception.filter';
import { ResponseFormattingInterceptor } from 'y/common/interceptor/response-formatting.interceptor';
import { DatabaseService } from './database.provider';

@Module({
  imports: [
    // MongooseModule.forRootAsync({
    //   useClass: DatabaseService,
    // }),
    MongooseModule.forRoot('mongodb+srv://jaswant:l668xtw5aT9JIfep@cluster0.ethadiy.mongodb.net/'),
  UserModule,AuthModule],
  controllers: [MyAppController],
  providers: [
    MyAppService,
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
    // {
    //   provide: 'APP_INTERCEPTOR',
    //   useClass: ResponseFormattingInterceptor,
    // },
    // {
    //   provide: DatabaseService,
    //   useFactory: async () => {
    //     const dbService = new DatabaseService();
    //     await  dbService.connect();
    //     return  dbService;
    //   },
    // },
  ],
  
})
export class MyAppModule implements NestModule {
  
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
  //   constructor(private readonly dbService: DatabaseService) {
  //     this.dbService.connect(environment.production
        // ? process.env.PRODUCTION_MONGO_URL
        // : process.env.DEVELOPMENT_MONGO_URL;);
  // }
}
