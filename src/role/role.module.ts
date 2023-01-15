import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './role.controller';
import Role from './role.entity';
import { RoleGuard } from './role.guard';
import { RoleService } from './role.service';

@Global()
@Module({
  controllers: [RoleController],
  providers: [RoleService, RoleGuard],
  imports: [TypeOrmModule.forFeature([Role])],
  exports: [RoleGuard, RoleService],
})
export class RoleModule {}
