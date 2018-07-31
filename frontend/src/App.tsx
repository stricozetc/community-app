import { MuiThemeProvider } from '@material-ui/core';
import * as React from 'react';
import { theme } from 'style/muiTheme';

import './App.scss';
import { Root } from './scenes';
import { history } from './utils/history';

export class App extends React.Component {
  public render(): JSX.Element {
    return (
      <MuiThemeProvider theme={theme}>
        <Root history={history} />
      </MuiThemeProvider>
    );
  }
}
