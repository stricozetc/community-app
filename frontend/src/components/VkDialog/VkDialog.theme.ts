import { DialogClassKey } from '@material-ui/core/Dialog';
import { DialogActionsClassKey } from '@material-ui/core/DialogActions';
import { DialogContentClassKey } from '@material-ui/core/DialogContent';
import { DialogContentTextClassKey } from '@material-ui/core/DialogContentText';
import { DialogTitleClassKey } from '@material-ui/core/DialogTitle';
import { TypographyClassKey } from '@material-ui/core/Typography';
import { StyleRules } from '@material-ui/core/styles';
import { defaultDialogContentBgColor, defaultDialogTextColor, defaultDialogTitleBGColor } from 'style/muiTheme.colors';

export const MuiVkDialog: Partial<StyleRules<DialogClassKey>> = {
  root: {
    position: 'absolute'
  }
};

export const MuiVkDialogTitle: Partial<StyleRules<DialogTitleClassKey>> = {
  root: {
    backgroundColor: defaultDialogTitleBGColor,
    textAlign: 'center'
  }
};

export const MuiVkDialogContent: Partial<StyleRules<DialogContentClassKey>> = {
  root: {
    backgroundColor: defaultDialogContentBgColor,
    width: '430px',
    fontSize: '30px'
  }
};

export const MuiVkDialogContentText: Partial<StyleRules<DialogContentTextClassKey>> = {
  root: {
    paddingTop: '10px',
    fontSize: '15px',
    color: '#fff'
  }
};

export const MuiVkDialogActions: Partial<StyleRules<DialogActionsClassKey>> = {
  root: {
    backgroundColor: defaultDialogContentBgColor,
    margin: '0px',

    paddingBottom: '20px',
    color: 'red',
    display: 'flex',
    justifyContent: 'space-around'
  }
};

export const MuiVkTypography: Partial<StyleRules<TypographyClassKey>> = {
  title: {
    fontSize: '2rem',
    color: defaultDialogTextColor
  }
};
