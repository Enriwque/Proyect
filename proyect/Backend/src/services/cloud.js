import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: 'dlptdvxth',
    api_key: process.env.CLOUDINARY_API_KEY || '318734272594546',
    api_secret: process.env.CLOUDINARY_API_SECRET || '2Ft5HSypyWNMxRSocj8Tul6qyms'
})

export async function localUpload(strings) {
    let results = []
    let uploadPromises = [];

    for (let i = 0; i < strings.length; i++) {
        results = await cloudinary.uploader.upload(strings[i]);
        uploadPromises.push(results);
        console.log(results);
    }

    return uploadPromises.map(result => result.secure_url);
}