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
import { CreateRegisPeriodDto } from './dtos/create-regis-period.dto';
import { UpdateRegisPeriodDto } from './dtos/update-regis-period.dto';
import { IlistQueryOptions } from './regis-period.constant';
import { RegisPeriodService } from './regis-period.service';

@Controller('api/regisPeriod')
export class RegisPeriodController {
  constructor(private regisPeriodService: RegisPeriodService) {}

  @Post()
  async createRegisPeriodRoute(
    @Body() createRegisPeriodDto: CreateRegisPeriodDto,
  ) {
    return this.regisPeriodService.createRegisPeriod(createRegisPeriodDto);
  }

  @Get()
  listRegisPeriodRoute(@Query() queryOptions: IlistQueryOptions) {
    return this.regisPeriodService.findMany(queryOptions);
  }

  @Get(':id')
  async findOneRegisPeriodRoute(@Param('id') id: string) {
    const foundRegisPeriod = await this.regisPeriodService.findOne(id);
    if (!foundRegisPeriod) {
      throw new HttpException(
        'RegisPeriod does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    return foundRegisPeriod;
  }

  @Put(':id')
  async updateRegisPeriodRoute(
    @Param('id') id: string,
    @Body() updateRegisPeriodDto: UpdateRegisPeriodDto,
  ) {
    const result = await this.regisPeriodService.patchRegisPeriod(
      id,
      updateRegisPeriodDto,
    );
    if (!result) {
      throw new HttpException(
        'RegisPeriod does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }
}
