import * as React from 'react';

import './Button.scss';

import Button from '@material-ui/core/Button';
import { ButtonProps } from './Button.model';

export const CaButton = (props: ButtonProps) => {
  const { clickHandler, value, children, disabled } = props;

  return (
    <Button
      className={`ca-button ${disabled ? 'ca-button--disabled' : ''}`}
      onClick={clickHandler}
      value={value}
      disabled={disabled}
    >
      {value}
      {children}
    </Button>
  );
};
