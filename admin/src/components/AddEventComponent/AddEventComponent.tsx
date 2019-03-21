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
    description: '',
    city: '',
    place: '',
    address: '',
    location: '',
    begginingInTime: '',
    begginingDate: '',
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

    public onSubmit = (data: Event) => {
        this.props.addEvent(data);
    }

    public render(): JSX.Element {
        return (
            <div>
                {this.props.user &&
                    <EventForm
                        userId={this.props.user && this.props.user.id}
                        config={SettingFormType.AddEvent}
                        model={initFormForAddingNewEvent}
                        submit={(data: Event) => this.props.addEvent(data)}
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
    addEvent: (data: Event) => dispatch(new AddEvent(data)),
});

export const CaAddEvent = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddEventComponent);
