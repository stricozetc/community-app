import * as React from 'react';
import { I18n } from 'react-i18next';

import {
  Avatar,
  ClickAwayListener,
  Grow,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@material-ui/core';

import AccountCircle from '@material-ui/icons/AccountCircle';
import { createStyled } from 'utils';

import { AppMenuProps, AppMenuState } from './AppMenu.model';
import { styles } from './AppMenu.styles';

import './AppMenu.scss';

const Styled = createStyled(styles);

export class AppMenu extends React.Component<AppMenuProps, AppMenuState> {

  public state: AppMenuState = {
    anchorEl: null,
  };

  public handleIconClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!this.state.anchorEl) {
      this.handleOpen(event);
    } else {
      this.handleClose();
    }
  }

  public handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  public handleClose = () => {
    this.setState({ anchorEl: null });
  }

  public render(): JSX.Element {
    const { appMenuItems, children, imageUrl } = this.props;
    const { anchorEl } = this.state;

    const open = Boolean(anchorEl);

    return (
      <Styled>{({ classes }) => (
        <I18n>{t => (
          <ClickAwayListener onClickAway={this.handleClose}>
            <div>
              <IconButton
                onClick={this.handleIconClick}
                className={classes.icon}
              >
              {imageUrl ?
                <Avatar src={imageUrl} /> :
                <AccountCircle />}
              </IconButton>

              <Popper open={open} anchorEl={anchorEl} transition={true} disablePortal={true}>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin: placement === 'bottom'
                        ? 'center top'
                        : 'center bottom'
                    }}
                  >
                    <Paper>
                      {children}
                      <MenuList>
                        {
                          appMenuItems.map(item => {
                            return (
                              <MenuItem key={item.title} onClick={item.action} className={classes.menuItem} >
                                <ListItemIcon className={classes.icon}>
                                  {item.icon}
                                </ListItemIcon>
                                <ListItemText inset={true} primary={t(item.title)} classes={{ primary: classes.listItemText }} />
                              </MenuItem>
                            );
                          })
                        }
                      </MenuList>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </ClickAwayListener>
        )}</I18n>
      )}</Styled>
    );
  }
}
