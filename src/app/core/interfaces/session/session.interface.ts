import { User } from '../user/user.interface';

export interface Session {
  user: User;
  token: string;
}
