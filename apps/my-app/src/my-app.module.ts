import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MyAppController } from './my-app.controller';
import { MyAppService } from './my-app.service';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { DatabaseService } from './database.service';

@Module({
  imports: [UserModule],
  controllers: [MyAppController],
  providers: [MyAppService,DatabaseService],
})
export class MyAppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
