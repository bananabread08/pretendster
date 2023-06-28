import { PublicUser } from '../types';

declare global {
  namespace Express {
    interface Request {
      user?: PublicUser;
    }
  }
}
