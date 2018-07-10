import * as React from 'react';

import './Slide.scss';

import { CaSlideProps } from './Slide.model';

import {Slide} from '@material-ui/core';

export const CaSlide = (props: CaSlideProps) => {
  return (
    <div className='ca-slide'>
      <Slide {...props} />
    </div>  
  );
};
