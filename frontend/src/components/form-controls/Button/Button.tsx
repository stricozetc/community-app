import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import * as classNames from 'classnames';
import * as React from 'react';
import { ButtonProps } from './Button.model';
import { styles } from './Button.styles';

export const CaButton = withStyles(styles)((props: ButtonProps) => {
  const { classes, children, className, ...otherProps } = props;

  return (
    <div className={classNames(classes.button, className)}>
      <Button {...otherProps}>
        {children}
      </Button>
    </div>
  );
});
