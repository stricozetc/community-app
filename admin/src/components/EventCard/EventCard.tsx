import * as React from 'react';
import { I18n } from 'react-i18next';

import './EventCard.scss';
import { EventCardProps } from './EventCard.model';
import { NavLink } from 'react-router-dom';

export class CaEventCard extends React.PureComponent<EventCardProps> {
  render() {
    const { id, title, city, place, begginingInTime, begginingDate } = this.props;
    return (
      <div className='ca-about_card'>
        <div className='ca-about_card_img'>
          <I18n>
            {
              t => (
                <NavLink to={`/event/${id}`} >
                  <button className='ca-about_card_img_btn'>{t('JOIN US')}</button>
                </NavLink>
              )
            }
          </I18n>
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
