import { Theme, createStyles } from '@material-ui/core';

export const styles = ({breakpoints}: Theme) => createStyles({
    scrollButtons: {
        [breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    root: {
        [breakpoints.down('sm')]: {
            marginLeft: '0px'
        }
    }
});
