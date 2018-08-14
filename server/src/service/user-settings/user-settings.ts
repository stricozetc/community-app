import { User } from './../../../Interfaces/User';
import { FieldsToChangePassword } from '../../../models/otherModels';
import { ErrorBlock } from './../../../models/error';
export abstract class UserSettingsRepository {
    public abstract changePassword(fields: FieldsToChangePassword): Promise<{ result: boolean; errors?: ErrorBlock[] }>;
}
