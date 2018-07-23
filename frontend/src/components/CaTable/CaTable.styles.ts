import { createStyles } from '@material-ui/core';
export const styles = createStyles({
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

    '&:first-child': {
      paddingLeft: '105px'
    },
    '&:last-child': {
      paddingRight: '107px'
    }
  },
  tableHeadCell: {
    borderBottom: 'none',
    color: '#fff'
  },
});
