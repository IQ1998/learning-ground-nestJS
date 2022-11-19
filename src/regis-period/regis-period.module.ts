import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisPeriodController } from './regis-period.controller';
import RegisPeriod from './regis-period.entity';
import { RegisPeriodService } from './regis-period.service';

@Module({
  controllers: [RegisPeriodController],
  providers: [RegisPeriodService],
  imports: [TypeOrmModule.forFeature([RegisPeriod])],
})
export class RegisPeriodModule {}
