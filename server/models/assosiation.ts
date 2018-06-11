import { User } from "./user";
import { Role } from './role';
import { UserRoles } from './userRoles';


export const makeAssosiations = () => {
    UserRoles.hasMany(User, {
        as: 'users',
        foreignKey: 'id',
        foreignKeyConstraint: true
    });
    
    UserRoles.hasMany(Role, {
        as: 'roles',
        foreignKey: 'id',
        foreignKeyConstraint: true
    });

};


