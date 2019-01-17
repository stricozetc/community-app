import * as React from 'react';

import { TextFieldProps } from '@material-ui/core/TextField';
import TextField from '@material-ui/core/TextField';
import * as classNames from 'classnames';
import { createStyled } from 'utils';

import { styles } from './CaTimePickers.styles';

const Styled = createStyled(styles);

export const CaTimePickers = ({ children, className, ...otherProps }: TextFieldProps) => (
  <Styled>{({ classes }) => (
    <form className={classNames(classes.TextFieldFormTime, className)}>
      <TextField
      id='time'
      label='Alarm clock'
      type='time'
      defaultValue='07:30'
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        step: 300, // 5 min
      }}

      {...otherProps}>
        {children}
      </TextField>
    </form>
  )}</Styled>
);
