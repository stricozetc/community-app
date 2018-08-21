import * as React from 'react';
import { connect } from 'react-redux';

import {
  AuthStatus,
  FrontEndSnackbarData,
  LoadStatus  
} from 'models';

import { AppState, LogoutUser } from 'store';

import { CaSpinner, StatisticTables } from 'components';
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
      nextProps.statistic.bestUsersStatus === LoadStatus.ERROR &&
      nextProps.statistic.bestUsersStatus !==
      this.props.statistic.bestUsersStatus;
    const isRecentGamesInitFailed =
      nextProps.statistic.recentGamesStatus === LoadStatus.ERROR &&
      nextProps.statistic.recentGamesStatus !==
      this.props.statistic.recentGamesStatus;
    const isMostPopularGamesFailed =
      nextProps.statistic.mostPopularGamesStatus === LoadStatus.ERROR &&
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
    if (this.props.authStatus === AuthStatus.NOT_AUTHORIZED) {
      this.props.history.push('/login');
    }
  }

  public logoutUser(): void {
    this.props.logoutUser();
    this.props.history.push('/');
  }

  public render(): JSX.Element {
    
    const isDataLoaded =
      this.props.statistic.bestUsersStatus === LoadStatus.SUCCESS &&
      this.props.statistic.recentGamesStatus === LoadStatus.SUCCESS &&
      this.props.statistic.mostPopularGamesStatus === LoadStatus.SUCCESS;

    const isDataFailed =
      this.props.statistic.bestUsersStatus === LoadStatus.ERROR &&
      this.props.statistic.recentGamesStatus === LoadStatus.ERROR &&
      this.props.statistic.mostPopularGamesStatus === LoadStatus.ERROR;
    return (
      <div className='ca-statistic'>
        {this.props.children}
        
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
  initRecentGames: (userToken: string) => dispatch(new InitRecentGames(userToken))  
});

export const CaStatisticPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CaStatisticPageComponent);
