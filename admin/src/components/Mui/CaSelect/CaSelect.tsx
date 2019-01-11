import * as React from 'react';

import { FormControl, Input, MenuItem, Select } from '@material-ui/core';
import { createStyled } from 'utils';
import { i18nInstance } from 'utils/i18n';

import { CaSelectProps } from './CaSelect.model';
import { styles } from './CaSelect.styles';

const Styled = createStyled(styles);

export class CaSelect extends React.Component<CaSelectProps> {

  public onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.handleChange(e, i18nInstance);
  }

  public render(): JSX.Element {
    const { displayedValues, values, currentValue } = this.props;

    return (
      <Styled>{({ classes }) => (
        <FormControl fullWidth={true} >
          <Select
            value={currentValue}
            onChange={this.onChange}
            input={
              <Input
                name='languages'
                id='language'
                className={classes.underline}
              />
            }
          >
            {displayedValues.map(
              (language, index) => <MenuItem key={language} value={values[index]}>{language.toUpperCase()}</MenuItem>
            )}
          </Select>
        </FormControl>
      )}</Styled>
    );
  }
}
