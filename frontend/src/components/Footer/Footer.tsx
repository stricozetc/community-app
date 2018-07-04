import * as React from 'react';

import './Footer.scss';

import { FooterProps } from './Footer.model';

export const CaFooter = (props: FooterProps) => {
  return (
    <div
      className={
        props.modificators
          ? ['ca-footer', ...props.modificators].join(' ')
          : 'ca-footer'
      }
    >
      {props.children}
    </div>
  );
};
