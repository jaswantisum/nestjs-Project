import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TimestampToDatePipe } from '../../../../libs/common/src/pipe/timeStampeToDate';
import { DatabaseService } from '../database.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { Address,AddressSchema } from './schema/address.schema';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from 'y/common/guard/jwt-auth.guard';
import { IsEmailUnique } from './validator/isEmailUnique.validator';

@Module({
  imports:[ MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: Address.name, schema: AddressSchema }
    
  ])],
  controllers: [UserController],
  providers: [UserService,IsEmailUnique
    
  ],
  exports:[UserService]
})
export class UserModule {}
