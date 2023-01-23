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
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { FailedQueryExceptionFilter } from '../non-modules/helper/failed-query-exception.filter';
import { ResponseSerializeInterceptor } from '../non-modules/interceptors/response-serialize.interceptor';
import { IlistQueryOptions } from './department.constant';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { OutgoingDepartmentDto } from './dtos/outgoing-department.dto';
import { UpdateDepartmentDto } from './dtos/update-department.dto';

@Controller('api/department')
// Controller scoped filter, can be set as global filter,
// but I leave it here for demonstrate purpose
@UseFilters(FailedQueryExceptionFilter)
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Post()
  async createDepartmentRoute(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ) {
    return this.departmentService.createDepartment(createDepartmentDto);
  }

  @Get()
  listDepartmentRoute(@Query() queryOptions: IlistQueryOptions) {
    return this.departmentService.findMany(queryOptions);
  }

  @UseInterceptors(new ResponseSerializeInterceptor(OutgoingDepartmentDto))
  @Get(':id')
  async findOneDepartmentRoute(@Param('id') id: string) {
    const foundDepartment = await this.departmentService.findOne(id);
    if (!foundDepartment) {
      throw new HttpException(
        'Department does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    return foundDepartment;
  }

  @Put(':id')
  async updateDepartmentRoute(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    const result = await this.departmentService.patchDepartment(
      id,
      updateDepartmentDto,
    );
    if (!result) {
      throw new HttpException(
        'Department does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }
}
