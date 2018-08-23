import Validator from 'validator';
import { isEmpty } from './is-empty';
import { logicErr } from 'errors/logicErr';
import { ErrorBlock } from 'models/error';
import { GameData } from 'controller/statistic.controller';

export function validateGameDataInput(data: GameData): { errors: ErrorBlock[], isValid: boolean } {
  const errors: ErrorBlock[] = [];

  data.participationStatus = !isEmpty(data.participationStatus) ? data.participationStatus : null;
  data.playedTime = !isEmpty(data.playedTime) ? data.playedTime : -1;
  data.resultStatus = !isEmpty(data.resultStatus) ? data.resultStatus : null;
  data.scores = !isEmpty(data.scores) ? data.scores : -1;
  data.userToken = !isEmpty(data.userToken) ? data.userToken : '';

  if (Validator.isEmpty(data.userToken)) {
    errors.push(logicErr.userTokenIsRequired);
  }

  if (data.scores < 0) {
    errors.push(logicErr.scoresLessThanZero);
  }

  if (data.playedTime < 0) {
    errors.push(logicErr.playedTimeLessThanZero);
  }

  if (!data.participationStatus) {
    errors.push(logicErr.participationStatusIsRequired);
  }

  if (!data.resultStatus) {
    errors.push(logicErr.resultStatusIsRequired);
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
