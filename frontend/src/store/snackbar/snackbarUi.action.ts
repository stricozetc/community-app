import { SnackbarPayload } from 'models';

import { action } from '../decorators';

export enum SnackbarUiTypes {
  CloseSnackbar = '[snackbarUi] Close Snackbar',
  OpenSnackbar = '[snackbarUi] Open Snackbar',
  ToggleSnackbar = '[snackbarUi] Toggle Snackbar',
}

@action()
export class CloseSnackbar {
  public readonly type = SnackbarUiTypes.CloseSnackbar;
}

@action()
export class OpenSnackbar {
  public readonly type = SnackbarUiTypes.OpenSnackbar;

  public constructor(public payload: SnackbarPayload) { }
}

@action()
export class ToggleSnackbar {
  public readonly type = SnackbarUiTypes.ToggleSnackbar;
}

export type SnackbarUiActions =
  | CloseSnackbar
  | OpenSnackbar
  | ToggleSnackbar;
