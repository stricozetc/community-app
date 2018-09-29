import { Theme, createStyles } from '@material-ui/core';

export const styles = ({breakpoints}: Theme) => createStyles({
  tableHead: {
    borderTop: '2px solid rgb(161, 161, 161)'
  },
  tableHeadRow: {
    backgroundColor: '#313c45',
    fontSize: '18px',

    '&:hover': {
      backgroundColor: '#313c45'
    }
  },
  columnCell: {
    height: '48px',
    borderBottom: '1px solid rgb(161, 161, 161)',
    fontSize: 'inherit',
    color: 'inherit',
    textAlign: 'left',

    [breakpoints.down('xs')]: {
      textAlign: 'left',
      fontSize: '15px'
    },

    '&:first-child': {
      paddingLeft: '0px',
      paddingRight: '0px',
      textAlign: 'center',
      width: '10%',

      [breakpoints.down('xs')]: {
        padding: '10px',
      },

    },

    '&:last-child': {
      paddingLeft: '0px',
      paddingRight: '0px',
      textAlign: 'center',
      width: '12%',

      [breakpoints.down('xs')]: {
        padding: '10px'
      }

    }
  },
  tableHeadCell: {
    borderBottom: 'none',
    color: '#fff'
  },
  cellWithButtons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textInCellWithButtons: {
    flex: 2
  },
  buttonsInCellWithButtons: {
    flex: 1
  }
});
