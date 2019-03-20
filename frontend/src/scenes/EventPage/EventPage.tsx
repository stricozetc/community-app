import * as React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-i18next';

import {
    AuthStatus,
    LoadStatus
} from 'models';

import {
    AppState
} from 'store';

import './EventPage.scss';
import './EventPageAdaptive.scss';
import { YandexMap } from 'components';
import {
    EventProps,
} from './Event.model';
import { Dispatch } from 'redux';
import { LoadEvent } from 'store/events';
import { Redirect } from 'react-router';

export class EventPageComp extends React.Component<EventProps> {
    public componentWillMount(): void {
        if (this.props.authStatus === AuthStatus.NotAuthorized) {
            this.props.history.push('/battles');
        }
    }

    public componentDidMount(): void {
        const { loadEvent, match } = this.props;
        loadEvent(match.params['id']);
    }

    public componentWillReceiveProps(nextProps: EventProps): void {
        const { loadEvent, match } = this.props;
        if (nextProps.match.params['id'] !== match.params['id']) {
            loadEvent(nextProps.match.params['id']);
        }
    }

    public render(): JSX.Element {
        const { events, loadEventStatus } = this.props;
        return (
            <I18n>
                {
                    (t) => (
                        <React.Fragment>
                            {
                                loadEventStatus === LoadStatus.Error
                                    ? <Redirect to="/events" />
                                    : events.map(event => {
                                        return (
                                            <div key={event.id} className='event'>
                                                <div className='event__header'>
                                                    <h1 className='event__header__title'>{event.id}</h1>
                                                </div>
                                                <div className='event__information__wrapper'>
                                                    <div className='event__information'>
                                                        <div className='event__information-city'>
                                                            {event.address}
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
                                                    <p className='event__description__second-text'>{event.description}
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
                                        );
                                    }
                                    )}
                        </React.Fragment>
                    )}
            </I18n>
        );
    }
}

const mapDisparchToProps = (dispatch: Dispatch) => ({
    loadEvent: (id: number) => dispatch(new LoadEvent(id)),
});

const mapStateToProps = (state: AppState) => ({
    authStatus: state.auth.status,
    events: state.events.events,
    loadEventStatus: state.events.loadEventStatus,
});

export const EventPage = connect(mapStateToProps, mapDisparchToProps)(EventPageComp);
