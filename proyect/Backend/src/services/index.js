import mongoose from 'mongoose';
const { Schema } = mongoose;
mongoose.connect('mongodb+srv://enrique:1234@cluster0.hzl2s.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const usersSchema = new Schema({
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model('User', usersSchema);

const users = [
    {
        name: 'elpepe',
        email: 'pelado@gmail.com',
        password: '9101112',
    },
    {
        name: 'sergio',
        email: 'sergio@gmail.com',
        password: '5678',
    }
];

users.forEach(userData => {
    const user = new User(userData);
    user.save()
});