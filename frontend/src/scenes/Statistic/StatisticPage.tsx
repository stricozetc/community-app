import * as React from 'react';
import { connect } from 'react-redux';

import { AuthStatus } from 'models';
import { AppState, LogoutUser } from 'store';

import { StatisticProps } from './Statistic.model';
import './Statistic.scss';


import { InitBestUsers, InitMostPopularGames, InitRecentGames } from 'store/statistic';
import { isEmpty } from 'utils';
import { CaSpinner } from 'components/Spinner/Spinner';
import { CaUsersTables } from 'components/CaUsersTables';

class CaStatisticPageComponent extends React.Component<StatisticProps> {

  public componentWillMount(): void {
    if (isEmpty(this.props.statistic.bestUsers)) {
      this.props.initBestUsers();
    }

    if (isEmpty(this.props.statistic.mostPopularGames)) {
      this.props.initMostPopularGames();
    }

    if (isEmpty(this.props.statistic.recentGames)) {
      this.props.initRecentGames();
    }
  }

  public componentDidMount(): void {
    if (this.props.status === AuthStatus.NOT_AUTHORIZED) {
      this.props.history.push('/login');
    }
  }

  public logoutUser(): void {
    this.props.logoutUser();
    this.props.history.push('/');
  }

  public render(): JSX.Element {

    return (
      <div className="ca-statistic">
        {this.props.children}

        {!(this.props.statistic.bestUsersInited && 
        this.props.statistic.recentGamesInited && 
        this.props.statistic.mostPopularGamesInited) 
        ? 
        (
          <div className="ca-homepage__spinner-container">
            <CaSpinner isActive={true}/>
          </div>
        )
        :
        <CaUsersTables statistic={this.props.statistic}/>
      }
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  status: state.auth.status,
  statistic: state.statistic
});

const mapDispatchToProps = (dispatch: any) => ({
  logoutUser: () => dispatch(new LogoutUser()),
  initBestUsers: () => dispatch(new InitBestUsers()),
  initMostPopularGames: () => dispatch(new InitMostPopularGames()),
  initRecentGames: () => dispatch(new InitRecentGames()),
});


export const CaStatisticPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CaStatisticPageComponent);