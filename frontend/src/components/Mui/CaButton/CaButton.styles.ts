import { Theme, createStyles } from '@material-ui/core';

export const styles = (theme: Theme) => createStyles({
  button: {
    display: 'inline-block',
    [theme.breakpoints.down('xs')]: {
      display: 'block'
    }
  }
});
