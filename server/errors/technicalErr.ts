import { TechnicalErrCodes } from './errCodes';

export const technicalErr = {
    databaseCrash: {
        code: TechnicalErrCodes.DatabaseCrash,
        msg: 'Database crashed',
    },

    saltIsNotGenerated: {
        code: TechnicalErrCodes.SaltIsNotGenerated,
        msg: 'Salt was not generated',
    },

    canNotBcryptString: {
        code: TechnicalErrCodes.CanNotBcryptString,
        msg: 'String was not bcrypted',
    },

    canNotCreateHash: {
        code: TechnicalErrCodes.CanNotCreateHash,
        msg: 'Hash was not created',
    },

    applicationTokenIsNotUpsertedInDb: {
        code: TechnicalErrCodes.ApplicationTokenIsNotUpsertedInDb,
        msg: 'Application Token can not be upsert in DB',
    },

    userRoleIsNotUpsertedInDb: {
        code: TechnicalErrCodes.UserRoleIsNotUpsertedInDb,
        msg: 'User Role can not be upsert in DB',
    },

    userRoleIsNotSaveInDb: {
        code: TechnicalErrCodes.UserRoleIsNotSaveInDb,
        msg: 'User Role can not be saved in DB',
    },

    userLanguageIsNotUpdatedInDb: {
        code: TechnicalErrCodes.UserLanguageIsNotUpdatedInDb,
        msg: 'User language can not be updated in DB',
    },

    mailNotSend: {
        code: TechnicalErrCodes.MailNotSend,
        msg: 'Mail not send',
    },
};
