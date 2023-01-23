import { IsNumber, IsString, validate } from 'class-validator';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import * as path from 'path';
import * as fs from 'fs';

interface IAppConfigOptions {
  path: string;
}

export class AppConfig {
  constructor(options: IAppConfigOptions) {
    const envFile = path.resolve(
      __dirname,
      '../../',
      options.path,
      `${process.env.NODE_ENV || 'development'}.env`,
    );
    const processEnv = dotenv.parse(
      fs.readFileSync(envFile, { encoding: 'utf8' }),
    );
    this.sessionExpire = parseInt(processEnv.SESSION_EXPIRE);
    this.nodeEnv = processEnv.NODE_ENV;
    this.cookieKey = processEnv.COOKIE_KEY;

    validate(this).then((errors) => {
      if (errors.length > 0) {
        console.log('Wrong app configurations', JSON.stringify(errors));
        // exit(1);
      }
    });
  }

  @IsNumber()
  sessionExpire: number;

  @IsString()
  nodeEnv: string;

  @IsString()
  cookieKey: string;
}
