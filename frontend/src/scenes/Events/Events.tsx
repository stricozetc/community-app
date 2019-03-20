import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  AppState,
} from 'store';

import {
  AuthStatus,
} from 'models';

import { CaEventCard } from 'components/EventCard';

import { LoadEvents } from 'store/events';

import { EventsProps } from './Events.model';

import './Events.scss';


export class CaEventsPageComponent extends React.Component<EventsProps> {
  public componentWillMount(): void {
    const isAuthenticated = this.props.authStatus === AuthStatus.Authorized;

    if (!isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  public componentDidMount(): void {
    this.props.loadEvents();
  }

  public render(): JSX.Element {
    const { events } = this.props;
    return (
      <div className='ca-about'>
        {
          events.map(event => {
            return (
              <CaEventCard
                key={event.id}
                id={Number(event.id)}
                title={event.title}
                city={event.city}
                place={event.place}
                begginingInTime={event.begginingInTime}
                begginingDate={event.begginingDate}
              />
            )
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  authStatus: state.auth.status,
  events: state.events.events,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadEvents: () => dispatch(new LoadEvents()),
});

export const CaEvents = connect(
  mapStateToProps,
  mapDispatchToProps
)(CaEventsPageComponent);
