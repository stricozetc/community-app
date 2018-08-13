import { CaButton } from 'components';
import { CaChangePasswordForm } from 'components/CaChangePasswordForm';
import { AuthStatus } from 'models';
import * as React from 'react';

import { I18n } from 'react-i18next';
import { connect } from 'react-redux';
import { AppState } from 'store';
import SwipeableViews from 'react-swipeable-views';

import { FieldsToChangePassword } from '../../store/userSettings/interfaces';
import { ChangePassword } from '../../store/userSettings/user-settings.action';

import { AppBar, Tab, Typography, Tabs } from '@material-ui/core';

import {
  UserSettingsProps,
  UserSettingsState,
  initState
} from './UserSettings.model';
import './UserSettings.scss';

function TabContainer(params: { children: any; dir?: any }): JSX.Element {
  return (
    <Typography
      component="div"
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
    if (nextProps.status !== AuthStatus.AUTHORIZED) {
      this.props.history.push('/homepage');
    }
  }

  public componentDidMount(): void {
    if (this.props.status !== AuthStatus.AUTHORIZED) {
      this.props.history.push('/homepage');
    }
  }

  public toggleChangePasswordForm = (): void => {
    this.setState({
      isChangePasswordFormOpen: !this.state.isChangePasswordFormOpen
    });
  }

  public handleSubmit(data: FieldsToChangePassword): void {
    this.props.changePassword(data);
  }

  public handleChange = (event: any, value: any): void => {
    this.setState({ value });
  }

  public handleChangeIndex(index: number): void {
    this.setState({ value: index });
  }

  public render(): JSX.Element {

    return (
      <I18n>
        {t => (
          <div className="ca-user-settings">
            {this.props.children}
            <div className="ca-user-settings__container">
              <AppBar position="static" color="default">
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  fullWidth
                >
                  <Tab label="Profile" />
                  <Tab label="Security" />
                </Tabs>
              </AppBar>

              <SwipeableViews
                axis='x'
                index={this.state.value}
                onChangeIndex={this.handleChangeIndex}
              >
                <TabContainer>Profile</TabContainer>
                <TabContainer>
                  <CaButton onClick={this.toggleChangePasswordForm}>
                    {t('changePasswordLabel')}
                  </CaButton>

                  {this.state.isChangePasswordFormOpen && (
                    <div className="ca-user-settings__container-for-form">
                      <CaChangePasswordForm
                        user={this.props.user}
                        submit={(data: FieldsToChangePassword) =>
                          this.handleSubmit(data)
                        }
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

const mapDispatchToProps = (dispatch: any) => ({
  changePassword: (data: FieldsToChangePassword) =>
    dispatch(new ChangePassword(data))
});

export const CaUserSettings = connect(
  mapStateToProps,
  mapDispatchToProps
)(CaUserSettingsComponent);
