import { Typography } from '@material-ui/core';

import * as React from 'react';
import { I18n } from 'react-i18next';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { Dispatch } from 'redux';

import { AuthStatus } from 'models';

import {
  AppState,
  ChangePassword,
  FieldsToChangePassword
} from 'store';

import {
  CaButton,
  CaTab,
  CaTabs,
  ChangePasswordForm
} from 'components';

import {
  UserSettingsProps,
  UserSettingsState,
  initState
} from './UserSettings.model';

import './UserSettings.scss';

function TabContainer(params: { children: any; dir?: any }): JSX.Element {
  return (
    <Typography
      component='div'
      dir={params.dir}
      style={{ padding: 8 * 3, fontSize: '1.6rem' }}
    >
      {params.children}
    </Typography>
  );
}

export class CaUserSettingsComponent extends React.Component<
  UserSettingsProps,
  UserSettingsState
  > {
  constructor(props: UserSettingsProps) {
    super(props);

    this.state = initState;
  }

  public componentWillReceiveProps(nextProps: UserSettingsProps): void {
    if (nextProps.status !== AuthStatus.Authorized) {
      this.props.history.push('/homepage');
    }
  }

  public componentDidMount(): void {
    if (this.props.status !== AuthStatus.Authorized) {
      this.props.history.push('/homepage');
    }
  }

  public toggleChangePasswordForm = (): void => {
    this.setState({
      isChangePasswordFormOpen: !this.state.isChangePasswordFormOpen
    });
  }

  public handleSubmit = (data: FieldsToChangePassword) => {
    this.props.changePassword(data);
  }

  public handleChange = (event: React.ChangeEvent<{}>, value: number): void => {
    this.setState({ value });
  }

  public handleChangeIndex(index: number): void {
    this.setState({ value: index });
  }

  public render(): JSX.Element {

    return (
      <I18n>
        {t => (
          <div className='ca-user-settings'>
            <div className='ca-user-settings__container'>
              <CaTabs
                value={this.state.value}
                onChange={this.handleChange}
                fullWidth={true}
              >
                <CaTab label='Profile' />
                <CaTab label='Security' />
              </CaTabs>

              <SwipeableViews
                axis='x'
                index={this.state.value}
                onChangeIndex={this.handleChangeIndex}
                className='ca-user-settings__body'
              >
                <TabContainer>Profile</TabContainer>
                <TabContainer>
                  <CaButton onClick={this.toggleChangePasswordForm} color='primary' >
                    {t('changePasswordLabel')}
                  </CaButton>

                  {this.state.isChangePasswordFormOpen && (
                    <div className='ca-user-settings__container-for-form'>
                      <ChangePasswordForm
                        user={this.props.user}
                        submit={this.handleSubmit}
                        changePasswordStatus={this.props.changePasswordStatus}
                      />
                    </div>
                  )}
                </TabContainer>
              </SwipeableViews>
            </div>
          </div>
        )}
      </I18n>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  status: state.auth.status,
  user: state.auth.user,
  changePasswordStatus: state.userSettings.changePasswordStatus
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changePassword: (data: FieldsToChangePassword) =>
    dispatch(new ChangePassword(data))
});

export const CaUserSettings = connect(
  mapStateToProps,
  mapDispatchToProps
)(CaUserSettingsComponent);
