import Button, { ButtonProps } from '@material-ui/core/Button';
import * as classNames from 'classnames';
import * as React from 'react';
import './Button.scss';

export const CaButton = (props: ButtonProps) => {
  const { children, className, ...otherProps } = props;

  return (
    <div className={classNames('ca-button', className)}>
      <Button {...otherProps}>
        {children}
      </Button>
    </div>
  );
};
