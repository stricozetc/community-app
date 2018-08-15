import * as React from 'react';

import Tabs, { TabsProps } from '@material-ui/core/Tabs';

export const CaTabs = (props: TabsProps) => {
  const { value, ...otherProps } = props;

  return (
    <Tabs value={value} {...otherProps}/>
  );
};
