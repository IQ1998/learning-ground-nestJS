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
  UseInterceptors,
} from '@nestjs/common';
import { ResponseSerializeInterceptor } from 'src/non-modules/interceptors/response-serialize.interceptor';
import { IlistQueryOptions } from './department.constant';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { OutgoingDepartmentDto } from './dtos/outgoing-department.dto';
import { UpdateDepartmentDto } from './dtos/update-department.dto';

@Controller('api/department')
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
    console.log(queryOptions);
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
