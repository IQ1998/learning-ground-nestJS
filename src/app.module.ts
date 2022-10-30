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

@Module({
  imports: [
    DepartmentModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Department, Account],
      synchronize: true,
      // logging: true,
    }),
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(parseReqQuery).forRoutes({
      method: RequestMethod.GET,
      path: '*',
    });
  }
}
