import { SnackbarContent, withStyles } from '@material-ui/core';
import * as React from 'react';
import { CaSnackbarContentProps } from './SnackbarContent.model';
import { styles } from './SnackbarContent.styles';

export const CaSnackbarContent = withStyles(styles)((props: CaSnackbarContentProps) => {
  const { classes, message, type } = props;

  return (
    <SnackbarContent
      className={classes[type]}
      message={message}
    />
  );
});
