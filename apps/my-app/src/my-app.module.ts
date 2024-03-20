import { Module } from '@nestjs/common';
import { MyAppController } from './my-app.controller';
import { MyAppService } from './my-app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [MyAppController],
  providers: [MyAppService],
})
export class MyAppModule {}
