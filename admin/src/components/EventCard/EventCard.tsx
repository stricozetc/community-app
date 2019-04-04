import * as React from 'react';
import { I18n } from 'react-i18next';

import './EventCard.scss';
import { EventCardProps } from './EventCard.model';
import { NavLink } from 'react-router-dom';

export class CaEventCard extends React.PureComponent<EventCardProps> {
  render() {
    const { id, title, city, place, begginingInTime, begginingDate } = this.props;
    return (
      <div className='ca-about-card'>
        <I18n>
          {
            t => (
              <NavLink to={`/events/edit-event/${id}`}>
                <button className='ca-about-card__edit-btn'>{t('Edit')}</button>
              </NavLink>
            )
          }
        </I18n>
        <button className='ca-about-card__delete-btn'>+</button>
        <div className='ca-about-card__img'>
        </div>
        <div className='ca-about-card__information'>
          <div className='ca-about-card__information-date'>
            <div className='ca-about-card__information-date-month'>
              {begginingDate}
            </div>
            <div className='ca-about-card__information-date-num'>
              {begginingInTime}
            </div>
          </div>
          <div className='ca-about-card__information-text'>
            <div className='ca-about-card__information-text-title'>
              {title}
            </div>
            <div className='ca-about-card__information-text-time-address'>
              <div className='ca-about-card__information-text-time'>
                {city}
              </div>
              <div className='ca-about-card__information-text-address'>
                {place}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
