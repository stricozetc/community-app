import { RestorePasswordStatus } from 'models';

export interface RestorePasswordState {
  status: RestorePasswordStatus;
  userEmail: string;
}
