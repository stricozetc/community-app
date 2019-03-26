import { EventForSettingForm, Event, SettingFormType } from 'models';

export interface EventFormState {
    id?: number;
    title: string;
    description: string;
    city: string;
    place: string;
    address: string;
    locationX: string;
    begginingInTime: string;
    begginingDate: string;
    createAt?: Date;
    updatedAt?: Date;
    isTitleValid: boolean;
    isDescriptionValid: boolean;
    isCityValid: boolean;
    isPlaceValid: boolean;
    isAddressValid: boolean;
    isLocationValid: boolean;
    isBegginigInTimeValid: boolean;
    isBegginigIDateValid: boolean;
    touched: {
        title: boolean;
        description: boolean;
        city: boolean;
        maxRooms: boolean;
        address: boolean;
        locationX: boolean;
        begginingInTime: boolean;
        begginingDate: boolean;
    };
    titleErrors: string[],
    descriptionErrors: string[],
    cityErrors: string[],
    placeErrors: string[],
    addressErrors: string[],
    locationErrors: string[],
    begginingInTimeErrors: string[],
    begginingDateErrors: string[],
}

export interface EventFormProps {
    id?: number;
    userId: number;
    config: SettingFormType;
    model: EventForSettingForm;
    submit(payload: { event: Event, userId: number }): void;
}
