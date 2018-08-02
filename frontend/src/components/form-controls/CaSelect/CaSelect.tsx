import * as React from 'react';

import { FormControl, Input, MenuItem, Select, withStyles } from '@material-ui/core';
import { i18nInstance } from 'utils/i18n';

import { CaSelectProps } from './CaSelect.model';
import { styles } from './CaSelect.styles';

export const CaSelect = withStyles(styles)((props: CaSelectProps) => {

  const { classes, displayedLanguages, languages, handleChange, currLang } = props;

  return (
    <FormControl fullWidth={true} >
      <Select
        value={currLang}
        onChange={(e) => handleChange(e, i18nInstance)}
        input={
          <Input
            name='languages'
            id='language'
            className={classes.underline}
          />
        }
      >
        {
          displayedLanguages.map(
            (language, index) => <MenuItem key={language} value={languages[index]}>{language.toUpperCase()}</MenuItem>
          )
        }
      </Select>
    </FormControl>
  );
});
