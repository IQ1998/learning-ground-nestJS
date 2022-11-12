import { ISessionPayload } from 'src/account/account.constant';

class AppSession {
  private session: Record<string, ISessionPayload>;
  // This fields is an array contain the sessionKey
  // Everytime we add a new entry, we add the key here
  // So all the key should be sorted by time, from low to hight
  // When we do our cron jobs, we can just iterate from 0 -> n
  // and check with the current time, the moment isSessionExpired
  // return false, we can stop, no need to traverse the whole session

  private sessionKeySortedByTime: string[];
  constructor() {
    this.session = {};
    this.sessionKeySortedByTime = [];
  }

  isSessionExpired(checkingKey: string): boolean {
    const currentTime = new Date();
    console.log(
      '🚀 ~ file: session.ts ~ line 21 ~ AppSession ~ isSessionExpired ~ this.session',
      this.session,
    );

    if (!this.session[checkingKey]) return true;
    console.log({
      currentTime: currentTime.getTime(),
      expireTime: this.session[checkingKey].expiredAt.getTime(),
    });
    if (currentTime.getTime() > this.session[checkingKey].expiredAt.getTime()) {
      return true;
    }
    return false;
  }

  setSession(key: string, payload: ISessionPayload) {
    console.log(`Setting ${key} with ${JSON.stringify(payload)}`);
    this.session[key] = { ...payload };
    this.sessionKeySortedByTime.push(key);
    console.log(this.session);
  }

  getSession(key: string): ISessionPayload {
    return this.session[key];
  }

  invalidate(key: string): void {
    delete this.session[key];
  }
}

const appSession = new AppSession();

export default appSession;
