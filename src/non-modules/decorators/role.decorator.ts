import { SetMetadata } from '@nestjs/common';
import { RoleCode } from '../../role/role.guard';

export const Roles = (...roles: RoleCode[]) => SetMetadata('roles', roles);
