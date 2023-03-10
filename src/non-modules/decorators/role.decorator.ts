import { SetMetadata } from '@nestjs/common';
import { RoleCode } from '../../role/role.constant';

export const Roles = (...roles: RoleCode[]) => SetMetadata('roles', roles);
