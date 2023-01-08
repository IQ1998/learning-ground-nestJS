import { IsNumber, IsString, validate } from 'class-validator';
import { exit } from 'process';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config({
  debug: true,
});
class AppConfig {
  @IsNumber()
  sessionExpire: number;

  @IsString()
  nodeEnv: string;
}

const appConfigs = new AppConfig();
appConfigs.sessionExpire = parseInt(process.env.SESSION_EXPIRE);
appConfigs.nodeEnv = process.env.NODE_ENV;
console.log(
  '🚀 ~ file: configs.ts:19 ~ process.env.NODE_ENV',
  process.env.NODE_ENV,
);

validate(appConfigs).then((errors) => {
  if (errors.length > 0) {
    console.log('Wrong app configurations', JSON.stringify(errors));
    exit(1);
  }
});

export default appConfigs;
