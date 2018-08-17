import { createStyles } from '@material-ui/core';

export const styles = () => createStyles({
  input: {
    width: '75%',
    color: 'white'
  },
  underline: {
    '&:after': {
      borderBottomColor: '#f4b33a'
    }
  }
});
