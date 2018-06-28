import './Spinner.scss';

import * as React from 'react'
import { Fragment } from 'react'

import { SpinnerProps } from './Spinner.model';

export const CaSpinner = (props: SpinnerProps) => {
  const { isActive, modificators } = props;
  
  return (
    <Fragment>
      { isActive && 
        <div className={modificators ? ['ca-spinner', ...modificators].join(' ') : 'ca-spinner'}/>
      }
    </Fragment>
  )
}
