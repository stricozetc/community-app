import * as React from 'react';
import { Fragment } from 'react';

import { SpinnerProps } from './Spinner.model';
import './Spinner.scss';

export const CaSpinner = (props: SpinnerProps) => {
  const { isActive } = props;

  return (
    <Fragment>
      {isActive && (
        <div className='ca-spinner' />
      )}
    </Fragment>
  );
};
