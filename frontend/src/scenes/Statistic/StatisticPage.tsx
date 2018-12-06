import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  AuthStatus,
  FrontEndSnackbarData,
  LoadStatus
} from 'models';

import { } from 'store';

import { CaSpinner, StatisticTables } from 'components';
import { isEmpty } from 'utils';

import {
  AppState,
  InitBestUsers,
  InitMostPopularGames,
  InitRecentGames,
  LogoutUser
} from 'store';

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

        {!isDataLoaded && !isDataFailed ? (
          <div className='ca-homepage__spinner-container'>
            <CaSpinner isActive={!isDataLoaded} />
          </div>
        ) : (
            <StatisticTables statistic={this.props.statistic}
            games={this.props.games}
            />
          )}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  authStatus: state.auth.status,
  user: state.auth.user!,
  statistic: state.statistic,
  isSnackbarOpen: state.snackbarUi.isOpen,
  games: state.games,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logoutUser: () => dispatch(new LogoutUser()),
  initBestUsers: () => dispatch(new InitBestUsers()),
  initMostPopularGames: () => dispatch(new InitMostPopularGames()),
  initRecentGames: (userToken: string) => dispatch(new InitRecentGames(userToken)),
});

export const CaStatisticPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CaStatisticPageComponent);
