import { PostEntry } from "../services/index.js";

// const posts = [
//     {
//         text: 'Hola, soy un post de prueba',
//         images: [],
//         date: new Date(),
//         comments: [
//             {
//                 text: 'Hola, soy un comentario de prueba',
//                 date: new Date(),
//                 user: 'Anonimo'
//             }
//         ],
//         id: 1,
//         user: 'Anonimo'
//     },
//     {
//         text: 'Hola, soy otro post de prueba',
//         images: [],
//         date: new Date(),
//         comments: [
//             {
//                 text: 'Hola, soy otro comentario de prueba',
//                 date: new Date(),
//                 user: 'Anonimo'
//             }
//         ],
//         id: 2,
//         user: 'Anonimo'
//     }
// ];

// posts.forEach(postData => {
//     const post = new PostEntry(postData);
//     post.save()
// })

export const wikiPosts = async function () {
    const results = [];
    const character = await PostEntry.find().sort({ id: 1 });
    character.forEach((char, i) => {
        char.id = i+1;
        char.save();
        results.push(char);
    });
    return results;
}