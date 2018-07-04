import './Logo.scss';

import * as React from 'react';
import { LogoProps } from './Logo.model';

export const CaLogo = (props: LogoProps) => {
  const { text, modificators } = props;

  return (
    <div
      className={
        modificators ? ['ca-logo', ...modificators].join(' ') : 'ca-logo'
      }
    >
      {text}
    </div>
  );
};
