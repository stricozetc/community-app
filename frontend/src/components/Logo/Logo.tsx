import * as React from 'react';

import { LogoProps } from './Logo.model';
import './Logo.scss';

export const CaLogo = (props: LogoProps) => {
  const { text, onClick } = props;

  return (
    <div
      className='ca-logo'
      onClick={onClick}
    >
      {text}
    </div>
  );
};
