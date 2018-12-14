import * as React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-i18next';

import {
    AuthStatus
} from 'models';

import {
    AppState
} from 'store';

import './EventPage.scss';
import './EventPageAdaptive.scss';
import { YandexMap } from 'components';
import { EventProps } from './Event.model';

export class EventPageComp extends React.Component<EventProps> {
    public componentWillMount(): void {
        if (this.props.authStatus === AuthStatus.NotAuthorized) {
            this.props.history.push('/battles');
        }
    }

    public render(): JSX.Element {
        return (
            <I18n>{t => (
                <div className='event'>
                    <div className='event__header'>
                        <h1 className='event__header__title'>IT SUMMER MEETUP</h1>
                    </div>
                    <div className='event__information__wrapper'>
                        <div className='event__information'>
                            <div className='event__information-city'>
                                г.Могилев
                            </div>
                            <div className='event__information-time'>
                                <div>{t('startingIn')}:</div>
                                <div>18:00</div>
                            </div>
                            <div className='event__information-date'>
                                <div>{t('eventDate')}:</div>
                                <div>2018-07-29</div>
                            </div>
                            <div className='event__information-place'>
                                <div>{t('eventPlace')}:</div>
                                <div>Косманавтов 19</div>
                            </div>
                        </div>
                    </div>
                    <div className='event__description'>
                        <p className='event__description__main-text'>{t('description')}</p>
                        <p className='event__description__second-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Nullam accumsan, erat vel interdum scelerisque, sem odio molestie enim, ac porttitor lectus lectus at
                            nibh. Ut auctor, libero at tincidunt eleifend, libero mauris consequat neque, vel hendrerit massa turpi
                            s ac odio. Pellentesque faucibus, sem nec rutrum ornare, ipsum sapien fermentum lectus, nec tempor veli
                            t velit a urna. Donec id magna porttitor ligula dictum lacinia. Donec ut ullamcorper nisl. Vestibulum q
                            uis vestibulum dui. Fusce lacinia facilisis ornare. Aenean arcu sem, pharetra et egestas nec, consectetu
                            r nec nisl. Suspendisse at condimentum libero, in iaculis magna. Interdum et malesuada fames ac ante ips
                            um primis in faucibus. Phasellus ullamcorper ultricies aliquam.
                            Curabitur consectetur turpis vitae mi blandit porttitor. In pulvinar a neque ut lobortis. Aliquam v
                            el velit justo. Nunc interdum tortor sed libero iaculis, varius aliquam justo accumsan. Proin ut mag
                            na metus. Pellentesque gravida tristique rhoncus. Praesent tincidunt, lorem et molestie maximus, orci
                            purus varius augue, ut interdum urna turpis condimentum neque. Fusce luctus odio sit amet quam aliquam, vel elementum urna rhoncus.
                        </p>
                    </div>
                    <div className='event__address-title'>
                        <p className='event__address-title-text'>{t('eventPlace')}</p>
                    </div>
                    <div className='event__place'>
                        <div className='event__place-address'>
                            <p>г.Могилев, Косманавтов 19</p>
                        </div>
                        <div className='event__place-map'>
                            <YandexMap positionX={53.908087} positionY={30.308924} zoom={17} />
                        </div>
                    </div>
                </div>
             )}</I18n>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    authStatus: state.auth.status,
});

export const EventPage = connect(mapStateToProps)(EventPageComp);
