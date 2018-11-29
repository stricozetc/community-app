import { Theme, createStyles } from '@material-ui/core';

export const styles = ({breakpoints}: Theme) => createStyles({
  label: {
    [breakpoints.up('md')]: {
      fontSize: '18px'
    }
  },
});
