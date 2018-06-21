import './Logo.scss';

import * as React from 'react';
import { LogoProps } from './Logo.model';

export const CaLogo = (props: LogoProps) => {
  const { text } = props;

  return (
    <div
      className='ca-logo'
    >
      {text}
    </div>
  );
};
