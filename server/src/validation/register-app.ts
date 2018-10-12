import Validator from 'validator';
import { isEmpty } from './is-empty';
import { logicErr } from 'errors/logicErr';
import { ErrorBlock, Game } from 'models';

const MIN_LENGTH_APP_NAME = 3;
const MAX_LENGTH_APP_NAME = 50;
const MIN_LENGTH_APP_DESCRIPTION = 10;
const MAX_LENGTH_APP_DESCRIPTION = 250;
const MIN_COUNT_ROOM_PLAYERS = 1;
const MIN_COUNT_ROOMS = 1;
const MIN_WAITING_TIME = 15;

export function validateAppDataInput(data: Game): { errors: ErrorBlock[], isValid: boolean } {
  const errors: ErrorBlock[] = [];

  data.appName = !isEmpty(data.appName) ? data.appName : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.requestUrl = !isEmpty(data.requestUrl) ? data.requestUrl : '';
  data.redirectUrl = !isEmpty(data.redirectUrl) ? data.redirectUrl : '';

  if (Validator.isEmpty(data.appName)) {
    errors.push(logicErr.appNameRequired);
  }

  if (!Validator.isLength(data.appName, { min: MIN_LENGTH_APP_NAME, max: MAX_LENGTH_APP_NAME })) {
    errors.push(logicErr.applicationNameLengthError);
  }

  if (Validator.isEmpty(data.description)) {
    errors.push(logicErr.descriptionRequired);
  }

  if (!Validator.isLength(data.description, { min: MIN_LENGTH_APP_DESCRIPTION, max: MAX_LENGTH_APP_DESCRIPTION })) {
    errors.push(logicErr.descriptionApplicationLengthError);
  }

  if (Validator.isEmpty(data.requestUrl)) {
    errors.push(logicErr.requestUrlRequired);
  }

  if (Validator.isURL(data.requestUrl)) {
    errors.push(logicErr.requestUrlError);
  }

  if (Validator.isEmpty(data.redirectUrl)) {
    errors.push(logicErr.redirectUrlRequired);
  }

  if (Validator.isURL(data.redirectUrl)) {
    errors.push(logicErr.redirectUrlError);
  }

  if (!data.maxRoomPlayer) {
    errors.push(logicErr.maxRoomPlayerRequired);
  }

  if (data.maxRoomPlayer < MIN_COUNT_ROOM_PLAYERS) {
    errors.push(logicErr.maxRoomPlayerCountError);
  }

  if (!data.maxRooms) {
    errors.push(logicErr.maxRoomsRequired);
  }

  if (data.maxRooms < MIN_COUNT_ROOMS) {
    errors.push(logicErr.maxRoomsCountError);
  }

  if (!data.maxWaitingTime) {
    errors.push(logicErr.maxWaitingTimeRequired);
  }

  if (data.maxWaitingTime < MIN_WAITING_TIME) {
    errors.push(logicErr.maxWaitingTimeError);
  }

  if (!data.userId) {
    errors.push(logicErr.userIdRequired);
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
