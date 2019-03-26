import { FrontEndValidationErrorsEventRegister  } from 'models';

export const frontEndValidationEventRegister: FrontEndValidationErrorsEventRegister = {
    title: {
        length: 'titleLengthError',
        required: 'titleRequired'
    },
    description: {
        length: 'descriptionApplicationLengthError',
        required: 'descriptionRequired'
    },
    city: {
        length: 'cityLengthError',
        required: 'cityRequired'
    },
    place: {
        length: 'placeLengthError',
        required: 'placeRequired'
    },
    address: {
        length: 'addressLengthError',
        required: 'addressRequired'
    },
    locationX: {
        length: 'locationLengthError',
        required: 'locationRequired'
    },
    begginingInTime: {
        length: 'begginingInTimeLengthError',
        required: 'begginingInTimeRequired'
    },
    begginingDate: {
        length: 'begginingDateLengthError',
        required: 'begginingDateRequired'
    },
};
