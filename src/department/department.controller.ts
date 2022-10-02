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
} from '@nestjs/common';
import { IlistQueryOptions } from './department.constant';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dtos/create-department.dto';
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

  // TODO: implement Error handling with logging and correct stack trace

  @Put(':id')
  updateDepartmentRoute(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return `This action updates a #${id} Department`;
  }
}
