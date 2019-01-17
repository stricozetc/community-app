import { Theme, createStyles } from '@material-ui/core';

export const styles = ({breakpoints}: Theme) => createStyles({
  TextFieldFormTime: {
    display: 'flex',
    [breakpoints.down('xs')]: {
      display: 'block'
    }
  }
});
