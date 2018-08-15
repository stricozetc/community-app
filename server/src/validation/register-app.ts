import * as Validator from 'validator';
import { isEmpty } from './is-empty';
import { logicErr } from './../../errors/logicErr';
import { ErrorBlock } from '../../models/error';
import { AppData } from '../../Interfaces/AppData';

export function validateAppDataInput(data: AppData): { errors: ErrorBlock[], isValid: boolean } {
  const errors: ErrorBlock[] = [];
  data.appName = !isEmpty(data.appName) ? data.appName : '';
  data.url = !isEmpty(data.url) ? data.url : '';
  data.maxRoomPlayer = !isEmpty(data.maxRoomPlayer) && +data.maxRoomPlayer > 0 ? data.maxRoomPlayer : '';

  if (Validator.isEmpty(data.url)) {
    errors.push(logicErr.urlIsRequired);
  }

  if (Validator.isEmpty(data.appName)) {
    errors.push(logicErr.nameIsRequired);
  }

  if (Validator.isEmpty(data.maxRoomPlayer)) {
    errors.push(logicErr.maxRoomPlayersLessThanOne);
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
