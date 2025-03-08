import { WikiUsers } from "../services/index.js";

// const users = [
//     {
//         name: 'Pepe',
//         email: 'test@gmail.com',
//         password: '1234',
//         age: 30,
//         id: '1',
//         rol: 'admin'
//     },
//     {
//         name: 'Pedro Mewing',
//         email: 'wasawasa@gmail.com',
//         password: '5678',
//         age: 25,
//         id: '2',
//         rol: 'user'
//     }
// ]

// users.forEach(userData => {
//     const user = new WikiUsers(userData);
//    user.save()
// })

export const usuarios = async function () {
    const results = [];
    const users = await WikiUsers.find().sort({ id: 1 });
    users.forEach((usuario, i) => {
        usuario.id = i+1;
        usuario.save();
        results.push(usuario);
    });
    return results;
}

usuarios();