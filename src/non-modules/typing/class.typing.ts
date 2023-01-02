import { Request } from 'express';
import { ISessionPayload } from '../../account/account.constant';
export interface ClassType extends Function {
  new (...args: any[]): any;
}

export interface CustomRequest extends Request {
  session?: ISessionPayload;
}
