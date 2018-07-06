import * as React from 'react';
import { connect } from 'react-redux';

import { AuthStatus } from 'models';
import { AppState, LogoutUser } from 'store';

// import { BattleRegistration } from '../BattleRegistration';
import { StatisticProps } from './Statistic.model';

// import { CaNavbar } from 'components/Navbar';

// import { CaLogo } from 'components/Logo';

import './Statistic.scss';



import { InitBestUsers, InitMostPopularGames, InitRecentGames } from 'store/statistic';
import { isEmpty } from 'utils';
import { CaSpinner } from 'components/Spinner/Spinner';

// import { CaButton } from 'components/form-controls/Button/Button';


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
        {/* <div className="ca-statistic__container-for-nav"> */}
        {this.props.children}
          {/* <CaNavbar
            linksToRender={[
              {
                text: 'Battles',
                to: '/battles',
                activeClassName: 'ca-navbar__nav-item--active'
              },
              {
                text: 'Statistics',
                to: '/statistics',
                activeClassName: 'ca-navbar__nav-item--active'
              }
            ]}
          >
            <CaLogo
              text="battlenet"
            />
            <div className="ca-navbar__logout-btn-container">
              <CaButton 
                  clickHandler={() => this.logoutUser()} 
                  value="Logout"
              /> 
            </div>
          </CaNavbar> */}
        {/* </div> */}
        <div className="ca-container">
           {/* <BattleRegistration /> */}

        </div>

        {!(this.props.statistic.bestUsersInited && 
        this.props.statistic.recentGamesInited && 
        this.props.statistic.mostPopularGamesInited) && (
          <div className="ca-homepage__spinner-container">
            <CaSpinner isActive={true} />
          </div>
        )}

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

// const mapStateToProps = (state: AppState) => ({
//   status: state.auth.status,
//   battleStatus: state.battle.status,
//   waitBattlePlayersCountAction: state.battle.waitBattlePlayersCount,
//   fetchingData: state.data.fetchingData,
//   quests: state.quests.quests
// });

// const mapDispatchToProps = (dispatch: any) => ({
//   logoutUser: () => dispatch(new LogoutUser()),
//   joinBattleAction: (name: string) => dispatch(new JoinBattle(name)),
//   leaveBattleAction: (name: string) => dispatch(new LeaveBattle(name)),
//   initGames: () => dispatch(new InitQuests())
// });
