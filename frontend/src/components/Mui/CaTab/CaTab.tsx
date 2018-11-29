import * as React from 'react';

import Tab, { TabProps } from '@material-ui/core/Tab';
import { createStyled } from 'utils';

import { styles } from './CaTab.styles';

const Styled = createStyled(styles);

export const CaTab = (props: TabProps) => (
  <Styled>{({ classes }) => (
    <Tab {...props} classes={{ label: classes.label }} />
  )}</Styled>
);
