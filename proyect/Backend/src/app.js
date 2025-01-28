import express from 'express';
import loaders from './loaders/index.js';
import config from './config.js';

const app = express();

loaders.init(app, config);

export default app;