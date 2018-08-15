import { technicalErrCodes } from './errCodes';

export const technicalErr = {
    databaseCrash: {
        code: technicalErrCodes.databaseCrash,
        msg: 'Database crashed',
    },

    saltIsNotGenerated: {
        code: technicalErrCodes.saltIsNotGenerated,
        msg: 'Salt was not generated',
    },

    canNotBcryptString: {
        code: technicalErrCodes.canNotBcryptString,
        msg: 'String was not bcrypted',
    },

    canNotCreateHash: {
        code: technicalErrCodes.canNotCreateHash,
        msg: 'Hash was not created',
    },

    applicationTokenIsNotUpsertedInDb: {
        code: technicalErrCodes.applicationTokenIsNotUpsertedInDb,
        msg: 'Application Token can not be upsert in DB',
    },

    userRoleIsNotUpsertedInDb: {
        code: technicalErrCodes.userRoleIsNotUpsertedInDb,
        msg: 'User Role can not be upsert in DB',
    },

    userRoleIsNotSaveInDb: {
        code: technicalErrCodes.userRoleIsNotSaveInDb,
        msg: 'User Role can not be saved in DB',
    },

    userLanguageIsNotUpdatedInDb: {
        code: technicalErrCodes.userLanguageIsNotUpdatedInDb,
        msg: 'User language can not be updated in DB',
    },
};
