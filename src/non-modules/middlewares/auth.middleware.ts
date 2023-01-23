import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import {
  CONFIGURATION_PROVIDE_TOKEN,
  IAppConfig,
} from 'src/app-config/app-config.module';
import appSession from '../helper/session';
import { CustomRequest } from '../typing/class.typing';

// TODO: TEST the isAuthenticated flow
// Adding

@Injectable()
export class isAuthenticated implements NestMiddleware {
  constructor(
    @Inject(CONFIGURATION_PROVIDE_TOKEN) private readonly appConfig: IAppConfig,
  ) {}

  use(req: CustomRequest, res: Response, next: NextFunction) {
    // if (!req.cookies) {
    //   return res.status(401).json({
    //     message: 'Unauthorized',
    //     reason: 'No cookies detected',
    //   });
    // }

    const sessionKey = req.cookies[this.appConfig.cookieKey];
    if (!sessionKey) {
      return res.status(401).json({
        message: 'Unauthorized',
        reason: 'No sessionKey detected',
      });
    }

    if (appSession.isSessionExpired(sessionKey)) {
      return res.status(401).json({
        message: 'Unauthorized',
        reason: 'Expired',
      });
    }

    const userSession = appSession.getSession(sessionKey);
    req.session = userSession;
    next();
  }
}
