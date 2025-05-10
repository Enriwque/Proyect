import express from 'express';
import cors from 'cors';

 import routes from '../routes/index.js';

export default (expressApp) => {
expressApp.use(cors());
 expressApp.use(express.json({ limit: '50mb' }));
expressApp.use(express.urlencoded({ limit: '50mb', extended: true }));
 expressApp.use('/api/v1', routes);
 expressApp.use((req, res) => res.status(404).send({ message: 'NotFound' }));

 };