import { Theme, createStyles } from '@material-ui/core';

export const styles = (theme: Theme) => createStyles({
    scrollButtons: {
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    root: {
        [theme.breakpoints.down('sm')]: {
            marginLeft: '0px'
        }
    }
});
