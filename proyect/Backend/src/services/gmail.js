import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'spreadtheh@gmail.com',
        pass: 'gfor cvbb leef nnkw'
    }
});

export default transporter;