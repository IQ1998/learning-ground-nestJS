import { DynamicModule, Global, Module } from '@nestjs/common';
import { AppConfig } from './appConfigs.provider';

export interface IAppConfig {
  sessionExpire: number;
  nodeEnv: string;
  cookieKey: string;
}

export const CONFIGURATION_PROVIDE_TOKEN = 'CONFIGURATION_PROVIDE_TOKEN';

@Global()
@Module({})
export class AppConfigModule {
  static register(): DynamicModule {
    return {
      module: AppConfigModule,
      providers: [
        {
          provide: CONFIGURATION_PROVIDE_TOKEN,
          useValue: new AppConfig({
            path: './',
          }),
        },
      ],
      exports: [CONFIGURATION_PROVIDE_TOKEN],
    };
  }
}
