import * as React from 'react';

import './EventCard.scss';

export const CaEventCard = () => {

  return (
    <div className='ca-about_card'>
      <button className='ca-about_card_edit-btn'>Edit</button>
      <button className='ca-about_card_delete-btn'>+</button>
      <div className='ca-about_card_img'>
        <button className='ca-about_card_img_btn'>JOIN US</button>
      </div>
      <div className='ca-about_card_information'>
        <div className='ca-about_card_information_date'>
          <div className='ca-about_card_information_date_month'>
            May
              </div>
          <div className='ca-about_card_information_date_num'>
            19
              </div>
        </div>
        <div className='ca-about_card_information_text'>
          <div className='ca-about_card_information_text_title'>
            ISTQB® Foundation Training Course for your Testing team - Mogilev
              </div>
          <div className='ca-about_card_information_text_time-address'>
            <div className='ca-about_card_information_text_time'>
              Mon, 19 May, 19:00
                </div>
            <div className='ca-about_card_information_text_address'>
              г. Могилев, Косманавтов 19
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};
