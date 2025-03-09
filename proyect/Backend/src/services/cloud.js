import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: 'dlptdvxth',
    api_key: process.env.CLOUDINARY_API_KEY || '318734272594546',
    api_secret: process.env.CLOUDINARY_API_SECRET || '2Ft5HSypyWNMxRSocj8Tul6qyms'
})

async function localUpload() {
    const results = await cloudinary.uploader.upload('../../images/Corven.png');
    console.log(results);
}

localUpload();