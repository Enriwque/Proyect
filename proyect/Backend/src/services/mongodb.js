import mongoose from 'mongoose';
const { Schema } = mongoose;
const connection = mongoose.connect('mongodb+srv://enrique:1234@cluster0.hzl2s.mongodb.net/');

const getCollection = function (req, res) {
    mongoose.connection.db.listCollections().toArray((err, collections) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error listing collections');
        } else {
            console.log(collections);
            res.status(200).send(collections);
        }
    });
}

// Este esquema para los personajes, los cuales serán administrados en la sección para estos.
const charEntry = new Schema({
    title: String,
    content: String,
    date: Date,
    id: Number,
    image: String
})
//Este esquema sera para la información de los capitulos, los cuales serán administrados por partes ubicados en la seccion de libros de la wiki.
const chapterEntry = new Schema({
    title: String,
    content: String,
    date: Date,
    id: Number,
    image: String
})

const CharEntry = mongoose.model('CharEntry', charEntry);
const ChapterEntry = mongoose.model('ChapterEntry', chapterEntry);

export default mongoose;
export { charEntry, chapterEntry, connection, getCollection };

// Mi proyecto tratará sobre una wiki falsa sobre comics hechos por mi