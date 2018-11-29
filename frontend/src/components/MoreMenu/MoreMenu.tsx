import * as React from 'react';

import {
  ClickAwayListener,
  Grow,
  IconButton,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { I18n } from 'react-i18next';

import { createStyled } from 'utils';

import { MoreMenuProps, MoreMenuState } from './MoreMenu.model';
import { styles } from './MoreMenu.styles';

const Styled = createStyled(styles);

export class MoreMenu extends React.Component<MoreMenuProps, MoreMenuState> {
  public state = {
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
    const { items } = this.props;

    const { anchorEl } = this.state;

    const open = Boolean(anchorEl);

    return (
      <Styled>{({ classes }) => (
        <I18n>{t => (
          <ClickAwayListener onClickAway={this.handleClose}>
            <div>
              <IconButton
                onClick={this.handleIconClick}
                className={classes.iconButton}
              >
                <MoreHorizIcon className={classes.moreIcon} />
              </IconButton>

              <Popper
                open={open}
                anchorEl={anchorEl}
                transition={true}
                disablePortal={true}
                className={classes.popper}
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin: placement === 'bottom'
                        ? 'center top'
                        : 'center bottom'
                    }}
                  >
                    <Paper className={classes.paper}>
                      <MenuList>
                        {
                          items.map(item => {
                            return (
                              <MenuItem key={item.title} onClick={item.action} className={classes.menuItem} >
                                <ListItemText primary={t(item.title)} classes={{ primary: classes.listItemText }} />
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
