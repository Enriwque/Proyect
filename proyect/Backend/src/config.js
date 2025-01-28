import dotenv from 'dotenv';

dotenv.config();

const app = {
    port: process.env.PORT || 3000,
};

const config = {
    app,
};

export default config;