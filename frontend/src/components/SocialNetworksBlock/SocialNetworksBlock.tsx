import * as React from 'react';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import { I18n } from 'react-i18next';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import * as configFile from './../../config.json';

import { VkDialog } from 'components';
import {
    AuthStatus,
    GoogleErrorResponse,
    GoogleSuccessResponse,
    SnackbarType,
    SocialNetworksUser,
    VkSuccessResponse
} from 'models';
import { getCurrentLanguageFromLocalStorage } from 'utils';
import { SocialNetworksBlockProps, SocialNetworksBlockState, initLoginFormState } from './socialNetworkBlock.model';
import { Dispatch } from 'redux';
import { AppState, OpenSnackbar, SocialNetworksLogin } from 'store';
import { connect } from 'react-redux';

export class SocialNetworksBlock extends React.Component<SocialNetworksBlockProps, SocialNetworksBlockState> {

    constructor(props: SocialNetworksBlockProps) {
        super(props);

        this.state = initLoginFormState;
    }

    public componentWillReceiveProps(nextProps: SocialNetworksBlockProps): void {
        if (nextProps.status === AuthStatus.Authorized) {
            this.props.history.push('/homepage');
        }
    }

    public redToRegistratePage(): void {
        this.props.history.push('/register');
    }

    public redToForgetPassword(): void {
        this.props.history.push('/forget-password');
    }

    public successResponseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        const data: GoogleSuccessResponse = response as GoogleSuccessResponse;
        const user: SocialNetworksUser = {
            email: data.profileObj.email,
            language: getCurrentLanguageFromLocalStorage(),
            name: data.profileObj.givenName,
            accessToken: data.accessToken,
            imageUrl: data.profileObj.imageUrl,
        };

        this.props.socialNetworksLogin(user);
    }

    public errorResponseGoogle = (response: GoogleErrorResponse) => {
        return new OpenSnackbar({
            type: SnackbarType.Warning,
            messages: [{ msg: response.error }]
        });
    }

    public responseFacebook = (response: ReactFacebookLoginInfo) => {
        const user: SocialNetworksUser = {
            email: response.email,
            language: getCurrentLanguageFromLocalStorage(),
            name: response.name,
            accessToken: response.accessToken,
        };

        this.props.socialNetworksLogin(user);
    }

    public successResponseVk = (response: VkSuccessResponse, emailFromInput: string) => {
        const user: SocialNetworksUser = {
            email: emailFromInput,
            language: getCurrentLanguageFromLocalStorage(),
            name: response.first_name,
            accessToken: response.hash,
            imageUrl: response.photo_rec,
        };

        this.props.socialNetworksLogin(user);
    }

    public handleCloseVkDialog = () => {
        this.setState({ isVkDialogOpen: false });
    }

    public handleOpenVkDialog = () => {
        this.setState({ isVkDialogOpen: true });
    }

    public render(): JSX.Element {

        const { isVkDialogOpen } = this.state;

        return (
            <I18n>{(t) => (
                <div>
                    <div className='ca-login-form__form-text'>{t('loginWithSocialNetwork')}</div>
                    <div className='ca-login-form__socials-btn'>
                        <div className='ca-login-form__socials-btn-container'>
                            {/* isn't work without https on public host, and work on local host with http */}
                            <FacebookLogin
                                appId={configFile.frontEnd.facebookApi.id}
                                fields='name,email'
                                callback={this.responseFacebook}
                                cssClass='ca-login-form__facebook-btn'
                                textButton=''
                                icon='ca-login-form__custom-facebook'
                            />
                            <div className='ca-login-form__google-btn'>
                                <GoogleLogin
                                    className='ca-login-form__custom-google'
                                    tag='i'
                                    buttonText=''
                                    clientId={configFile.frontEnd.googleApi.id}
                                    onSuccess={this.successResponseGoogle}
                                    onFailure={this.errorResponseGoogle}
                                />
                            </div>
                            {/* <div
                                className='ca-login-form__vk-btn'
                                onClick={this.handleOpenVkDialog}
                            >
                                <i className='ca-login-form__custom-vk'></i>
                            </div>
                            hided vk auth */}
                        </div>
                        <VkDialog
                            apiId={configFile.frontEnd.vkApi.id}
                            className={'ca-login-form__vk-dialog'}
                            open={isVkDialogOpen}
                            onClose={this.handleCloseVkDialog}
                            onSuccess={
                                (response: VkSuccessResponse, email: string) =>
                                    this.successResponseVk(response, email)
                            }
                        />
                    </div>
                    {this.props.isRestorePasswordVisible ? <div>
                        <div className='ca-login-form__form-linked-text' onClick={() => this.redToForgetPassword()}>
                            {t('forgot-password')}
                        </div>
                        <div className='ca-login-form__form-linked-text' onClick={() => this.redToRegistratePage()}>
                            {t('register')}
                        </div>
                    </div> : null}
                </div>
            )
            }
            </I18n>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    status: state.auth.status,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    socialNetworksLogin: (socialNetworksUser: SocialNetworksUser) => dispatch(new SocialNetworksLogin(socialNetworksUser))
});

export const SocNetBlock = connect(
    mapStateToProps,
    mapDispatchToProps
)(SocialNetworksBlock);
