import * as React from 'react';

import './EventCard.scss';
import { EventCardProps } from './index';
import { NavLink } from 'react-router-dom';

export const CaEventCard = ({ id, title, city, place, begginingInTime, begginingDate }: EventCardProps) => {
  return (
    <div className='ca-about_card'>
      <button className='ca-about_card_edit-btn'>Edit</button>
      <button className='ca-about_card_delete-btn'>+</button>
      <div className='ca-about_card_img'>
        <NavLink to={`/event/${id}`} >{
          console.log(id)
        }
          <button className='ca-about_card_img_btn'>JOIN US</button>
        </NavLink>
      </div>

      <div className='ca-about_card_information'>
        <div className='ca-about_card_information_date'>
          <div className='ca-about_card_information_date_month'>
            {begginingDate}
          </div>
          <div className='ca-about_card_information_date_num'>
            {begginingInTime}
          </div>
        </div>
        <div className='ca-about_card_information_text'>
          <div className='ca-about_card_information_text_title'>
            {title}
          </div>
          <div className='ca-about_card_information_text_time-address'>
            <div className='ca-about_card_information_text_time'>
              {city}
            </div>
            <div className='ca-about_card_information_text_address'>
              {place}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
