import * as React from 'react';
import { I18n } from 'react-i18next';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  AuthStatus,
  FrontEndSnackbarData,
  LoadStatus,
  RowProperty,
  TypeOfColumn,

} from 'models';

import { AppState, LogoutUser } from 'store';

import { CaSpinner, CaTable } from 'components';

import {
  InitLeaders
} from 'store/statistic';

import { StatisticProps } from './Leaders.model';

import './Leaders.scss';

class CaLeadersComponent extends React.Component<StatisticProps, any> {
  public dataForSnack: FrontEndSnackbarData[] = [];

  public componentWillMount(): void {
    const appName = this.props.match.params['appName'];
    this.props.initLeaders(appName);
  }

  public componentDidMount(): void {
    if (this.props.authStatus === AuthStatus.NotAuthorized) {
      this.props.history.push('/login');
    }
  }

  public logoutUser(): void {
    this.props.logoutUser();
    this.props.history.push('/');
  }

  public render(): JSX.Element {

    const isDataLoaded =
      this.props.statistic.leadersStatus === LoadStatus.Success;

    const isDataFailed =
      this.props.statistic.leadersStatus === LoadStatus.Error;

    const columnDef = [
        {
          headerName: 'position',
          type: TypeOfColumn.Increment
        },
        {
          headerName: 'userName',
          field: RowProperty.Name,
          type: TypeOfColumn.String
        },
        {
          headerName: 'score',
          field: RowProperty.Scores,
          type: TypeOfColumn.Points
        },
      ];

    const appName = this.props.match.params['appName'];
    return (
      <I18n>
        {
          ( t ) => (
          <div className='ca-statistic'>
            {this.props.children}
            <h2 className='leaders__statistics-title'>{t('leaders')}</h2>
            <div className='leaders__app-name'>
              {appName}
            </div>
            {!isDataLoaded && !isDataFailed ? (
              <div className='ca-homepage__spinner-container'>
                <CaSpinner isActive={!isDataLoaded} />
              </div>
            ) : (
              <CaTable rowData={this.props.statistic.leaders} columnDef={columnDef} />
              )}
          </div>
          )
        }
      </I18n>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  authStatus: state.auth.status,
  user: state.auth.user!,
  statistic: state.statistic,
  isSnackbarOpen: state.snackbarUi.isOpen
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logoutUser: () => dispatch(new LogoutUser()),
  initLeaders: (appName: string) => dispatch(new InitLeaders(appName))
});

export const CaLeadersPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CaLeadersComponent);
