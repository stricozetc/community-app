import * as React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { CaSelect } from 'components/form-controls/CaSelect';
import { i18n } from 'i18next';
import * as Cookies from 'js-cookie';
import * as jwt_decode from 'jwt-decode';
import { AuthStatus, languages } from 'models';
import { I18n } from 'react-i18next';
import { CaBattles } from 'scenes/Battles';
import { CurrentBattle } from 'scenes/Battles';
import { Landing } from 'scenes/Landing';
import { CaStatisticPage } from 'scenes/Statistic';
import { AppState, CleanStatistic, FrontEndUser, LeaveBattle, LogoutUser, SetCurrentUser, store } from 'store';
import { getCurrentLanguage, setAuthToken } from 'utils';

import {
  CaButton,
  CaLogo,
  CaNavbar,
  LoginForm,
  RegistrationForm
} from 'components';

import { PageNotFound } from '../PageNotFound';

import { RootProps } from './Root.model';
import './root.scss';
import { CaMyGames } from '../MyGames/MyGames';

const token = Cookies.get('jwtToken');
if (token) {
  setAuthToken(token);
  const decoded: FrontEndUser = jwt_decode(token);
  store.dispatch(new SetCurrentUser(decoded));
}

export class RootComponent extends React.Component<RootProps> {

  public logoutUser(): void {
    this.props.logoutUser();
    this.props.cleanStatistic();
    this.props.history.push('/');

    const userInBattle = !!this.props.battleName;

    if (userInBattle) {
      this.props.leaveBattle(this.props.battleName);
    }

  }

  public redToLogin(): void {
    this.props.logoutUser();
    this.props.history.push('/login');
  }

  public handleChange = (event: any, i18n: i18n) => {
    const language = event.target.value;

    i18n.changeLanguage(language);
  }

  public getButton(authStatus: number): JSX.Element {
    const isAuthorized = authStatus === AuthStatus.AUTHORIZED;

    return (
      isAuthorized ?

        <I18n>
          {
            ( t ) => (
              <CaButton
                onClick={() => this.logoutUser()}
              >
                {t('logout')}
              </CaButton>
            )
          }
        </I18n>
        :

        <I18n>
          {
            ( t ) => (
              <CaButton
                onClick={() => this.redToLogin()}
              >
                {t('login')}
              </CaButton>
            )
          }
        </I18n>
    );
  }

  public getNavbar(authStatus: number): JSX.Element {
    const isAuthorized = authStatus === AuthStatus.AUTHORIZED;

    return (
<I18n>
        {
          ( t, { i18n } ) => (
            <CaNavbar
              linksToRender={[
                {
                  text: t('battles'),
                  to: '/battles',
                  activeClassName: 'ca-navbar__nav-item--active',
                  disabled: !isAuthorized
                },
                {
                  text: t('statistics'),
                  to: '/statistics',
                  activeClassName: 'ca-navbar__nav-item--active',
                  disabled: !isAuthorized
                }
              ]}
            >
              <CaLogo
                text='battlenet'
              />
              <div className='ca-navbar__logout-btn-container'>
                {this.getButton(this.props.status)}
              </div>

              <div className='ca-navbar__select-language'>
                <CaSelect
                  languages={[languages.en, languages.ru]}
                  displayedLanguages={[t('ENToggle'), t('RUToggle')]}
                  handleChange={this.handleChange}
                  currLang={getCurrentLanguage(i18n)}
                />
              </div>
            </CaNavbar>
          )
        }
      </I18n>
    );
  }

  public render(): JSX.Element {
    return (
      <Router>
        <div className='App'>
          <Switch>
            <Route
              exact={true}
              path='/'
              render={props =>
                <Landing {...props} >
                  {this.getNavbar(this.props.status)}
                </Landing>
              }
            />

            <Route
              exact={true}
              path='/register'
              render={props =>
                <RegistrationForm {...props} >
                  {this.getNavbar(this.props.status)}
                </RegistrationForm>
              }
            />

            <Route
              exact={true}
              path='/login'
              render={props =>
                <LoginForm {...props} >
                  {this.getNavbar(this.props.status)}
                </LoginForm>
              }
            />
            <Route
              exact={true}
              path='/homepage'
              render={props => <Redirect to='/battles' />}
            />

            <Route
              exact={true}
              path='/statistics'
              render={props =>
                <CaStatisticPage {...props}>
                  {this.getNavbar(this.props.status)}
                </CaStatisticPage>
              }
            />

            <Route
              exact={true}
              path='/battles'
              render={
                props =>
                  <CaBattles {...props}>
                    {this.getNavbar(this.props.status)}
                  </CaBattles>
              }
            />

            <Route
              exact={true}
              path='/battles/:id'
              render={props =>
                <CurrentBattle {...props}>
                  {this.getNavbar(this.props.status)}
                </CurrentBattle>
              }
            />

            <Route
              exact={true}
              path='/my-games'
              render={
                props =>
                  <CaMyGames {...props} >
                    {this.getNavbar(this.props.status)}
                  </CaMyGames>
              }
            />

            <Route
              path='/*'
              render={() =>
                <PageNotFound>
                  {this.getNavbar(this.props.status)}
                </PageNotFound>
              }
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  status: state.auth.status,
  battleName: state.battle.battleName
});

const mapDispatchToProps = (dispatch: any) => ({
  logoutUser: () => dispatch(new LogoutUser()),
  cleanStatistic: () => dispatch(new CleanStatistic()),
  leaveBattle: (battleName: string) => dispatch(new LeaveBattle(battleName))
});

export const Root = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootComponent);
