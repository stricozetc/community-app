import * as React from 'react';

import './EventCard.scss';
import { EventCardProps } from './EventCard.model';


export class CaEventCard extends React.PureComponent<EventCardProps> {
  render() {
    const { title, city, place, begginingInTime, begginingDate } = this.props;
    return (
      <div className='ca-about_card'>
        <button className='ca-about_card_edit-btn'>Edit</button>
        <button className='ca-about_card_delete-btn'>+</button>
        <div className='ca-about_card_img'>
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
  }
}
