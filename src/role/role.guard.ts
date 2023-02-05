import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CustomRequest } from '../non-modules/typing/class.typing';
import { RoleService } from './role.service';

export enum RoleCode {
  chief = 'CHIEF',
  staff = 'STAFF',
  admin = 'ADMIN',
  user = 'user',
}

export const RoleKey = 'ROLE_KEY';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private roleService: RoleService, private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: CustomRequest = context.switchToHttp().getRequest();
    const thisRole = await this.roleService.findOne(request.session?.roleId);
    console.log(
      '🚀 ~ file: role.guard.ts:20 ~ RoleGuard ~ canActivate ~ thisRole',
      thisRole,
    );
    console.log(
      '🚀 ~ file: role.guard.ts:20 ~ RoleGuard ~ canActivate ~ request.session',
      request.session,
    );
    if (!thisRole) return false;
    const allowedRoleForThisRoute = this.reflector.get<RoleCode[]>(
      RoleKey,
      context.getHandler(),
    );

    if (thisRole.code === RoleCode.admin) {
      return true;
    }
    if (allowedRoleForThisRoute.includes(thisRole.code as RoleCode)) {
      return true;
    }
    return false;
  }
}
