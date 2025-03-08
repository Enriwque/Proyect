import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const { Schema } = mongoose;

mongoose.connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

if (mongoose.models.CharEntry) {
    mongoose.deleteModel('CharEntry');
}
if (mongoose.models.ChapterEntry) {
    mongoose.deleteModel('ChapterEntry');
}
if (mongoose.models.WikiUsers) {
    mongoose.deleteModel('WikiUsers');
}

const charEntry = new Schema({
    title: String,
    content: {
        intro: String,
        appereance: String,
        personality: String,
        history_Plot: {
            past: String, 
            Al_campo: String, 
            vuelta_ciudad: String, 
            consorcio: String, 
            trabaja_en_ti: String, 
            el_bosque: String, 
            troncos_barrotes: String, 
            trivia: [String]
        }
    },
    date: { type: Date, default: Date.now },
    id: Number,
    titleImage: String,
    images: [String],
    name: String,
    age: Number,
    sexo: String,
    dateOfBirth: String,
    species: String,
})
//Este esquema sera para la información de los capitulos, los cuales serán administrados por partes ubicados en la seccion de libros de la wiki.
const chapterEntry = new Schema({
    title: String,
    capOrder: Number,
    capType: {type: String, enum: ['extra', 'plot']},
    part: Number,
    sinopsis: String,
    desarrollo: String,
    publishDate: String,
    id: Number,
    titleImage: String
})

const wikiusers = new Schema ({
    name: String,
    email: String,
    password: String,
    age: Number,
    id: Number,
    rol: {type: String, enum: ['admin', 'user', 'editor']}
})

const CharEntry = mongoose.model('CharEntry', charEntry);
const ChapterEntry = mongoose.model('ChapterEntry', chapterEntry);
const WikiUsers = mongoose.model('WikiUsers', wikiusers);

export { CharEntry, ChapterEntry, WikiUsers };

// const chars = [
//     {
//         title: 'Kone',
//         content: 'mucho texto',
//         date: new Date(),
//         id: 1,
//         titleImage: '../images/Kone.png',
//         images: ['../images/Kone.png'],
//         name: 'Kone',
//     },
// ]

// const users = [
//     {
//         name: 'elpepe',
//         email: 'pelado@gmail.com',
//         password: '9101112',
//     },
//     {
//         name: 'sergio',
//         email: 'sergio@gmail.com',
//         password: '5678',
//     }
// ];

// users.forEach(userData => {
//     const user = new User(userData);
//     user.save()
// });

// const user = await User.findOne({ name: 'pepe' });
// user.name = 'repentance';
// user.save();

// const user = await User.findOne({ name: 'pelao' });
// user.age = 30;
// user.save();

// await User.deleteOne({ name: 'sergio' });