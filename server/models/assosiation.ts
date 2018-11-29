import { UserModel } from './user';
import { RoleModel } from './role';
import { UserRoles } from './userRoles';

export const makeAssociations = () => {
    UserRoles.hasMany(UserModel, {
        as: 'users',
        foreignKey: 'id',
        foreignKeyConstraint: true
    });

    UserRoles.hasMany(RoleModel, {
        as: 'roles',
        foreignKey: 'id',
        foreignKeyConstraint: true
    });

};
