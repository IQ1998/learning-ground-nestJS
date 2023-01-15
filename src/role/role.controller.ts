import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRoleDto } from './dtos/create-role.dto';
import { RoleService } from './role.service';

@Controller('api/role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  async createRole(@Body() createRolePayload: CreateRoleDto) {
    return this.roleService.createRole(createRolePayload);
  }

  @Get()
  async listRole() {
    return this.roleService.findMany();
  }
}
