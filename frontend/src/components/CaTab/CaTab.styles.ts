import { Theme, createStyles } from '@material-ui/core';

export const styles = (theme: Theme) => createStyles({
  label: {
    [theme.breakpoints.up('md')]: {
      fontSize: '18px'
    }
  },
});
