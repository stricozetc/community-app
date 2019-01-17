import { Theme, createStyles } from '@material-ui/core';

export const styles = ({breakpoints}: Theme) => createStyles({
  TextFieldFormDate: {
    display: 'flex',
    [breakpoints.down('xs')]: {
      display: 'block'
    }
  }
});
