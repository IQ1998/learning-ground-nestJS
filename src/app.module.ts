import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import Department from './department/department.entity';
import { DepartmentModule } from './department/department.module';
import { parseReqQuery } from './non-modules/middlewares/parseReqQuery.middleware';
import { AccountModule } from './account/account.module';
import Account from './account/account.entity';
import { isAuthenticated } from './non-modules/middlewares/auth.middleware';
import { RegisPeriodModule } from './regis-period/regis-period.module';
import { DepartmentRegisModule } from './department-regis/department-regis.module';
import RegisPeriod from './regis-period/regis-period.entity';
import DepartmentRegis from './department-regis/department-regis.entity';

@Module({
  imports: [
    DepartmentModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Department, Account, RegisPeriod, DepartmentRegis],
      synchronize: true,
      logging: true,
    }),
    AccountModule,
    RegisPeriodModule,
    DepartmentRegisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(isAuthenticated).forRoutes({
      method: RequestMethod.PATCH,
      path: '*account*',
    });
    consumer.apply(parseReqQuery).forRoutes({
      method: RequestMethod.GET,
      path: '*',
    });
  }
}
