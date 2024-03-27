import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TimestampToDatePipe } from '../pipe/timeStampeToDate';

@Module({
  controllers: [UserController],
  providers: [UserService,TimestampToDatePipe],
})
export class UserModule {}
