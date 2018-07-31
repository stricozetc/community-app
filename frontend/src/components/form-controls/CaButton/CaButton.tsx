import * as React from 'react';

import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import * as classNames from 'classnames';

import { CaButtonProps } from './CaButton.model';
import { styles } from './CaButton.styles';

export const CaButton = withStyles(styles)((props: CaButtonProps) => {
  const { classes, children, className, ...otherProps } = props;

  return (
    <div className={classNames(classes.button, className)}>
      <Button {...otherProps}>
        {children}
      </Button>
    </div>
  );
});
