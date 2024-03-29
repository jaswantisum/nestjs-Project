import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TimestampToDatePipe } from '../pipe/timeStampeToDate';
import { DatabaseService } from '../database.service';

@Module({
  imports:[],
  controllers: [UserController],
  providers: [UserService,TimestampToDatePipe,DatabaseService],
})
export class UserModule {}
