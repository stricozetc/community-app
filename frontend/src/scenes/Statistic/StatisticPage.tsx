import * as React from 'react';
import { connect } from 'react-redux';

import {
  AuthStatus,
  FrontEndSnackbarData,
  LoadStatus,
  SnackbarType,
  transitionDirection
} from 'models';

import { AppState, LogoutUser } from 'store';

import { CaSnackbar, CaSpinner, StatisticTables } from 'components';
import { CloseSnackbar, OpenSnackbar } from 'store/snackbar';
import { isEmpty } from 'utils';

import {
  InitBestUsers,
  InitMostPopularGames,
  InitRecentGames
} from 'store/statistic';

import { StatisticProps } from './Statistic.model';

import './StatisticPage.scss';

class CaStatisticPageComponent extends React.Component<StatisticProps> {
  public dataForSnack: FrontEndSnackbarData[] = [];
  public componentWillReceiveProps(nextProps: StatisticProps): void {
    const isBestUsersInitFailed =
      nextProps.statistic.bestUsersStatus === LoadStatus.Error &&
      nextProps.statistic.bestUsersStatus !==
      this.props.statistic.bestUsersStatus;
    const isRecentGamesInitFailed =
      nextProps.statistic.recentGamesStatus === LoadStatus.Error &&
      nextProps.statistic.recentGamesStatus !==
      this.props.statistic.recentGamesStatus;
    const isMostPopularGamesFailed =
      nextProps.statistic.mostPopularGamesStatus === LoadStatus.Error &&
      nextProps.statistic.mostPopularGamesStatus !==
      this.props.statistic.mostPopularGamesStatus;

    if (isBestUsersInitFailed) {
      this.dataForSnack.push({
        type: 'error',
        msg: 'User Init failed'
      });
    }

    if (isRecentGamesInitFailed) {
      this.dataForSnack.push({
        type: 'error',
        msg: 'Recent Games Init failed'
      });
    }

    if (isMostPopularGamesFailed) {
      this.dataForSnack.push({
        type: 'error',
        msg: 'Most Popular Games Init failed'
      });
    }

    if (
      isBestUsersInitFailed ||
      isRecentGamesInitFailed ||
      isMostPopularGamesFailed
    ) {
      this.props.openSnackbar();
    }
  }

  public closeSnackbar = () => {
    this.props.closeSnackbar();
  }

  public componentWillMount(): void {
    if (isEmpty(this.props.statistic.bestUsers)) {
      this.props.initBestUsers();
    }

    if (isEmpty(this.props.statistic.mostPopularGames)) {
      this.props.initMostPopularGames();
    }

    if (isEmpty(this.props.statistic.recentGames)) {
      this.props.initRecentGames(this.props.user.token);
    }
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
    const errorMessages = this.dataForSnack.filter(d => (d.type = 'error'));

    const isDataLoaded =
      this.props.statistic.bestUsersStatus === LoadStatus.Success &&
      this.props.statistic.recentGamesStatus === LoadStatus.Success &&
      this.props.statistic.mostPopularGamesStatus === LoadStatus.Success;

    const isDataFailed =
      this.props.statistic.bestUsersStatus === LoadStatus.Error &&
      this.props.statistic.recentGamesStatus === LoadStatus.Error &&
      this.props.statistic.mostPopularGamesStatus === LoadStatus.Error;
    return (
      <div className='ca-statistic'>
        {this.props.children}

        <CaSnackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={this.props.isSnackbarOpen}
          autoHideDuration={4000}
          handleClose={this.closeSnackbar}
          type={SnackbarType.Error}
          message={
            <React.Fragment>
              {errorMessages.map((err: FrontEndSnackbarData, index: number) => (
                <div key={index}>* {err.msg}</div>
              ))}
            </React.Fragment>
          }
          transitionDirection={transitionDirection.Down}
        />

        <CaSnackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={this.props.isSnackbarOpen}
          autoHideDuration={4000}
          handleClose={this.closeSnackbar}
          type={SnackbarType.Info}
          message={
            <React.Fragment>
              {errorMessages.map((err: FrontEndSnackbarData, index: number) => (
                <div key={index}>* {err.msg}</div>
              ))}
            </React.Fragment>
          }
          transitionDirection={transitionDirection.Up}
        />
        {!isDataLoaded && !isDataFailed ? (
          <div className='ca-homepage__spinner-container'>
            <CaSpinner isActive={!isDataLoaded} />
          </div>
        ) : (
            <StatisticTables statistic={this.props.statistic} />
          )}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  authStatus: state.auth.status,
  user: state.auth.user!,
  statistic: state.statistic,
  isSnackbarOpen: state.snackbarUi.isOpen
});

const mapDispatchToProps = (dispatch: any) => ({
  logoutUser: () => dispatch(new LogoutUser()),
  initBestUsers: () => dispatch(new InitBestUsers()),
  initMostPopularGames: () => dispatch(new InitMostPopularGames()),
  initRecentGames: (userToken: string) => dispatch(new InitRecentGames(userToken)),
  closeSnackbar: () => dispatch(new CloseSnackbar()),
  openSnackbar: () => dispatch(new OpenSnackbar())
});

export const CaStatisticPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CaStatisticPageComponent);
