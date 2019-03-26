import { Avatar } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import AdminIcon from '@material-ui/icons/SupervisorAccount';

import * as Cookies from 'js-cookie';
import * as jwt_decode from 'jwt-decode';
import * as React from 'react';
import { I18n } from 'react-i18next';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import {
  Landing,
  PageNotFound,
  CaEvents,
} from 'scenes';

import {
  AppState,
  ChangeLanguage,
  CloseSnackbar,
  FrontEndUser,
  LogoutUser,
  SetCurrentUser,
  store,
} from 'store';

import {
  getCurrentLanguage,
  getCurrentLanguageFromLocalStorage,
  setAuthToken
} from 'utils';

import {
  AppMenu,
  CaAddGame,
  CaEditGame,
  CaAddEvent,
  CaLogo,
  CaNavbar,
  CaSelect,
  CaSnackbar,
  LoginForm,
} from 'components';

import {
  AppMenuItem,
  AuthStatus,
  ErrorBlock,
  Languages,
  transitionDirection,
} from 'models';

import { CaMyGames } from '../MyGames/MyGames';

import { RootProps } from './Root.model';

import './root.scss';

const token = Cookies.get('jwtTokenAdmin');

if (token) {
  setAuthToken(token);
  const decoded: FrontEndUser = jwt_decode(token);
  store.dispatch(new SetCurrentUser(decoded));
}

export class RootComponent extends React.Component<RootProps> {

  public componentWillMount(): void {
    this.props.changeLanguage(getCurrentLanguageFromLocalStorage());
  }

  public closeSnackbar = () => {
    this.props.closeSnackbar();
  }

  public logoutUser = (): void => {
    this.props.logoutUser();
    this.props.history.push('/');
  }

  public redToLogin = (): void => {
    this.props.logoutUser();
    this.props.history.push('/login');
  }

  public redToMainPage = (): void => {
    this.props.history.push('/');
  }

  public handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const language = event.target.value;

    this.props.changeLanguage(language);
  }

  public getMenuProfilePanel = (): JSX.Element => {
    const { user } = this.props;

    return (
      <div className='app-menu__profile'>
        <div className='app-menu__profile-icon-block'>
          {
            user && user.imageUrl ?
              <Avatar src={user && user.imageUrl} />
              : <AccountCircle />
          }
        </div>
        <div className='app-menu__profile-text-block'>
          <div className='app-menu__profile-name'>
            {user && user.name}
          </div>
          <div className='app-menu__profile-email'>
            {user && user.email}
          </div>
        </div>
      </div>
    );
  }

  public getNavbar(authStatus: number): JSX.Element {

    const isAuthorized = authStatus === AuthStatus.Authorized;
    const appMenuItems: AppMenuItem[] = [
      {
        icon: <AdminIcon />,
        title: 'backToMainApp',
        action: () => window.location.href = 'http://localhost:3000/#/'
      },
      {
        icon: <LogoutIcon />,
        title: 'logout',
        action: isAuthorized ? this.logoutUser : this.redToLogin
      }
    ];

    const { user, isSnackbarOpen, snackbarType, errors } = this.props;

    return (
      <I18n>{
        (t, { i18n }) => (
          <CaNavbar
            linksToRender={[
              {
                text: t('events'),
                to: '/events',
                activeClassName: 'ca-navbar__nav-item--active',
                disabled: !isAuthorized
              },
              {
                text: t('games'),
                to: '/games',
                activeClassName: 'ca-navbar__nav-item--active',
                disabled: !isAuthorized
              }
            ]}
          >
            <div className='ca-navbar__menu-container'>
              {
                isAuthorized ?
                  <>
                    <AppMenu appMenuItems={appMenuItems} imageUrl={user && user.imageUrl} >
                      {this.getMenuProfilePanel()}
                    </AppMenu>
                    <div className='ca-navbar__profile-name'>{user && user.name}</div>
                  </>
                  : null
              }
            </div>

            <CaLogo
              text='battlenet'
              onClick={this.redToMainPage}
            />

            <div className='ca-navbar__select-language'>
              <CaSelect
                values={[Languages.En, Languages.Ru]}
                displayedValues={[t('ENToggle'), t('RUToggle')]}
                handleChange={this.handleChange}
                currentValue={getCurrentLanguage(i18n)}
              />
            </div>

            <CaSnackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={isSnackbarOpen}
              autoHideDuration={4000}
              handleClose={() => this.closeSnackbar()}
              type={snackbarType}
              transitionDirection={transitionDirection.Down}
              message={
                <div>
                  {errors.map((item: ErrorBlock, index: number) =>
                    <div key={index}>{item.msg}</div>)
                  }
                </div>
              }
            />
          </CaNavbar>
        )
      }
      </I18n>
    );
  }
  public render(): JSX.Element {
    const { status } = this.props;
    return (
      <Router>
        <div className='App'>
          {this.getNavbar(status)}
          <Switch>
            <Route
              exact={true}
              path='/'
              render={props => (
                <Landing {...props} />
              )}
            />

            <Route
              exact={true}
              path='/login'
              render={props => (
                <LoginForm {...props} />
              )}
            />

            <Route
              exact={true}
              path='/games'
              render={props => (
                <CaMyGames {...props} />
              )}
            />

            <Route
              exact={true}
              path='/games/add-game'
              render={props => (
                <CaAddGame {...props} />
              )}
            />

            <Route
              exact={true}
              path='/games/edit-game/:idOfTheGame'
              render={props => (
                <CaEditGame {...props} />
              )}
            />

            <Route
              exact={true}
              path='/events'
              render={props => (
                <CaEvents {...props} />
              )}
            />

            <Route
              exact={true}
              path='/events/add-event'
              render={props => (
                <CaAddEvent {...props} />
              )}
            />

            <Route
              path='/*'
              render={() => (
                <PageNotFound />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  status: state.auth.status,
  errors: state.snackbarUi.message,
  isSnackbarOpen: state.snackbarUi.isOpen,
  snackbarType: state.snackbarUi.type,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logoutUser: () => dispatch(new LogoutUser()),
  changeLanguage: (language: string) => dispatch(new ChangeLanguage(language)),
  closeSnackbar: () => dispatch(new CloseSnackbar()),
});

export const Root = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootComponent);
