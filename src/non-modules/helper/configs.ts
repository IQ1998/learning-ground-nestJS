import { IsNumber, validate } from 'class-validator';
import { exit } from 'process';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config({
  debug: true,
});
class AppConfig {
  @IsNumber()
  sessionExpire: number;
}

const appConfigs = new AppConfig();
appConfigs.sessionExpire = parseInt(process.env.SESSION_EXPIRE);

validate(appConfigs).then((errors) => {
  if (errors.length > 0) {
    console.log('Wrong app configurations', JSON.stringify(errors));
    exit(1);
  }
});

export default appConfigs;
