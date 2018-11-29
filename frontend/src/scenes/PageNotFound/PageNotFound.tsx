import * as React from 'react';
import { I18n } from 'react-i18next';

import './pageNotFound.scss';

export class PageNotFound extends React.Component {

  public render(): JSX.Element {
    return (
      <I18n>
        {
          ( t ) => (
            <div className='ca-page-not-found'>
              {this.props.children}
              <div className='ca-page-not-found__container'>
                <h1 className='ca-page-not-found__text' >
                  {'404 ' + t('pageNotFound')}
                </h1>
                <div className='ca-page-not-found__img' />
              </div>
            </div>
          )
        }
      </I18n>
    );
  }
}
