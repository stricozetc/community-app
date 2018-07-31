import './index.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { store } from 'store';

import { App } from './App';
import { register } from './registerServiceWorker';
import { I18nextProvider } from 'react-i18next';
import { i18nInstance } from 'utils/i18n';

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18nInstance}>
      <App />
    </I18nextProvider>
  </Provider>,
  document.getElementById('root')
);

register();
