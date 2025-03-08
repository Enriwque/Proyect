import { ChapterEntry } from "../services/index.js";

// const chapters = [
//     {
//       id: 1,
//       part: 1,
//       capOrder: 1,
//       capType: 'plot',
//       title: 'Al campo',
//       sinopsis: 'Mucho texto',
//       desarrollo: 'Mucho texto',
//       publishDate: '15/01/2015',
//       titleImage: '../../images/chapter1.png'
//     },
//     {
//       id: 2,
//       part: 1,
//       capOrder: 2,
//       capType: 'plot',
//       title: 'Vuelta a la ciudad',
//       sinopsis: 'Mucho texto',
//       desarrollo: 'Mucho texto',
//       publishDate: '30/03/2015',
//       titleImage: '../../images/chapter2.png'
//     },
//     {
//       id: 3,
//       part: 1,
//       capOrder: 3,
//       capType: 'plot',
//       title: 'Consorcio',
//       sinopsis: 'Mucho texto',
//       desarrollo: 'Mucho texto',
//       publishDate: '10/06/2015',
//       titleImage: '../../images/chapter3.png'
//     },
//     {
//       id: 4,
//       part: 1,
//       capOrder: 4,
//       capType: 'plot',
//       title: 'Trabaja en tí mismo',
//       sinopsis: 'Mucho texto',
//       desarrollo: 'Mucho texto',
//       publishDate: '01/08/2015',
//       titleImage: '../../images/chapter4.png'
//     },
//     {
//       id: 5,
//       part: 1,
//       capOrder: 5,
//       capType: 'plot',
//       title: 'El ojo del bosque',
//       sinopsis: 'Mucho texto',
//       desarrollo: 'Mucho texto',
//       publishDate: '28/09/2015',
//       titleImage: '../../images/chapter5.png'
//     },
//     {
//       id: 6,
//       part: 1,
//       capOrder: 6,
//       capType: 'plot',
//       title: 'Troncos como barrotes',
//       sinopsis: 'Mucho texto',
//       desarrollo: 'Mucho texto',
//       publishDate: '01/12/2015',
//       titleImage: '../../images/chapter6.png'
//     },
//     {
//       id: 7,
//       part: 1,
//       capOrder: 1,
//       capType: 'extra',
//       title: 'Somos amigos, y somos amigos, y...',
//       sinopsis: 'Mucho texto',
//       desarrollo: 'Mucho texto',
//       publishDate: '11/01/2016',
//       titleImage: '../../images/chapterextra1.png'
//     },
//   ]

//   chapters.forEach(async (chapterdata) => {
//     const chap = new ChapterEntry(chapterdata);
//     chap.save();
//   })

const capitulos = async function () {
    const results = [];
    const chapter = await ChapterEntry.find().sort({ id: 1 });
    chapter.forEach((chap, i) => {
      chap.id = i+1;
      chap.save();
      results.push(chap);
    });
    return results;
  }

capitulos();

  export default capitulos;