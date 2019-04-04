import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { EventForm } from 'components';
import { AddEvent, AppState } from 'store';

import {
    AuthStatus,
    EventForSettingForm,
    Event,
    SettingFormType
} from 'models';

import { AddEventComponentProps } from './AddEventComponent.model';

const initFormForAddingNewEvent: EventForSettingForm = {
    title: '',
    city: '',
    place: '',
    address: '',
    locationX: '',
};
export class AddEventComponent extends React.Component<AddEventComponentProps> {
    constructor(props: AddEventComponentProps) {
        super(props);
    }

    public componentWillMount(): void {
        const isAuthenticated = this.props.authStatus === AuthStatus.Authorized;
        if (!isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    public onSubmit = (event: Event, userId: number) => {
        this.props.addEvent({ event: event, userId: userId });
    }

    public render(): JSX.Element {
        return (
            <div>
                {this.props.user &&
                    <EventForm
                        userId={this.props.user && this.props.user.id}
                        config={SettingFormType.AddEvent}
                        model={initFormForAddingNewEvent}
                        submit={(payload: { event: Event, userId: number }) => this.props.addEvent({ event: payload.event, userId: payload.userId })}
                    />
                }
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    authStatus: state.auth.status,
    user: state.auth.user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addEvent: (payload: { event: Event, userId: number }) => dispatch(new AddEvent({ event: payload.event, userId: payload.userId })),
});

export const CaAddEvent = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddEventComponent);
