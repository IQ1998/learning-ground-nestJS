import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { UpdateDepartmentDto } from './dtos/update-department.dto';

@Controller('api/department')
export class DepartmentController {
  @Post()
  createDepartmentRoute(@Body() createDepartmentDto: CreateDepartmentDto) {
    return 'Created';
  }

  @Get()
  listDepartmentRoute() {
    return [
      {
        id: 1,
        message: 'OK',
      },
    ];
  }

  @Get(':id')
  findOneDepartmentRoute(@Param('id') id: string) {
    return `You've just found ${id}`;
  }

  @Put(':id')
  updateDepartmentRoute(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return `This action updates a #${id} Department`;
  }
}
