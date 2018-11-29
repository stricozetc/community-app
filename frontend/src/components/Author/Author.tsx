import * as React from 'react';

import { AuthorProps } from './Author.model';
import './Author.scss';

export const CaAuthor = (props: AuthorProps) => {
  const { author_name, author_picture } = props;

  return (
    <div className='ca-author__container'>
      <div className='ca-author__image-container'>
        <img className='ca-author__image' src={`${author_picture}`}/>
      </div>
      <div className='ca-author__user-name-container'>
        <h1>{author_name}</h1>
      </div>
    </div>
  );
};
