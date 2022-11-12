import { NextFunction, Response } from 'express';
import { cookieKey } from '../../account/account.constant';
import appSession from '../helper/session';
import { CustomRequest } from '../typing/class.typing';

// TODO: TEST the isAuthenticated flow
// Adding

export const isAuthenticated = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  // if (!req.cookies) {
  //   return res.status(401).json({
  //     message: 'Unauthorized',
  //     reason: 'No cookies detected',
  //   });
  // }

  const sessionKey = req.cookies[cookieKey];
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
};
