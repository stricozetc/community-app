import * as React from 'react';

import {
  ClickAwayListener,
  Grow,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  withStyles
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { I18n } from 'react-i18next';

import { AppMenuProps, AppMenuState } from './AppMenu.model';
import { styles } from './AppMenu.styles';

import './AppMenu.scss';

export const AppMenu = withStyles(styles)(
  class extends React.Component<AppMenuProps, AppMenuState> {
    public constructor(props: AppMenuProps) {
      super(props);

      this.state = {
        anchorEl: null,
      };
    }

    public handleIconClick = (event: any) => {
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
      const { appMenuItems, children, classes } = this.props;

      const { anchorEl } = this.state;

      const open = Boolean(anchorEl);

      return (
        <I18n>
          {
            (t) => (
              <ClickAwayListener onClickAway={this.handleClose}>
                <div>
                  <IconButton
                    onClick={this.handleIconClick}
                    className={classes.icon}
                  >
                    <AccountCircle className={classes.avatarSm} />
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
            )
          }
        </I18n>
      );
    }
  });
