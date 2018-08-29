import Validator from 'validator';
import { isEmpty } from './is-empty';
import { logicErr } from 'errors/logicErr';
import { ErrorBlock, Game } from 'models';

export function validateAppDataInput(data: Game): { errors: ErrorBlock[], isValid: boolean } {
  const errors: ErrorBlock[] = [];

  data.appName = !isEmpty(data.appName) ? data.appName : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.requestUrl = !isEmpty(data.requestUrl) ? data.requestUrl : '';
  data.redirectUrl = !isEmpty(data.redirectUrl) ? data.redirectUrl : '';

  if (Validator.isEmpty(data.appName)) {
    errors.push(logicErr.appNameRequired);
  }

  if (!Validator.isLength(data.appName, { min: 3, max: 50 })) {
    errors.push(logicErr.applicationNameLengthError);
  }

  if (Validator.isEmpty(data.description)) {
    errors.push(logicErr.descriptionRequired);
  }

  if (!Validator.isLength(data.description, { min: 10, max: 100 })) {
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

  if (data.maxRoomPlayer < 2) {
    errors.push(logicErr.maxRoomPlayerCountError);
  }

  if (!data.maxRooms) {
    errors.push(logicErr.maxRoomsRequired);
  }

  if (data.maxRooms < 1) {
    errors.push(logicErr.maxRoomsCountError);
  }

  if (!data.maxWaitingTime) {
    errors.push(logicErr.maxWaitingTimeRequired);
  }

  if (data.maxWaitingTime < 15) {
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
