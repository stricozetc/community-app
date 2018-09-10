import * as React from 'react';

import Tabs, { TabsProps } from '@material-ui/core/Tabs';
import { createStyled } from 'utils';

import { styles } from './CaTabs.styles';

const Styled = createStyled(styles);

export const CaTabs = (props: TabsProps) => {
  const { value, ...otherProps } = props;

  return (
    <Styled>{({ classes }) => (
      <Tabs
        classes = {{scrollButtons: classes.scrollButtons}}
        className = {classes.root}
        value = {value}
        {...otherProps}
        scrollable = {true}
        scrollButtons = 'on'
      />
    )}</Styled>
  );
};
