

import * as React from 'react';
import { connect } from 'react-redux'
import { LogoutUser } from './../../store/auth/auth.action';
import { AppState } from './../../store/store.config';
import BattleRegistration from "./../BattleRegistration/BattleRegistration";
import {DashboardProps} from './DashboardProps'

class DashboardComponent extends React.Component<DashboardProps> {
  
  public componentDidMount(): void {
    if(!this.props.auth.isAuthenticated) {
     this.props.history.push('/login');
    }
 }
 
  public render():  JSX.Element {
    return (
      <div>
        <BattleRegistration />
        <h1>Logout</h1>
        <button onClick = {() => { this.props.logoutUser(); window.location.href = '/'}}>Logout</button>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch: any) => ({
  logoutUser: () => dispatch(new LogoutUser())
})



export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardComponent);

