// import Strings from './assets/Strings';
// // import Realm from 'realm';

// const Realm = require('realm');

// const UserSchema = {
//     name: Strings.schemaUser,
//     primaryKey: 'userId',
//     properties:{
//         userId: 'int',
//         name: 'string',
//         email: 'string',
//         password: 'string',
//         role: 'string',
//     }
// }

// const realm = new Realm({
//     schema : [UserSchema]
// })

// export function registerUser(name,email,pwd,role){
//     const existingUser = realm.objects(Strings.schemaUser)
//     .filtered(
//         'email = $0', email
//     )[0];
//     if(existingUser){
//         return {
//             success:  false,
//             message: Strings.errorEmailAlreadyExists
//         };
//     }

//     realm.write( () => {
//         realm.create(
//             Strings.schemaUser,
//             {
//                 userId: new Date().getTime(),
//                 name: name,
//                 email: email,
//                 password: pwd,
//                 role: role
//             }
//         )
//     });

//     return {
//         success: true,
//         message: Strings.successRegister
//     };
// }

// export function findUserByEmailAndPassword(email,pwd){
//     const user = realm.objects(Strings.schemaUser)
//     .filtered(
//         'email = $0 AND password = $1', email, pwd
//     )[0];
//     return user
// }

// export default Realm;