// services/cloudinary.js

import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: 'dlptdvxth',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Sube una única imagen a Cloudinary desde un Buffer (archivo en memoria)
 * @param {Buffer} buffer - Archivo binario desde multer.memoryStorage()
 * @returns {Promise<string>} URL segura del archivo subido
 */
export async function uploadFromBuffer(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (err, result) => {
        if (err) return reject(err);
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
}