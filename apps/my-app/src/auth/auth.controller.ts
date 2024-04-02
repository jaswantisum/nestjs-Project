import {
  BadRequestException,
  Controller,
  ForbiddenException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
  ) {}

  // @UseGuards(AuthGuard('jwt'))
  @Post('login')
  async login(@Request() req) {
    try {
      const user = await this.userService.findbyEmail(req.body.email);

      if (!user) {
        throw new BadRequestException('user not found');
      }
      const isMatch: boolean = bcrypt.compareSync(
        req.body.password,
        user.password,
      );

      if (!isMatch) {
        throw new BadRequestException('Password does not match');
      }
      return await this.authService.validateUser(user);
    } catch (error) {
      throw new ForbiddenException('Incorrect credentials');
    }
  }
}
