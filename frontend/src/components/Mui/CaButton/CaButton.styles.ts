import { Theme, createStyles } from '@material-ui/core';

export const styles = ({breakpoints}: Theme) => createStyles({
  button: {
    display: 'inline-block',
    [breakpoints.down('xs')]: {
      display: 'block'
    }
  }
});
