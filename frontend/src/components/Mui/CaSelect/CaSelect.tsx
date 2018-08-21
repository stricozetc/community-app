import * as React from 'react';

import { FormControl, Input, MenuItem, Select, withStyles } from '@material-ui/core';
import { i18nInstance } from 'utils/i18n';

import { CaSelectProps } from './CaSelect.model';
import { styles } from './CaSelect.styles';

export const CaSelect = withStyles(styles)((props: CaSelectProps) => {

  const { classes, displayedValues, values, handleChange, currentValue } = props;

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(e, i18nInstance);
  };

  return (
    <FormControl fullWidth={true} >
      <Select
        value={currentValue}
        onChange={onChange}
        input={
          <Input
            name='languages'
            id='language'
            className={classes.underline}
          />
        }
      >
        {
          displayedValues.map(
            (language, index) => <MenuItem key={language} value={values[index]}>{language.toUpperCase()}</MenuItem>
          )
        }
      </Select>
    </FormControl>
  );
});
