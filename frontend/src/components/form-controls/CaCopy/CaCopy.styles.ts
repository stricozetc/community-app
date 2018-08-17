import { createStyles } from '@material-ui/core';

export const styles = () => createStyles({
  copyIconButton: {
    color: '#f4b33a',

    '&:hover': {
      color: '#000',
      backgroundColor: '#f4b33a'
    }
  },
  copyIcon: {
    fontSize: '30px'
  }
});
