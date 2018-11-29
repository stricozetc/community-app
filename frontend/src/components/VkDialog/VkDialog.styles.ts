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
  },
  content: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '205px',
    overflow: 'hidden',
    padding: '10px'

  },
  vkDialogErr: {
    fontSize: '14px',
    color: '#f92a42',
    display: 'block',
    padding: '5px 10px',
    backgroundColor: 'rgba(239, 38, 78, 0.4)',
    borderRadius: '10px',
    marginTop: '10px',
  },
  inputButtonColor: {
  }
});
