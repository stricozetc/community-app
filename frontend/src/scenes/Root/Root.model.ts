import { AuthStatus } from 'models';
import { InjectedTranslateProps, InjectedI18nProps } from '../../../node_modules/@types/react-i18next';

export interface RootProps extends InjectedTranslateProps, InjectedI18nProps {
  status: AuthStatus;
  history: any;
  battleName: string;

  leaveBattle(battleName: string): void;

  logoutUser(): void;
}
