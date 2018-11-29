import * as React from 'react';

import { ButtonProps } from '@material-ui/core/Button';
import Button from '@material-ui/core/Button';
import * as classNames from 'classnames';
import { createStyled } from 'utils';

import { styles } from './CaButton.styles';

const Styled = createStyled(styles);

export const CaButton = ({ children, className, ...otherProps }: ButtonProps) => (
  <Styled>{({ classes }) => (
    <div className={classNames(classes.button, className)}>
      <Button {...otherProps}>
        {children}
      </Button>
    </div>
  )}</Styled>
);
