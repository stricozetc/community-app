import { History } from 'history';
import { AuthStatus, SocialNetworksUser } from 'models';

export interface SocialNetworksBlockProps {
    history: History;
    status: AuthStatus;
    isRestorePasswordVisible: boolean;

    socialNetworksLogin(socialNetworksUser: SocialNetworksUser): void;
}

export interface SocialNetworksBlockState {
    isVkDialogOpen: boolean;
}

export const initLoginFormState: SocialNetworksBlockState = {
    isVkDialogOpen: false,
};
