import { createStyles } from '@material-ui/core';

export const styles = () => createStyles({
  editIconButton: {
    color: '#f4b33a',

    '&:hover': {
      color: '#000',
      backgroundColor: '#f4b33a'
    }
  },
  editIcon: {
    fontSize: '30px'
  }
});
