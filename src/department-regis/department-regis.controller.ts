import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { CreateDepartmentRegisDto } from './dtos/create-department-regis.dto';
import { UpdateDepartmentRegisDto } from './dtos/update-department-regis.dto';
import { IlistQueryOptions } from './department-regis.constant';
import { DepartmentRegisService } from './department-regis.service';
import { RoleCode, RoleGuard, RoleKey } from '../role/role.guard';

@Controller('api/departmentRegis')
@UseGuards(RoleGuard)
export class DepartmentRegisController {
  constructor(private departmentRegisService: DepartmentRegisService) {}

  @Post()
  @SetMetadata(RoleKey, [RoleCode.admin])
  async createDepartmentRegisRoute(
    @Body() createDepartmentRegisDto: CreateDepartmentRegisDto,
  ) {
    return this.departmentRegisService.createDepartmentRegis(
      createDepartmentRegisDto,
    );
  }

  @Get()
  @SetMetadata(RoleKey, [RoleCode.user])
  listDepartmentRegisRoute(@Query() queryOptions: IlistQueryOptions) {
    return this.departmentRegisService.findMany(queryOptions);
  }

  @Get('/haveRegistered')
  listDepartmentRegisteredRoute(@Query() queryOptions: IlistQueryOptions) {
    return this.departmentRegisService.findRegistered(queryOptions);
  }

  @Get('/haveNotRegistered')
  listDepartmentNotRegisteredRoute(@Query() queryOptions: IlistQueryOptions) {
    return this.departmentRegisService.findNotRegistered(queryOptions);
  }

  @Get(':id')
  async findOneDepartmentRegisRoute(@Param('id') id: string) {
    const foundDepartmentRegis = await this.departmentRegisService.findOne(id);
    if (!foundDepartmentRegis) {
      throw new HttpException(
        'DepartmentRegis does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    return foundDepartmentRegis;
  }

  @Put(':id')
  async updateDepartmentRegisRoute(
    @Param('id') id: string,
    @Body() updateDepartmentRegisDto: UpdateDepartmentRegisDto,
  ) {
    const result = await this.departmentRegisService.patchDepartmentRegis(
      id,
      updateDepartmentRegisDto,
    );
    if (!result) {
      throw new HttpException(
        'DepartmentRegis does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }
}
