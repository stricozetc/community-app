import { ErrorBlock, FieldsToChangePassword } from 'models';

export abstract class UserSettingsRepository {
    public abstract changePassword(fields: FieldsToChangePassword): Promise<{ result: boolean; errors?: ErrorBlock[] }>;

    public abstract setNewPassword(userEmail: string, newPassword: string): Promise<boolean>;
}
