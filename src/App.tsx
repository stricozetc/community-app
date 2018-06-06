import * as React from 'react';
import './App.css';

import logo from './logo.svg';

import BattleRegistration from 'components/BattleRegistration/BattleRegistration';

export class App extends React.Component {
  public render(): JSX.Element {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Battle Net</h1>
        </header>
        <BattleRegistration />
      </div>
    );
  }
}
