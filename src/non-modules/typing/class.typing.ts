import { Request } from 'express';
import { ISessionPayload } from 'src/account/account.constant';
export interface ClassType extends Function {
  new (...args: any[]): any;
}

export interface CustomRequest extends Request {
  session?: ISessionPayload;
}
