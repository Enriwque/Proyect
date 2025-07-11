  
// import { Kone, Corven } from './texto.js';
import { CharEntry } from '../services/index.js';

// const chars = [
//     {
//         title: 'Kone',
//         content: {
//             intro: `${Kone.intro}`,
//             appereance: `${Kone.appereance}`,
//             personality: `${Kone.personality}`,
//             history_Plot: {
//                 past: `${Kone.history_Plot.past}`,
//                 al_campo: `${Kone.history_Plot.Al_campo}`,
//                 vuelta_a_la_ciudad: `${Kone.history_Plot.vuelta_ciudad}`,
//                 consorcio: `${Kone.history_Plot.consorcio}`,
//                 que_nadie_falte: `${Kone.history_Plot.nadie_atras}`,
//                 trabaja_en_ti_mismo: `${Kone.history_Plot.trabaja_en_ti}`,
//                 el_ojo_del_bosque: `${Kone.history_Plot.el_bosque}`,
//                 troncos_como_barrotes: `${Kone.history_Plot.troncos_barrotes}`
//             },
//             extra: {
//                 somos_amigos_y_somos_amigos_y: `${Kone.history_Plot.somos_amigos_y_somos_amigos_y}`,
//                 trivia: `${Kone.history_Plot.trivia}`
//             }
//         },
//         date: new Date(),
//         id: 1,
//         titleImage: 'http://res.cloudinary.com/dlptdvxth/image/upload/v1741546249/x3dtm7njxuxhtp1sd4ap.png',
//         images: ['http://res.cloudinary.com/dlptdvxth/image/upload/v1741546249/x3dtm7njxuxhtp1sd4ap.png'],
//         name: 'Kone',
//         age: 11,
//         sexo: 'macho',
//         dateOfBirth: '7069/01/04',
//         species: 'Conejo blanco'
//     },

//     {
//         title: 'Corven',
//         content: {
//             intro: `${Corven.intro}`,
//             appereance: `${Corven.appereance}`,
//             personality: `${Corven.personality}`,
//             history_Plot: {
//                 past: `${Corven.history_Plot.past}`,
//                 al_campo: `${Corven.history_Plot.Al_campo}`,
//                 vuelta_a_la_ciudad: `${Corven.history_Plot.vuelta_ciudad}`,
//                 consorcio: `${Corven.history_Plot.consorcio}`,
//                 que_nadie_falte: `${Corven.history_Plot.nadie_atras}`,
//                 trabaja_en_ti_mismo: `${Corven.history_Plot.trabaja_en_ti}`,
//                 el_ojo_del_bosque: `${Corven.history_Plot.el_bosque}`,
//                 troncos_como_barrotes: `${Corven.history_Plot.troncos_barrotes}`
//             },
//             extra: {
//                 somos_amigos_y_somos_amigos_y: `${Corven.history_Plot.somos_amigos_y_somos_amigos_y}`,
//                 trivia: `${Corven.history_Plot.trivia}`
//             }
//         },
//         date: new Date(),
//         id: 2,
//         titleImage: 'http://res.cloudinary.com/dlptdvxth/image/upload/v1741546467/wglicm0t86flg67gc2i0.png',
//         images: ['http://res.cloudinary.com/dlptdvxth/image/upload/v1741546467/wglicm0t86flg67gc2i0.png'],
//         name: 'Corven',
//         age: 33,
//         sexo: 'macho',
//         dateOfBirth: '7047/02/14',
//         species: 'Cuervo albino'
//     }
// ]

//  chars.forEach(charData => {
//      const char = new CharEntry(charData);
//     char.save()
// });


export const characters = async function () {
    const results = [];
    const character = await CharEntry.find().sort({ id: 1 });
    character.forEach((char, i) => {
        char.id = i+1;
        char.save();
        results.push(char);
    });
    return results;
}

characters();