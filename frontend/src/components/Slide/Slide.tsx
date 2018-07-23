import * as React from 'react';

import './Slide.scss';

import { SlideProps } from '@material-ui/core/Slide';

import { Slide } from '@material-ui/core';

export const CaSlide = (props: SlideProps) => {
  return (
    <div className='ca-slide'>
      <Slide {...props} />
    </div>
  );
};
