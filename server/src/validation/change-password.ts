// import * as Validator from 'validator';
// import { User } from './../../Interfaces/User';
// import { isEmpty } from './is-empty';
// import { FieldsToChangePassword, ErrorsToChangePassword } from '../../models/otherModels';
// import { changePasswordErrors } from './../../errors/changePassword';
// import { Error } from './../../errors/errCodes';


// export function validateChangePassword(data: FieldsToChangePassword): {errors: ErrorsToChangePassword, isValid: boolean} {

//     data.oldPassword = !isEmpty(data.oldPassword) ? data.oldPassword : '';
//     data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : '';
//     data.repeatNewPassword = !isEmpty(data.repeatNewPassword) ? data.repeatNewPassword : '';
//     data.userId = !isEmpty(data.userId) ? data.userId : 0;

//     let errors: ErrorsToChangePassword = {
//         oldPassword: [],
//         newPassword: [],
//         repeatNewPassword: []
//     };

//     if (Validator.isEmpty(data.oldPassword)) {
//         errors.oldPassword = addError(
//             errors.oldPassword,
//             changePasswordErrors.oldPasswordIsRequired
//         );
//     }

//     if (Validator.isEmpty(data.newPassword)) {
//         errors.newPassword = addError(
//             errors.newPassword,
//             changePasswordErrors.newPasswordIsRequired
//         );
//     }

//     if (Validator.isEmpty(data.repeatNewPassword)) {
//       errors.repeatNewPassword = addError(
//           errors.repeatNewPassword,
//           changePasswordErrors.repeatNewPasswordIsRequired);
//     }

//     if (!Validator.equals(data.newPassword, data.repeatNewPassword)) {
//       errors.repeatNewPassword = addError(
//         errors.repeatNewPassword,
//         changePasswordErrors.newPasswordsMustMatch
//     );
//     }

//     if (Validator.equals(data.newPassword, data.oldPassword)) {
//         errors.newPassword = addError(
//             errors.newPassword,
//             changePasswordErrors.newAndOldPasswordsShouldBeDifferent
//         );
//     }

//     if (!Validator.isLength(data.newPassword, {min: 6, max: 30})) {
//         errors.password = addError(
//             errors.newPassword,
//             changePasswordErrors.passwordLength
//         );
//     }

//     if (!Validator.isLength(data.oldPassword, {min: 6, max: 30})) {
//         errors.password = addError(
//             errors.oldPassword,
//             changePasswordErrors.passwordLength
//         );
//     }

//     if (!Validator.isLength(data.repeatNewPassword, {min: 6, max: 30})) {
//         errors.password = addError(
//             errors.repeatNewPassword,
//             changePasswordErrors.passwordLength
//         );
//     }
    
//     console.log(errors);

//     errors = deleteEmptyArrays(errors);
//     console.log(errors);
//     return {
//         errors,
//         isValid: isEmpty(errors)
//     };
// }

// const addError = (errors: Error[], errToAdd: Error) => {
//     return errors.concat(errToAdd);
// };

// const deleteEmptyArrays = (obj: ErrorsToChangePassword): ErrorsToChangePassword => {
//     for (let key in obj) {
//         if (obj.hasOwnProperty(key)) {
//             if ( obj[key] instanceof Array && obj[key].length <= 0) {
//                 delete obj[key];
//             }
//         }
//     }
//     return obj;
// };
