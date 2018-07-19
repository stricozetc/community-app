import * as React from 'react';
import './pageNotFound.scss';

export class PageNotFound extends React.Component {

  public render(): JSX.Element {
    return (
      <div className='ca-page-not-found'>
        {this.props.children}
        <div className="ca-page-not-found__container">
          <h1 className="ca-page-not-found__text" >
            404 Page Not Found
          </h1>
          <div className="ca-page-not-found__img" />
        </div>
      </div>
    );
  }
}
