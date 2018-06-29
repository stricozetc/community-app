import * as React from 'react';

import './IconWithInfo.scss';

import { IconWithInfoProps } from './IconWithInfo.model';

export const CaIconWithInfo = (props: IconWithInfoProps) => {
  const {
    modificators,
    img,
    imgNotFound,
    firstLine,
    secondLine,
    secondLineModificators,
    firstLineModificators
  } = props;

  return (
    <div
      className={
        modificators
          ? ['ca-icon-with-info', ...modificators].join(' ')
          : 'ca-icon-with-info'
      }
    >
      <div className="ca-icon-with-info__icon">
        <img src={img} alt={imgNotFound} />
      </div>
      <div className="ca-icon-with-info__info">
        <div
          className={
            firstLineModificators
              ? [
                  'ca-icon-with-info__first-line',
                  ...firstLineModificators
                ].join(' ')
              : 'ca-icon-with-info__first-line'
          }
        >
          {firstLine}
        </div>
        <div
          className={
            secondLineModificators
              ? [
                  'ca-icon-with-info__second-line',
                  ...secondLineModificators
                ].join(' ')
              : 'ca-icon-with-info__second-line'
          }
        >
          {secondLine}
        </div>
      </div>
    </div>
  );
};
