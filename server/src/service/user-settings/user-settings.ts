import { User } from './../../../Interfaces/User';
import { FieldsToChangePassword } from '../../../models/otherModels';
// import Promise = require('bluebird');
import { ErrorsToChangePassword } from './../../../models/otherModels';
export abstract class UserSettingsRepository {
    public abstract changePassword(fields: FieldsToChangePassword): Promise<{ result: boolean; errors?: ErrorsToChangePassword }>;
}
