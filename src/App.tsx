import * as React from 'react';
import './App.css';

import logo from './logo.svg';

import { Form, List } from 'components';
import * as openSocket from 'socket.io-client';
export class App extends React.Component {
  private socket = openSocket('http://localhost:3030');

  constructor(props: any) {
    super(props);
    this.socket.emit('onJsMarathon');
    this.socket.on('redirect', (redirectUrl: string) => window.location.replace(redirectUrl))
  }

  public render(): JSX.Element {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Form />
        <List />
      </div>
    );
  }
}
