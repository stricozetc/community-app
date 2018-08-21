import { createStyles } from '@material-ui/core';

export const styles = () => createStyles({
  deleteIconButton: {
    color: 'rgb(168, 23, 4)',

    '&:hover': {
      color: '#000',
      backgroundColor: 'rgb(168, 23, 4)'
    }
  },
  deleteIcon: {
    fontSize: '30px'
  }
});
