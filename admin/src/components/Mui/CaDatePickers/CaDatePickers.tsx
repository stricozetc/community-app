import * as React from 'react';

import { TextFieldProps } from '@material-ui/core/TextField';
import TextField from '@material-ui/core/TextField';
import * as classNames from 'classnames';
import { createStyled } from 'utils';

import { styles } from './CaDatePickers.styles';

const Styled = createStyled(styles);

export const CaDatePickers = ({ children, className, ...otherProps }: TextFieldProps) => (
  <Styled>{({ classes }) => (
    <form className={classNames(classes.TextFieldFormDate, className)} noValidate>
      <TextField
        id='date'
        label='Event date'
        type='date'
        defaultValue='2019-01-16'
        InputLabelProps={{
          shrink: true,
        }}
        {...otherProps}
      >
        {children}
      </TextField>
    </form>
  )}</Styled>
);
