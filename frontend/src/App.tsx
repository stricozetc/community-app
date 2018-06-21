import './App.scss';

import * as React from 'react';

import { Root } from './scenes';
import { history } from './utils/history';

export class App extends React.Component {
  public render(): JSX.Element {
    return (
      <Root history={history}/>
    );
  }
}
