import * as React from 'react';

import { withStyles } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';

import { CaTabProps } from './CaTab.model';
import { styles } from './CaTab.styles';

export const CaTab = withStyles(styles)((props: CaTabProps) => {
  const { classes, ...otherProps } = props;

  return (
    <Tab {...otherProps} classes={{ label: classes.label }}/>
  );
});
