
import { IUser } from './../../../Interfaces/IUser';

export abstract class UserAuthenticationRepository {
    public abstract registerUser(newUser: IUser): Promise<IUser>;
    public abstract loginUser(newUser: IUser): Promise<{success: boolean, token: string}>;
    public abstract getUsers(): Promise<string[]>;
}
