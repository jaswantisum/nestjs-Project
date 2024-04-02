import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log('rol',requiredRoles)
    if (!requiredRoles) {
      return true; 
    }
    const { user } = context.switchToHttp().getRequest();
    const userRoles = user?.roles; 

    return requiredRoles.some(role => userRoles?.includes(role));
  }
}
