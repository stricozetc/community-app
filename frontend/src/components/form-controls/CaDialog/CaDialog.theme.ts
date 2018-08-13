import { DialogActionsClassKey } from '@material-ui/core/DialogActions';
import { DialogContentClassKey } from '@material-ui/core/DialogContent';
import { DialogContentTextClassKey } from '@material-ui/core/DialogContentText';
import { DialogTitleClassKey } from '@material-ui/core/DialogTitle';
import { TypographyClassKey } from '@material-ui/core/Typography';
import { StyleRules } from '@material-ui/core/styles';

import { defaultDialogContentBgColor, defaultDialogTextColor, defaultDialogTitleBGColor } from 'style/muiTheme.colors';
import { DialogClassKey } from '@material-ui/core/Dialog';

export const MuiDialog: Partial<StyleRules<DialogClassKey>> = {
  root: {
    position: 'absolute',

  }
};

export const MuiDialogTitle: Partial<StyleRules<DialogTitleClassKey>> = {
  root: {
    backgroundColor: defaultDialogTitleBGColor,
    borderTop: `1px solid #A1A1A1`,
    textAlign: 'center'
  }
};

export const MuiDialogContent: Partial<StyleRules<DialogContentClassKey>> = {
  root: {
    backgroundColor: defaultDialogContentBgColor,
    width: '400px',
    height: '100px',
    fontSize: '30px'
  }
};

export const MuiDialogContentText: Partial<StyleRules<DialogContentTextClassKey>> = {
  root: {
    paddingTop: '10px',
    fontSize: '15px',
    color: '#fff'
  }
};

export const MuiDialogActions: Partial<StyleRules<DialogActionsClassKey>> = {
  root: {
    backgroundColor: defaultDialogContentBgColor,
    margin: '0px',

    paddingBottom: '20px',
    color: 'red',
    display: 'flex',
    justifyContent: 'space-around'
  }
};

export const MuiTypography: Partial<StyleRules<TypographyClassKey>> = {
  title: {
    fontSize: '2rem',
    color: defaultDialogTextColor
  }
};
