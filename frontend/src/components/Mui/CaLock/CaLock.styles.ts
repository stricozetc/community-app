import { createStyles } from '@material-ui/core';

export const styles = () => createStyles({
  lockIconButton: {
    color: 'green',

    '&:hover': {
      color: '#000',
      backgroundColor: 'green'
    }
  },
  lockIcon: {
    fontSize: '30px'
  }
});
