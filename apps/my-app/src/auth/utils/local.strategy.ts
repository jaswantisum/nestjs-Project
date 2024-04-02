import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { User } from '../../user/schema/user.schema';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(param: User): Promise<any> {
    const user = await this.authService.validateUser(param);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
