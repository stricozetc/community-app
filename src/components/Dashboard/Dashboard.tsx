

import * as React from 'react';
import { connect } from 'react-redux'
import { LogoutUser } from './../../store/auth/auth.action';
import { AppState } from './../../store/store.config';
import BattleRegistration from "./../BattleRegistration/BattleRegistration";
interface LandingProps {
  auth: any,
  history: any,
  logoutUser(): void
}

class DashboardComponent extends React.Component<LandingProps, {} > {
  
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



const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardComponent);

export { Dashboard }