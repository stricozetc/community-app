import * as React from 'react';
import { connect } from 'react-redux';

import { AuthStatus } from 'models';
import { AppState, LogoutUser } from 'store';

import { BattleRegistration } from "../BattleRegistration";
import { DashboardProps } from './Dashboard.model';

class DashboardComponent extends React.Component<DashboardProps> {

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
      <div className="ca-dashboard">
        <BattleRegistration />
        <h1>Logout</h1>
        <button onClick={() => this.logoutUser()}>Logout</button>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  status: state.auth.status
});

const mapDispatchToProps = (dispatch: any) => ({
  logoutUser: () => dispatch(new LogoutUser())
})

export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardComponent);
