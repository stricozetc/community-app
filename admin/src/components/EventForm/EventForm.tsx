import { FormGroup, TextField } from '@material-ui/core';
import * as React from 'react';

import { CaButton, CaDatePickers, CaTimePickers, CaEventDescription } from 'components';
import { frontEndValidationEventRegister } from 'constes';
import { Event, SettingFormType } from 'models';
import { I18n } from 'react-i18next';
import { history, isEmpty } from 'utils';

import { EventFormProps, EventFormState } from './EventForm.model';

import './EventForm.scss';

const MIN_LENGTH_TITLE = 3;
const MAX_LENGTH_TITLE = 50;
const MIN_LENGTH_DESCRIPTION = 10;
const MAX_LENGTH_DESCRIPTION = 250;
const MIN_LENGTH_CITY = 3;
const MAX_LENGTH_CITY = 50;
const MIN_LENGTH_PLACE = 3;
const MAX_LENGTH_PLACE = 50;
const MIN_LENGTH_ADDRESS = 3;
const MAX_LENGTH_ADDRESS = 70;
const MIN_LENGTH_LOCATION = 3;
const MAX_LENGTH_LOCATION = 50;

export class EventForm extends React.Component<EventFormProps, EventFormState> {
  constructor(props: EventFormProps) {
    super(props);
    this.state = {
      ...props.model,
      title: '',
      description: '',
      city: '',
      place: '',
      address: '',
      locationX: '',
      begginingInTime: '2019-01-16',
      begginingDate: '07:30',
      isTitleValid: false,
      isDescriptionValid: false,
      isCityValid: false,
      isPlaceValid: false,
      isAddressValid: false,
      isLocationValid: false,
      isBegginigInTimeValid: false,
      isBegginigIDateValid: false,
      touched: {
        title: false,
        description: false,
        city: false,
        maxRooms: false,
        address: false,
        locationX: false,
        begginingInTime: false,
        begginingDate: false,
      },
      titleErrors: [],
      descriptionErrors: [],
      cityErrors: [],
      placeErrors: [],
      addressErrors: [],
      locationErrors: [],
      begginingInTimeErrors: [],
      begginingDateErrors: [],
    };
  }

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name as 'title';

    this.setState({ [name]: value } as EventFormState);
  }

  public isValidate(): boolean {
    let titleErrors: string[] = [];
    let descriptionErrors: string[] = [];
    let cityErrors: string[] = [];
    let placeErrors: string[] = [];
    let addressErrors: string[] = [];
    let locationErrors: string[] = [];
    let begginingInTimeErrors: string[] = [];
    let begginingDateErrors: string[] = [];

    if (!this.state.title) {
      titleErrors.push(frontEndValidationEventRegister.title.required);
    } else {
      titleErrors = this.removeElFromArrByValue(
        titleErrors,
        frontEndValidationEventRegister.title.required
      );
    }

    if (this.state.title.length < MIN_LENGTH_TITLE || this.state.title.length > MAX_LENGTH_TITLE) {
      titleErrors.push(frontEndValidationEventRegister.title.length);
    } else {
      titleErrors = this.removeElFromArrByValue(titleErrors, frontEndValidationEventRegister.title.length);
    }

    if (!this.state.description) {
      descriptionErrors.push(frontEndValidationEventRegister.description.required);
    } else {
      descriptionErrors = this.removeElFromArrByValue(
        descriptionErrors,
        frontEndValidationEventRegister.description.required
      );
    }

    if (this.state.description.length < MIN_LENGTH_DESCRIPTION || this.state.description.length > MAX_LENGTH_DESCRIPTION) {
      descriptionErrors.push(frontEndValidationEventRegister.description.length);
    } else {
      descriptionErrors = this.removeElFromArrByValue(descriptionErrors, frontEndValidationEventRegister.description.length);
    }

    if (!this.state.city) {
      cityErrors.push(frontEndValidationEventRegister.city.required);
    } else {
      cityErrors = this.removeElFromArrByValue(
        cityErrors,
        frontEndValidationEventRegister.city.required
      );
    }

    if (this.state.city.length < MIN_LENGTH_CITY || this.state.city.length > MAX_LENGTH_CITY) {
      cityErrors.push(frontEndValidationEventRegister.city.length);
    } else {
      cityErrors = this.removeElFromArrByValue(cityErrors, frontEndValidationEventRegister.city.length);
    }

    if (!this.state.place) {
      placeErrors.push(frontEndValidationEventRegister.place.length);
    } else {
      placeErrors = this.removeElFromArrByValue(
        placeErrors,
        frontEndValidationEventRegister.place.length
      );
    }

    if (this.state.place.length < MIN_LENGTH_PLACE || this.state.place.length > MAX_LENGTH_PLACE) {
      placeErrors.push(frontEndValidationEventRegister.place.length);
    } else {
      placeErrors = this.removeElFromArrByValue(
        placeErrors,
        frontEndValidationEventRegister.place.length
      );
    }

    if (!this.state.address) {
      addressErrors.push(frontEndValidationEventRegister.address.length);
    } else {
      addressErrors = this.removeElFromArrByValue(
        addressErrors,
        frontEndValidationEventRegister.address.length
      );
    }

    if (this.state.address.length < MIN_LENGTH_ADDRESS || this.state.address.length > MAX_LENGTH_ADDRESS) {
      addressErrors.push(frontEndValidationEventRegister.address.length);
    } else {
      addressErrors = this.removeElFromArrByValue(
        addressErrors,
        frontEndValidationEventRegister.address.length);
    }

    if (!this.state.locationX) {
      locationErrors.push(frontEndValidationEventRegister.locationX.length);
    } else {
      locationErrors = this.removeElFromArrByValue(
        locationErrors,
        frontEndValidationEventRegister.locationX.length
      );
    }

    if (this.state.locationX.length < MIN_LENGTH_LOCATION || this.state.locationX.length > MAX_LENGTH_LOCATION) {
      locationErrors.push(frontEndValidationEventRegister.locationX.length);
    } else {
      locationErrors = this.removeElFromArrByValue(
        locationErrors,
        frontEndValidationEventRegister.locationX.length);
    }

    if (!this.state.begginingInTime) {
      begginingInTimeErrors.push(frontEndValidationEventRegister.begginingInTime.length);
    } else {
      begginingInTimeErrors = this.removeElFromArrByValue(
        begginingInTimeErrors,
        frontEndValidationEventRegister.begginingInTime.length
      );
    }

    if (!this.state.begginingDate) {
      begginingDateErrors.push(frontEndValidationEventRegister.begginingDate.length);
    } else {
      begginingDateErrors = this.removeElFromArrByValue(
        begginingDateErrors,
        frontEndValidationEventRegister.begginingDate.length
      );
    }

    this.setState({
      titleErrors,
      descriptionErrors,
      cityErrors,
      placeErrors,
      addressErrors,
      locationErrors,
      begginingInTimeErrors,
      begginingDateErrors
    });

    if (titleErrors.length <= 0) {
      this.setState({ isTitleValid: true });
    } else {
      this.setState({ isTitleValid: false });
      return false;
    }

    if (descriptionErrors.length <= 0) {
      this.setState({ isDescriptionValid: true });
    } else {
      this.setState({ isDescriptionValid: false });
      return false;
    }

    if (cityErrors.length <= 0) {
      this.setState({ isCityValid: true });
    } else {
      this.setState({ isCityValid: false });
      return false;
    }

    if (placeErrors.length <= 0) {
      this.setState({ isPlaceValid: true });
    } else {
      this.setState({ isPlaceValid: false });
      return false;
    }

    if (addressErrors.length <= 0) {
      this.setState({ isAddressValid: true });
    } else {
      this.setState({ isAddressValid: false });
      return false;
    }

    if (locationErrors.length <= 0) {
      this.setState({ isLocationValid: true });
    } else {
      this.setState({ isLocationValid: false });
      return false;
    }

    if (begginingInTimeErrors.length <= 0) {
      this.setState({ isBegginigInTimeValid: true });
    } else {
      this.setState({ isBegginigInTimeValid: false });
      return false;
    }

    if (begginingDateErrors.length <= 0) {
      this.setState({ isBegginigIDateValid: true });
    } else {
      this.setState({ isBegginigIDateValid: false });
      return false;
    }

    return true;
  }

  public handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (this.isValidate()) {
      let event: Event = {
        userId: this.props.userId,
        title: this.state.title,
        description: this.state.description,
        city: this.state.city,
        place: this.state.place,
        address: this.state.address,
        locationX: this.state.locationX,
        begginingInTime: this.state.begginingInTime,
        begginingDate: this.state.begginingDate,
      };

      if (this.props.config === SettingFormType.EditEvent) {
        event = Object.assign(event, { id: this.props.id });
      }

      this.props.submit({ event: event, userId: this.props.userId });
      history.push('/events');
    }
  }

  public handleBlur = (field: string) => (event: React.FormEvent<HTMLElement>) => {
    this.setState({
      touched: {
        ...this.state.touched,
        [field]: true
      }
    });
  }

  public render(): JSX.Element {
    const arrayOfInputs = Object.keys(this.props.model);

    return (
      <I18n>
        {
          (t) => (
            <div>
              <form
                className='ca-game-form__container'
                onSubmit={this.handleSubmit}
              >
                <h2>SETTINGS FORM</h2>
                {arrayOfInputs.map((input: string) => { // keys of received object
                  return (
                    <FormGroup key={input}>
                      <TextField
                        style={{
                          marginTop: '20px'
                        }}
                        id={input}
                        label={input === 'maxWaitingTime' ? input + ' (minutes)' : input}
                        name={input}
                        value={this.state[`${input}`]}
                        onChange={this.handleChange}
                        type={'text'}
                        error={!this.state[`${input}`] && this.state.touched[`${input}`]}
                      />
                      {!isEmpty(this.state[`${input}Errors`]) &&

                        this.state[`${input}Errors`].map((err: string, index: number) => {
                          return (
                            <div className='ca-game-form__error' key={index}>
                              {t(err)}
                            </div>
                          );
                        })}
                    </FormGroup>
                  );
                })}
                <CaDatePickers
                  style={{
                    marginTop: '20px'
                  }}
                  name={'begginingDate'}
                  onChange={this.handleChange}
                  error={!this.state.begginingDate && this.state.touched.begginingDate}
                />
                <CaTimePickers
                  style={{
                    marginTop: '20px'
                  }}
                  name={'begginingInTime'}
                  onChange={this.handleChange}
                  error={!this.state.begginingInTime && this.state.touched.begginingInTime}
                />
                  <CaEventDescription />
                <CaButton
                  color='primary'
                  type='submit'
                  className='ca-game-form__game-btn'
                  disabled={
                    !this.state.title ||
                    !this.state.description ||
                    !this.state.city ||
                    !this.state.place ||
                    !this.state.address ||
                    !this.state.locationX ||
                    !this.state.begginingInTime ||
                    !this.state.begginingDate
                  }
                >
                  {this.props.config}
                </CaButton>
              </form>
            </div>
          )
        }
      </I18n>
    );
  }

  private removeElFromArrByValue(arr: string[], value: string): string[] {
    const index = arr.indexOf(value);
    if (index) {
      arr.splice(index, 1);
    }

    return arr;
  }
}
